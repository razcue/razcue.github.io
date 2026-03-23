import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

interface Company {
  name: string;
  website?: string;
  email?: string | null;
  sector?: string;
  techStack?: string[];
  hasCareerPage?: boolean;
  jobPostingUrl?: string | null;
}

interface Position {
  title?: string;
  url?: string | null;
  requirements?: string[];
}

interface Application {
  id: string;
  type: 'direct-apply' | 'outreach';
  company: Company;
  position: Position;
  status:
    | 'pending'
    | 'approved'
    | 'sent'
    | 'applied'
    | 'interview'
    | 'negociation'
    | 'rejected';
  applicationDate?: string | null;
  rejectionDate?: string | null;
  rejectionNote?: string;
  resumeConfig?: string;
  notes?: string;
  proposedAt?: string | null;
  proposedWhy?: string | null;
}

interface ApplicationsData {
  applications: Application[];
  lastUpdated: string;
}

const APPLICATIONS_PATH = resolve(
  process.cwd(),
  'job-ai/data/applications.json'
);

export async function loadApplications(): Promise<ApplicationsData> {
  try {
    const data = await readFile(APPLICATIONS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      applications: [],
      lastUpdated: new Date().toISOString().split('T')[0],
    };
  }
}

export async function saveApplications(data: ApplicationsData): Promise<void> {
  data.lastUpdated = new Date().toISOString().split('T')[0];
  await writeFile(APPLICATIONS_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export interface ConflictCheckResult {
  hasConflict: boolean;
  conflictType:
    | 'already-applied'
    | 'already-sent'
    | 'already-proposed'
    | 'new-opportunity';
  existingApplication?: Application;
  recommendation:
    | 'skip'
    | 'propose-direct'
    | 'propose-outreach'
    | 'new-proposal';
  reason: string;
}

export async function checkConflicts(
  companyName: string,
  positionTitle?: string
): Promise<ConflictCheckResult> {
  const data = await loadApplications();
  const apps = data.applications;

  const companyMatch = apps.find(
    (app) => app.company.name.toLowerCase() === companyName.toLowerCase()
  );

  if (!companyMatch) {
    return {
      hasConflict: false,
      conflictType: 'new-opportunity',
      recommendation: 'propose-outreach',
      reason: 'Company not found in applications - new opportunity',
    };
  }

  if (positionTitle && companyMatch.position.title) {
    const samePosition =
      companyMatch.position.title.toLowerCase() === positionTitle.toLowerCase();

    if (samePosition && companyMatch.status === 'applied') {
      return {
        hasConflict: true,
        conflictType: 'already-applied',
        existingApplication: companyMatch,
        recommendation: 'skip',
        reason: `Already applied to ${companyName} for ${positionTitle} on ${companyMatch.applicationDate}`,
      };
    }

    if (samePosition && companyMatch.status === 'sent') {
      return {
        hasConflict: true,
        conflictType: 'already-sent',
        existingApplication: companyMatch,
        recommendation: 'new-proposal',
        reason: `Already sent outreach to ${companyName}, but new position found - can propose direct apply`,
      };
    }

    if (samePosition && companyMatch.status === 'rejected') {
      return {
        hasConflict: true,
        conflictType: 'already-applied',
        existingApplication: companyMatch,
        recommendation: 'skip',
        reason: `Already rejected from ${companyName} for ${positionTitle}`,
      };
    }

    if (
      samePosition &&
      (companyMatch.status === 'pending' || companyMatch.status === 'approved')
    ) {
      return {
        hasConflict: true,
        conflictType: 'already-proposed',
        existingApplication: companyMatch,
        recommendation: 'skip',
        reason: `Already proposed for ${positionTitle} - pending approval`,
      };
    }

    if (samePosition && companyMatch.status === 'interview') {
      return {
        hasConflict: true,
        conflictType: 'already-applied',
        existingApplication: companyMatch,
        recommendation: 'skip',
        reason: `Already in interview with ${companyName} for ${positionTitle}`,
      };
    }
  }

  const pendingOutreach = apps.find(
    (app) =>
      app.company.name.toLowerCase() === companyName.toLowerCase() &&
      app.status === 'sent' &&
      app.type === 'outreach'
  );

  if (pendingOutreach) {
    return {
      hasConflict: true,
      conflictType: 'already-sent',
      existingApplication: pendingOutreach,
      recommendation: 'new-proposal',
      reason:
        'Sent outreach before - can now propose direct apply if job posting available',
    };
  }

  return {
    hasConflict: false,
    conflictType: 'new-opportunity',
    recommendation: 'propose-outreach',
    reason: 'Same company but different position - new opportunity',
  };
}

export async function addApplication(application: Application): Promise<void> {
  const data = await loadApplications();
  data.applications.push(application);
  await saveApplications(data);
}

export async function updateApplicationStatus(
  applicationId: string,
  status: Application['status'],
  additionalFields?: Partial<Application>
): Promise<void> {
  const data = await loadApplications();
  const index = data.applications.findIndex((app) => app.id === applicationId);

  if (index === -1) {
    throw new Error(`Application ${applicationId} not found`);
  }

  data.applications[index].status = status;

  if (additionalFields) {
    data.applications[index] = {
      ...data.applications[index],
      ...additionalFields,
    };
  }

  await saveApplications(data);
}

export async function getApplicationsByStatus(
  status: Application['status']
): Promise<Application[]> {
  const data = await loadApplications();
  return data.applications.filter((app) => app.status === status);
}

export async function getPendingProposals(): Promise<{
  direct: Application[];
  outreach: Application[];
}> {
  const data = await loadApplications();

  const direct = data.applications.filter(
    (app) => app.status === 'pending' && app.type === 'direct-apply'
  );

  const outreach = data.applications.filter(
    (app) => app.status === 'pending' && app.type === 'outreach'
  );

  return { direct, outreach };
}
