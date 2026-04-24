const fs = require('fs');
const { spawn } = require('child_process');
const data = JSON.parse(fs.readFileSync('data/companies.json', 'utf8'));
const today = new Date();
const todayStr = today.toISOString().split('T')[0];

const RESUME_PATH = '../public/Rayko_Azcue_Resume.pdf';

console.log('=== Validating & Sending Follow-ups ===\n');

let fixes = 0;
let sentCount = 0;
let skipped = 0;

async function run() {
  for (const c of data.companies) {
    if (c.status === 'black-list') {
      continue;
    }
    
    const original = JSON.stringify(c);
    const last = c.contactHistory[c.contactHistory.length - 1];
    const lastType = last.type || last.status;
    const daysAgo = Math.floor((today - new Date(c.lastContact)) / (1000*60*60*24));
    
    let posCount = 0, negCount = 0;
    for (const h of c.contactHistory) {
      if (h.response === 'positive') posCount++;
      if (h.response === 'rejected' || h.response === 'no-response' || h.response === 'bounced') negCount++;
    }
    
    if (c.positiveResponses !== posCount) { c.positiveResponses = posCount; fixes++; }
    if (c.negativeResponses !== negCount) { c.negativeResponses = negCount; fixes++; }
    
    const hasBounced = c.contactHistory.some(h => h.status === 'bounced' || h.response === 'bounced');
    if (hasBounced) c.status = 'black-list';
    else if (lastType === 'follow-up') c.status = daysAgo > 30 ? 'no-response' : 'follow-up';
    else if (lastType === 'outreach' || last.status === 'sent' || lastType === 'direct-apply') c.status = daysAgo > 30 ? 'no-response' : 'outreach';
    else if (last.response === 'rejected') c.status = 'rejected';
    else if (last.status === 'negociation') c.status = 'negociation';
    else if (last.status === 'interview') c.status = 'interview';
    else if (last.response === 'no-response') c.status = 'no-response';
    
    if (JSON.stringify(c) !== original) fixes++;
    
    if (c.status !== 'outreach' || daysAgo <= 7) {
      continue;
    }
    
    const emailsToFollowUp = last.emailsSent || [];
    if (emailsToFollowUp.length === 0) {
      console.log(c.name + ': No emails to follow up');
      continue;
    }
    
    console.log('\n--- ' + c.name + ' ---');
    console.log('Days since outreach: ' + daysAgo);
    console.log('Emails to follow up: ' + emailsToFollowUp.length);
    
    // Send all emails in one call (comma-separated)
    const emailsString = emailsToFollowUp.join(',');
    
    await new Promise((resolve) => {
      const child = spawn('bun', [
        'run',
        'send',
        '--to', emailsString,
        '--type', 'follow-up',
        '--attachment', RESUME_PATH,
        '--company', c.name
      ], { cwd: '/home/rayko/WebstormProjects/razcue.github.io/job-hunt' });
      
      let output = '';
      child.stdout.on('data', (d) => output += d);
      child.stderr.on('data', (d) => output += d);
      child.on('close', () => {
        // Parse output to get sent/failed emails
        const sentMatch = output.match(/SENT_EMAILS=([^\n]*)/);
        const failedMatch = output.match(/FAILED_EMAILS=([^\n]*)/);
        
        const sentEmails = sentMatch ? sentMatch[1].split(',').filter(e => e) : [];
        const failedEmails = failedMatch ? failedMatch[1].split(',').filter(e => e) : [];
        
        console.log('  Sent: ' + sentEmails.length);
        console.log('  Failed: ' + failedEmails.length);
        
        c.contactHistory.push({
          date: todayStr,
          type: 'follow-up',
          status: 'sent',
          response: 'no-response',
          emailsSent: sentEmails,
          emailsFailed: failedEmails,
          notes: 'Follow-up sent to ' + sentEmails.length + ' emails, ' + failedEmails.length + ' failed'
        });
        
        c.status = 'follow-up';
        c.lastContact = todayStr;
        c.totalContacts = (c.totalContacts || 0) + 1;
        sentCount++;
        resolve();
      });
    });
  }
  
  data.lastUpdated = todayStr;
  fs.writeFileSync('data/companies.json', JSON.stringify(data, null, 2));

  console.log('\n=== Status Distribution ===');
  const counts = {};
  for (const c of data.companies) counts[c.status] = (counts[c.status] || 0) + 1;
  for (const [s, n] of Object.entries(counts)) console.log('  ' + s + ': ' + n);
  
  console.log('\n' + sentCount + ' follow-ups processed');
  console.log(skipped + ' skipped');
}

run().catch(console.error);