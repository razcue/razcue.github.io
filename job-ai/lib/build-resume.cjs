#!/usr/bin/env node
/* eslint-disable */

/**
 * Resume Builder Script
 *
 * Builds an ATS-friendly HTML resume from a JSON config and converts to PDF.
 * Automatically merges contact info and education from default.json.
 * Tracks build history metadata for easy rebuilds.
 *
 * Usage:
 *   node build-resume.js [config-name]
 *   node build-resume.js 2025-02-10-google-senior-frontend-engineer
 *   node build-resume.js default
 *
 * Config files:
 *   - resume-builder/configs/default.json (base profile, contact, education)
 *   - resume-builder/configs/YYYY-MM-DD-{company}-{role}.json (tailored resumes)
 *
 * The script will:
 *   1. Load the config
 *   2. Merge missing contactInfo/education from default.json
 *   3. Render HTML from template
 *   4. Convert to PDF
 *   5. Update position-history.json with metadata entry
 *   6. Save PDF to public/resume.pdf (or public/Rayko_Azcue_Resume.pdf for default)
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const puppeteer = require('puppeteer');

const CONFIGS_DIR = path.join(__dirname, '..', 'data', 'configs');
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const DEFAULT_CONFIG_FILE = path.join(
  __dirname,
  '..',
  'data',
  'configs',
  'default.json'
);
const POSITION_HISTORY_FILE = path.join(__dirname, 'position-history.json');
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'public');

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
 * Load default config (for fallback values)
 */
function loadDefaultConfig() {
  if (!fs.existsSync(DEFAULT_CONFIG_FILE)) {
    console.warn('⚠️  Default config not found. Using minimal defaults.');
    return {
      contactInfo: {
        location: 'Havana, Cuba',
        email: 'razcue@yandex.com',
        phone: '+53 5476-1244',
        website: 'razcue.github.io',
      },
      education: [],
    };
  }

  const raw = fs.readFileSync(DEFAULT_CONFIG_FILE, 'utf8');
  return JSON.parse(raw);
}

/**
 * Merge config with defaults
 * Prioritizes config values, uses defaults for missing contactInfo/education
 */
function mergeWithDefaults(config, defaults) {
  return {
    ...defaults,
    ...config,
    contactInfo: {
      ...defaults.contactInfo,
      ...(config.contactInfo || {}),
    },
    education: config.education || defaults.education || [],
    skills: {
      ...defaults.skills,
      ...(config.skills || {}),
    },
    experience: config.experience || defaults.experience || [],
    summary: config.summary || defaults.summary || '',
  };
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

  // Helper for equality comparison
  Handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });
}

/**
 * Render template with data
 */
function renderResume(templateSource, config) {
  const template = Handlebars.compile(templateSource);

  // Config now contains: contactInfo, summary, skills, education, experience, metadata
  const data = {
    // Header name is fixed in template (Rayko Azcue Pérez)
    language: config.metadata?.language || 'en',
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

    // Load config
    console.log('1️⃣  Loading configuration...');
    const config = loadConfig(configName);

    // Load defaults and merge
    console.log('2️⃣  Loading defaults and merging...');
    const defaults = loadDefaultConfig();
    const mergedConfig = mergeWithDefaults(config, defaults);
    console.log(`   ✅ Loaded config: ${configName}`);
    console.log(
      `   📇 Contact: ${mergedConfig.contactInfo.email} · ${mergedConfig.contactInfo.location}`
    );

    // Load template
    console.log('\n3️⃣  Loading template...');
    const templateSource = loadTemplate('harvard-template');
    console.log('   ✅ Template loaded');

    // Render HTML
    console.log('\n4️⃣  Rendering HTML...');
    const html = renderResume(templateSource, mergedConfig);
    console.log('   ✅ HTML rendered');

    // Save HTML (for debugging)
    const htmlOutputPath = path.join(OUTPUT_DIR, 'resume.html');
    fs.writeFileSync(htmlOutputPath, html);
    console.log(`   📝 HTML saved: ${htmlOutputPath}`);

    // Convert to PDF
    console.log('\n5️⃣  Converting to PDF...');

    // Use unique filename based on config ID to avoid overwriting previous resumes
    const pdfFilename =
      configName === 'default'
        ? 'Rayko_Azcue_Resume.pdf'
        : `resume-${configName}.pdf`;
    const pdfOutputPath = path.join(OUTPUT_DIR, pdfFilename);

    await htmlToPdf(html, pdfOutputPath);
    console.log(`   📄 PDF saved: ${pdfOutputPath}`);

    // Save to position history only if a position JSON was provided
    if (positionJsonPath) {
      console.log('\n6️⃣  Building position history entry...');

      // Extract metadata from config
      const configMetadata = config.metadata || {};

      // Metadata entry (lightweight, only essential info)
      const historyEntry = {
        id: configMetadata.id || configName,
        timestamp: new Date().toISOString(),
        configFilename: `${configName}.json`,
        metadata: {
          targetPosition: configMetadata.targetPosition || config.summary || '',
          company: configMetadata.company || '',
          language: configMetadata.language || 'en',
          keywords: configMetadata.keywords || { technical: [], soft: [] },
          applicationDeadline: configMetadata.applicationDeadline || null,
          status: configMetadata.status || 'draft',
          dateCreated: configMetadata.dateCreated || new Date().toISOString(),
        },
      };

      savePositionHistory(historyEntry);
      console.log('   ✅ Position history updated');
    }

    // Summary
    console.log('\n✅ Resume build complete!\n');
    console.log(`📊 Summary:`);
    console.log(
      `   - Contact: ${mergedConfig.contactInfo.email} · ${mergedConfig.contactInfo.location}`
    );
    console.log(`   - Experiences: ${mergedConfig.experience.length}`);
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
