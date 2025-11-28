#!/usr/bin/env node
/* eslint-disable */

/**
 * Resume Builder Script
 *
 * Builds an ATS-friendly HTML resume from a JSON config and converts to PDF.
 * Tracks build history for easy rebuilds.
 *
 * Usage:
 *   node build-resume.js [config-name]
 *   node build-resume.js default
 *   node build-resume.js tailored-react-engineer
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const puppeteer = require('puppeteer');

const CONFIGS_DIR = path.join(__dirname, 'configs');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const POSITION_HISTORY_FILE = path.join(__dirname, 'position-history.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'public');

/**
 * Load config file
 */
function loadConfig(configName) {
  const configPath = path.join(CONFIGS_DIR, `${configName}.json`);

  if (!fs.existsSync(configPath)) {
    console.error(`❌ Config not found: ${configPath}`);
    console.log(`Available configs:`);
    const configs = fs
      .readdirSync(CONFIGS_DIR)
      .filter((f) => f.endsWith('.json'));
    configs.forEach((c) => console.log(`  - ${c.replace('.json', '')}`));
    process.exit(1);
  }

  const raw = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(raw);
}

/**
 * Load template
 */
function loadTemplate(templateName) {
  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.html`);

  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template not found: ${templatePath}`);
    process.exit(1);
  }

  return fs.readFileSync(templatePath, 'utf8');
}

/**
 * Register Handlebars helpers
 */
function registerHelpers() {
  // Helper to check if value exists
  Handlebars.registerHelper('if', function (conditional, options) {
    if (conditional) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  // Helper for each loop
  Handlebars.registerHelper('each', function (context, options) {
    let ret = '';
    if (context && context.length > 0) {
      for (let i = 0; i < context.length; i++) {
        ret += options.fn(context[i]);
      }
    }
    return ret;
  });
}

/**
 * Render template with data
 */
function renderResume(templateSource, config) {
  const template = Handlebars.compile(templateSource);

  // Config now contains: contactInfo, summary, skills, education, experience
  const data = {
    // Header name is fixed in template (Rayko Azcue Pérez)
    location: config.contactInfo.location || '',
    phone: config.contactInfo.phone || '',
    email: config.contactInfo.email || '',
    website: config.contactInfo.website || '',
    summary: config.summary || null,
    skills: config.skills || null,
    education: config.education || [],
    experience: config.experience || [],
  };

  return template(data);
}

/**
 * Convert HTML to PDF using Puppeteer
 */
async function htmlToPdf(html, outputPath) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in',
    },
  });

  await browser.close();
}

/**
 * Save build to history
 */
function savePositionHistory(entry) {
  let history = [];

  if (fs.existsSync(POSITION_HISTORY_FILE)) {
    const raw = fs.readFileSync(POSITION_HISTORY_FILE, 'utf8');
    try {
      history = JSON.parse(raw);
    } catch (e) {
      history = [];
    }
  }

  history.unshift(entry);

  // Keep last 100 entries
  if (history.length > 100) {
    history = history.slice(0, 100);
  }

  fs.writeFileSync(POSITION_HISTORY_FILE, JSON.stringify(history, null, 2));
}

/**
 * Main build function
 */
async function buildResume(configName, positionJsonPath) {
  console.log(`\n📄 Building resume from config: ${configName}\n`);

  try {
    // Register Handlebars helpers
    registerHelpers();

    // Load config (contactInfo, education, experience)
    console.log('1️⃣  Loading configuration...');
    const config = loadConfig(configName);
    console.log(`   ✅ Loaded config: ${configName}`);
    console.log(
      `   📇 Contact: ${config.contactInfo.email} · ${config.contactInfo.location}`
    );

    // Load template
    console.log('\n2️⃣  Loading template...');
    const templateSource = loadTemplate('harvard-template');
    console.log('   ✅ Template loaded');

    // Render HTML
    console.log('\n3️⃣  Rendering HTML...');
    const html = renderResume(templateSource, config);
    console.log('   ✅ HTML rendered');

    // Save HTML (for debugging)
    const htmlOutputPath = path.join(OUTPUT_DIR, 'resume.html');
    fs.writeFileSync(htmlOutputPath, html);
    console.log(`   📝 HTML saved: ${htmlOutputPath}`);

    // Convert to PDF
    console.log('\n4️⃣  Converting to PDF...');

    // Use descriptive filename for default resume, generic for position-specific
    const pdfFilename = positionJsonPath
      ? 'resume.pdf'
      : 'Rayko_Azcue_Resume.pdf';
    const pdfOutputPath = path.join(OUTPUT_DIR, pdfFilename);

    await htmlToPdf(html, pdfOutputPath);
    console.log(`   📄 PDF saved: ${pdfOutputPath}`);

    // Save to position history only if a position JSON was provided
    if (positionJsonPath) {
      console.log('\n5️⃣  Building position history entry...');

      let positionData = {};
      try {
        const raw = fs.readFileSync(positionJsonPath, 'utf8');
        positionData = JSON.parse(raw);
      } catch (e) {
        // If parsing fails, use plain text description
        positionData = {
          description: fs.readFileSync(positionJsonPath, 'utf8'),
        };
      }

      // Minimal metadata extraction (prefer explicit fields in position JSON)
      const metadata = {
        language: positionData.language || 'en',
        targetPosition: positionData.targetPosition || positionData.title || '',
        keywords: positionData.keywords || { technical: [], soft: [] },
        client: positionData.client || null,
        dateBuilt: new Date().toISOString(),
      };

      // Simple generated cover letter and email (placeholders; can be edited later)
      const coverLetter =
        positionData.coverLetter ||
        `Dear Hiring Team,\n\nI am excited to apply for the ${metadata.targetPosition} role${metadata.client ? ' at ' + metadata.client : ''}. I bring hands-on experience building production front-end applications, with a focus on performance, accessibility, and measurable business impact. Attached is a tailored resume highlighting relevant achievements.\n\nSincerely,\nRayko Azcue Pérez`;

      const emailLetter =
        positionData.emailLetter ||
        `Hi ${metadata.client || 'Hiring Team'},\n\nI've attached my resume for the ${metadata.targetPosition} role. I look forward to discussing how my experience can help your team.\n\nBest regards,\nRayko`;

      const historyEntry = {
        id: `pos-${new Date().toISOString().replace(/[:.]/g, '-')}`,
        timestamp: new Date().toISOString(),
        metadata,
        description: positionData.description || positionData,
        coverLetter,
        emailLetter,
        resume: {
          contactInfo: config.contactInfo,
          education: config.education,
          experience: config.experience,
        },
        outputFile: pdfOutputPath,
      };

      savePositionHistory(historyEntry);
      console.log('   ✅ Position history updated');
    }

    // Summary
    console.log('\n✅ Resume build complete!\n');
    console.log(`📊 Summary:`);
    console.log(
      `   - Contact: ${config.contactInfo.email} · ${config.contactInfo.location}`
    );
    console.log(`   - Experiences: ${config.experience.length}`);
    console.log(`   - Output: ${pdfOutputPath}\n`);
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// CLI execution
if (require.main === module) {
  const configName = process.argv[2] || 'default';
  const positionJsonPath = process.argv[3] || null;
  buildResume(configName, positionJsonPath);
}

module.exports = { buildResume };
