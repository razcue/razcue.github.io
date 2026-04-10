import { config } from 'dotenv';
import Imap from 'imap';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

config();

const YANDEX_USER = process.env.YANDEX_USER || 'razcue';
const YANDEX_APP_PASSWORD = process.env.YANDEX_IMAP_APP_PASSWORD;
const YANDEX_IMAP_HOST = process.env.YANDEX_IMAP_HOST || 'imap.yandex.com';
const YANDEX_IMAP_PORT = parseInt(process.env.YANDEX_IMAP_PORT || '993', 10);

const EMAIL_STATE_FILE = join(process.cwd(), 'data', 'email-state.json');
const MANUAL_TODO_FILE = join(process.cwd(), 'temp', 'MANUAL_TODO.md');
const DATA_DIR = join(process.cwd(), 'data');

interface AppData {
  id: string;
  company: { name: string; website?: string };
  position?: { title: string };
  status: string;
  outcomes?: { responseReceived?: boolean; responseType?: string };
}

interface EmailState {
  lastEmailCheck: string | null;
}

interface ClassificationResult {
  type: 'positive' | 'negative' | 'neutral' | 'in-review' | 'unclear';
  confidence: number;
  reasoning: string;
  summary: string;
}

interface TodoItem {
  appId: string;
  company: string;
  position: string;
  from: string;
  subject: string;
  date: string;
  classification: ClassificationResult;
  body: string;
}

function loadApplications(): AppData[] {
  const apps: AppData[] = [];
  const seen = new Set<string>();

  ['applications.json', 'applications-2026-02.json'].forEach((file) => {
    const path = join(DATA_DIR, file);
    if (existsSync(path)) {
      try {
        const data = JSON.parse(readFileSync(path, 'utf-8'));
        (data.applications || []).forEach((app: AppData) => {
          if (!seen.has(app.id)) {
            seen.add(app.id);
            apps.push(app);
          }
        });
      } catch (e) {
        console.error(`Error loading ${file}:`, e);
      }
    }
  });
  return apps;
}

function loadEmailState(): EmailState {
  try {
    if (existsSync(EMAIL_STATE_FILE))
      return JSON.parse(readFileSync(EMAIL_STATE_FILE, 'utf-8'));
  } catch {}
  return { lastEmailCheck: null };
}

function saveEmailState(state: EmailState) {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(EMAIL_STATE_FILE, JSON.stringify(state, null, 2));
}

function saveApplications(apps: AppData[]) {
  mkdirSync(DATA_DIR, { recursive: true });

  const currentApps: AppData[] = [];
  const archivedApps: AppData[] = [];

  apps.forEach((app) => {
    const appDate = app.applicationDate || '';
    if (appDate.startsWith('2026-02')) {
      archivedApps.push(app);
    } else {
      currentApps.push(app);
    }
  });

  if (currentApps.length > 0) {
    writeFileSync(
      join(DATA_DIR, 'applications.json'),
      JSON.stringify(
        {
          applications: currentApps,
          lastUpdated: new Date().toISOString().split('T')[0],
        },
        null,
        2
      )
    );
  }

  if (archivedApps.length > 0) {
    writeFileSync(
      join(DATA_DIR, 'applications-2026-02.json'),
      JSON.stringify({ applications: archivedApps }, null, 2)
    );
  }
}

function extractDomain(emailOrUrl: string): string | null {
  try {
    let domain = emailOrUrl.toLowerCase();

    const emailMatch = domain.match(/<([^>]+)>/);
    if (emailMatch) {
      domain = emailMatch[1];
    }

    if (domain.includes('@')) {
      domain = domain.split('@')[1] || '';
    }
    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
    domain = domain.split('/')[0]?.split(':')[0] || '';
    domain = domain.split('>')[0] || '';
    if (domain.startsWith('.')) domain = domain.substring(1);
    return domain || null;
  } catch {
    return null;
  }
}

function buildCompanyKeywords(apps: AppData[]): Map<string, AppData> {
  const keywordMap = new Map<string, AppData>();

  const atsMapping: Record<string, string> = {
    'ashbyhq.com': 'Deel',
    'breezy-mail.com': 'Cyberpuerta',
    'breezy.hr': 'Cyberpuerta',
    'catawiki.nl': 'Catawiki',
    'lever.co': 'Lever',
    'greenhouse.io': 'Greenhouse',
    'workday.com': 'Workday',
    'jobvite.com': 'Jobvite',
    'icims.com': 'iCIMS',
  };

  const appMap = new Map(apps.map((a) => [a.company.name.toLowerCase(), a]));

  for (const [ats, companyName] of Object.entries(atsMapping)) {
    const app = appMap.get(companyName.toLowerCase());
    if (app) {
      keywordMap.set(ats, app);
    }
  }

  apps.forEach((app) => {
    const nameLower = app.company.name.toLowerCase();
    const nameNoSpaces = nameLower.replace(/\s+/g, '');

    keywordMap.set(nameLower, app);
    keywordMap.set(nameNoSpaces, app);

    if (app.company.website) {
      const domain = extractDomain(app.company.website);
      if (domain) {
        keywordMap.set(domain, app);
        keywordMap.set(nameNoSpaces + '.com', app);
      }
    }
  });

  return keywordMap;
}

function checkIfJobRelated(subject: string, body: string): boolean {
  const text = (subject + ' ' + body).toLowerCase();

  const jobKeywords = [
    'application',
    'job',
    'position',
    'role',
    'hiring',
    'careers',
    'empleo',
    'trabajo',
    'vacante',
    'entrevista',
    'interview',
    'candidate',
    'candidato',
    'reclutamiento',
    'curriculum',
    'cv',
    'resume',
    'technical interview',
    'coding challenge',
    'assessment',
  ];

  const nonJobKeywords = [
    'unsubscribe',
    'newsletter',
    '20% off',
    'discount',
    'sale',
    'special offer',
    'password reset',
    'account verification',
    'delivery confirmation',
    'out of office',
  ];

  const nonJobCount = nonJobKeywords.filter((k) => text.includes(k)).length;
  if (nonJobCount >= 2) return false;

  const jobCount = jobKeywords.filter((k) => text.includes(k)).length;
  return jobCount >= 2;
}

function classifyWithAI(
  companyName: string,
  position: string,
  subject: string,
  body: string,
  from: string
): ClassificationResult {
  const text = (subject + ' ' + body).toLowerCase();
  const shortBody = body.substring(0, 2000);

  const positivePhrases = [
    'interview',
    'schedule',
    'call',
    'great fit',
    'next steps',
    'interested',
    'proceed',
    'zoom',
    'invitation',
    'congratulations',
    'nice to meet',
    'entrevista',
    'conocer',
    'felicitacion',
  ];

  const negativePhrases = [
    'not moving forward',
    'other candidate',
    'not selected',
    'no longer considering',
    'position filled',
    'not a fit',
    'unfortunately',
    'regret',
    'another candidate',
    'after careful consideration',
    'skills and experiences',
    'more closely align',
    'specific requirements',
    'residency',
    'documentación',
    'trabajar',
    'legal',
    'rechaz',
    'no podremos',
    'considerarte',
    'cannot proceed',
    'update on your application',
    'moving forward with other',
    'proceed with other',
  ];

  const inReviewPhrases = [
    'received your application',
    'will review',
    'under review',
    'being reviewed',
    'hemos recibido',
    'recibido tu solicitud',
    'equipo de atracción',
    'revisará',
    'proceso de selección',
    'en revisión',
  ];

  const neutralPhrases = [
    'out of office',
    'auto-reply',
    'automatic reply',
    'vacation',
    'delivery confirmation',
    'delivered',
    'fuera de oficina',
  ];

  const marketingPatterns = [
    '20% off',
    'discount',
    'sale',
    'special offer',
    'promotion',
    'unsubscribe',
    'how does you and',
    'off for life',
  ];

  let positiveScore = 0;
  let negativeScore = 0;
  let inReviewScore = 0;
  let neutralScore = 0;
  let marketingScore = 0;

  positivePhrases.forEach((phrase) => {
    if (text.includes(phrase)) positiveScore += 15;
  });

  negativePhrases.forEach((phrase) => {
    if (text.includes(phrase)) negativeScore += 15;
  });

  inReviewPhrases.forEach((phrase) => {
    if (text.includes(phrase)) inReviewScore += 15;
  });

  neutralPhrases.forEach((phrase) => {
    if (text.includes(phrase)) neutralScore += 10;
  });

  marketingPatterns.forEach((phrase) => {
    if (text.includes(phrase)) marketingScore += 20;
  });

  if (marketingScore > positiveScore && marketingScore > negativeScore) {
    return {
      type: 'unclear',
      confidence: Math.min(marketingScore * 3, 85),
      reasoning: 'Detected marketing/promotional content',
      summary: shortBody.substring(0, 150),
    };
  }

  if (
    neutralScore > positiveScore &&
    neutralScore > negativeScore &&
    neutralScore > inReviewScore
  ) {
    return {
      type: 'neutral',
      confidence: Math.min(neutralScore * 5, 95),
      reasoning: 'Detected out-of-office or automatic reply',
      summary: shortBody.substring(0, 150),
    };
  }

  if (inReviewScore > positiveScore && inReviewScore > negativeScore) {
    return {
      type: 'in-review',
      confidence: Math.min(inReviewScore * 5, 90),
      reasoning: 'Detected application received/confirmation email',
      summary: shortBody.substring(0, 150),
    };
  }

  if (positiveScore > negativeScore * 1.1) {
    return {
      type: 'positive',
      confidence: Math.min(positiveScore * 4, 95),
      reasoning: `Detected positive signals: ${positivePhrases.filter((p) => text.includes(p)).join(', ')}`,
      summary: shortBody.substring(0, 200),
    };
  }

  if (
    negativeScore > positiveScore * 1.1 ||
    text.includes('update on your application')
  ) {
    let reason = `Detected negative signals: ${negativePhrases.filter((p) => text.includes(p)).join(', ')}`;

    if (text.includes('residenc') || text.includes('documentación')) {
      reason = 'Rejection due to residency/work permit requirements';
    } else if (text.includes('skills') && text.includes('align')) {
      reason = 'Rejection - skills/experience not aligned with requirements';
    } else if (
      text.includes('update on your application') &&
      !text.includes('nice to meet')
    ) {
      reason = 'Generic application update - likely rejection or status change';
    }

    return {
      type: 'negative',
      confidence: Math.min(negativeScore * 4, 95),
      reasoning: reason,
      summary: shortBody.substring(0, 200),
    };
  }

  return {
    type: 'unclear',
    confidence: 40,
    reasoning: 'Mixed signals or unclear intent - manual review needed',
    summary: shortBody.substring(0, 200),
  };
}

function updateTodo(items: TodoItem[]) {
  mkdirSync(join(process.cwd(), 'temp'), { recursive: true });

  const header = `# Manual TODO - Job Application Responses

Generated: ${new Date().toISOString().split('T')[0]}

> **Important:** Review these emails and tell me the result:
> - "Email from {company} was positive/negative/in-review" → I'll update the system
> - "Ignore this email" → I'll mark it as handled

---

## Emails Needing Review

| Company | Position | From | Subject | Classification | Reasoning |
|---------|----------|------|---------|---------------|----------|
`;

  if (items.length === 0) {
    writeFileSync(
      MANUAL_TODO_FILE,
      header + '\nNo emails requiring manual review.\n'
    );
    return;
  }

  const rows = items
    .map((e) => {
      const reason = e.classification.reasoning.substring(0, 60);
      return `| ${e.company} | ${e.position} | ${e.from.substring(0, 20)} | ${e.subject.substring(0, 30)} | **${e.classification.type}** (${e.classification.confidence}%) | ${reason} |`;
    })
    .join('\n');

  writeFileSync(MANUAL_TODO_FILE, header + rows + '\n');
}

async function fetchEmailContent(
  imap: any,
  seqNo: number
): Promise<{ headers: string; body: string; date: string }> {
  return new Promise((resolve) => {
    let from = '',
      subject = '',
      date = '',
      body = '';
    let done = { header: false, body: false };

    const checkDone = () => {
      if (done.header && done.body) {
        const h = `From: ${from}\nSubject: ${subject}`;
        resolve({ headers: h, body, date });
      }
    };

    imap
      .fetch(seqNo.toString(), { bodies: 'HEADER' })
      .once('message', (msg: any) => {
        msg.on('body', (stream: any) => {
          let data = '';
          stream.on('data', (chunk: Buffer) => {
            data += chunk.toString();
          });
          stream.on('end', () => {
            from = data.match(/From: ([^\r\n]+)/)?.[1] || '';
            subject = data.match(/Subject: ([^\r\n]+)/)?.[1] || '';
            date = data.match(/Date: ([^\r\n]+)/)?.[1] || '';
            done.header = true;
            checkDone();
          });
        });
      })
      .on('error', () => {
        done.header = true;
        checkDone();
      });

    setTimeout(() => {
      imap
        .fetch(seqNo.toString(), { bodies: 'TEXT' })
        .once('message', (msg: any) => {
          msg.on('body', (stream: any) => {
            let data = '';
            stream.on('data', (chunk: Buffer) => {
              data += chunk.toString();
            });
            stream.on('end', () => {
              body = data;
              done.body = true;
              checkDone();
            });
          });
        })
        .on('error', () => {
          done.body = true;
          checkDone();
        });
    }, 50);
  });
}

async function checkEmails(): Promise<{
  processed: number;
  matches: number;
  manualReview: number;
  updated: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let processed = 0,
    matches = 0,
    manualReview = 0,
    updated = 0;

  if (!YANDEX_APP_PASSWORD) {
    errors.push('Missing YANDEX_IMAP_APP_PASSWORD');
    return { processed, matches, manualReview, updated, errors };
  }

  const apps = loadApplications();
  const emailState = loadEmailState();
  const companyKeywordMap = buildCompanyKeywords(apps);

  console.log(`Loaded ${apps.length} applications`);
  console.log(`Tracking ${companyKeywordMap.size} company keywords`);

  const sinceDate = emailState.lastEmailCheck
    ? new Date(emailState.lastEmailCheck)
    : new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

  const sinceDateStr = sinceDate.toISOString().split('T')[0];

  console.log(`Checking emails since: ${sinceDateStr}`);

  const MAX_EMAILS = 100;

  const todo: TodoItem[] = [];

  return new Promise((resolve) => {
    const imap = new Imap({
      user: YANDEX_USER,
      password: YANDEX_APP_PASSWORD,
      host: YANDEX_IMAP_HOST,
      port: YANDEX_IMAP_PORT,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    });

    imap.on('ready', () => {
      imap.openBox('INBOX', true, (err: Error | null, box: any) => {
        if (err) {
          errors.push(err.message);
          imap.end();
          resolve({ processed, matches, manualReview, updated, errors });
          return;
        }

        console.log(`INBOX has ${box.messages.total} emails`);

        imap.search(
          [['SINCE', sinceDateStr]],
          (err: Error | null, results: number[] | undefined) => {
            if (err || !results || results.length === 0) {
              console.log('No new emails since last check');
              emailState.lastEmailCheck = new Date().toISOString();
              saveEmailState(emailState);
              updateTodo(todo);
              imap.end();
              resolve({ processed, matches, manualReview, updated, errors });
              return;
            }

            console.log(`Found ${results.length} emails since last check`);
            const emailsToProcess = results;
            console.log(
              `Processing all ${emailsToProcess.length} emails since last check...`
            );

            const processEmail = async (i: number) => {
              if (i >= emailsToProcess.length) {
                emailState.lastEmailCheck = new Date().toISOString();
                saveEmailState(emailState);
                if (updated > 0) {
                  saveApplications(apps);
                }
                updateTodo(todo);
                console.log(
                  `\n✓ Done. Processed: ${processed}, Matches: ${matches}, Manual review: ${manualReview}, Updated: ${updated}`
                );
                imap.end();
                resolve({ processed, matches, manualReview, updated, errors });
                return;
              }

              const seq = emailsToProcess[i];
              processed++;

              if (processed % 10 === 0) {
                process.stdout.write(
                  `\rProcessed: ${processed}/${emailsToProcess.length}...`
                );
              }

              try {
                const { headers, body, date } = await fetchEmailContent(
                  imap,
                  seq
                );

                const from = (
                  headers.match(/From: ([^\r\n]+)/)?.[1] || ''
                ).trim();
                const subject = (
                  headers.match(/Subject: ([^\r\n]+)/)?.[1] || ''
                ).trim();
                const senderDomain = extractDomain(from);

                let matchedApp: AppData | null = null;
                const emailText = (
                  from +
                  ' ' +
                  subject +
                  ' ' +
                  body
                ).toLowerCase();

                if (senderDomain) {
                  for (const [key, app] of companyKeywordMap) {
                    const isExactMatch =
                      senderDomain === key || senderDomain.endsWith('.' + key);
                    if (isExactMatch) {
                      matchedApp = app;
                      break;
                    }
                  }
                }

                if (!matchedApp) {
                  for (const [key, app] of companyKeywordMap) {
                    if (key.length > 4 && emailText.includes(key)) {
                      matchedApp = app;
                      break;
                    }
                  }
                }

                if (matchedApp) {
                  matches++;
                  console.log(`\n  [${seq}] MATCH: ${matchedApp.company.name}`);
                  console.log(`      From: ${from}`);
                  console.log(`      Subject: ${subject.substring(0, 50)}`);

                  const position =
                    matchedApp.position?.title || 'Unknown Position';
                  const classification = classifyWithAI(
                    matchedApp.company.name,
                    position,
                    subject,
                    body,
                    from
                  );
                  console.log(
                    `      Classification: ${classification.type} (${classification.confidence}%)`
                  );

                  const HIGH_CONFIDENCE = 80;
                  const alreadyResponded =
                    matchedApp.outcomes?.responseReceived;

                  if (classification.confidence >= HIGH_CONFIDENCE) {
                    if (
                      classification.type === 'positive' &&
                      !alreadyResponded
                    ) {
                      matchedApp.outcomes = {
                        responseReceived: true,
                        responseType: 'positive',
                      };
                      updated++;
                    } else if (
                      classification.type === 'negative' &&
                      !alreadyResponded
                    ) {
                      matchedApp.outcomes = {
                        responseReceived: true,
                        responseType: 'rejected',
                      };
                      updated++;
                    } else if (
                      classification.type === 'in-review' &&
                      !alreadyResponded
                    ) {
                      matchedApp.outcomes = {
                        responseReceived: true,
                        responseType: 'in-review',
                      };
                      updated++;
                    }
                  } else {
                    todo.push({
                      appId: matchedApp.id,
                      company: matchedApp.company.name,
                      position: position,
                      from: from,
                      subject: subject,
                      date: date.trim(),
                      classification,
                      body: body.substring(0, 500),
                    });
                    manualReview++;
                  }
                } else {
                  const isJobRelated = checkIfJobRelated(subject, body);
                  if (isJobRelated) {
                    todo.push({
                      appId: 'unknown',
                      company: 'Unknown (job-related)',
                      position: 'Unknown',
                      from: from,
                      subject: subject,
                      date: date.trim(),
                      classification: {
                        type: 'unclear',
                        confidence: 0,
                        reasoning:
                          'Matched company but low confidence - or job-related email not in tracked companies',
                        summary: body.substring(0, 200),
                      },
                      body: body.substring(0, 500),
                    });
                    manualReview++;
                  }
                }
              } catch (e) {
                console.error(`Error processing email ${seq}:`, e);
              }

              setTimeout(() => processEmail(i + 1), 10);
            };

            processEmail(0);
          }
        );
      });
    });

    imap.on('error', (e: Error) => {
      errors.push(e.message);
      resolve({ processed, matches, manualReview, updated, errors });
    });

    imap.connect();
  });
}

checkEmails().then((r) => {
  if (r.errors.length) {
    console.error('\nErrors:', r.errors);
    process.exit(1);
  }
  if (r.manualReview > 0) {
    console.log(
      `\n⚠️  ${r.manualReview} email(s) need manual review. See temp/MANUAL_TODO.md`
    );
  }
  process.exit(0);
});
