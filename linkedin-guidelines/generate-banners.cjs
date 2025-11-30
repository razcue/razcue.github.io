#!/usr/bin/env node

/**
 * LinkedIn Banner Screenshot Generator
 * Converts HTML banner files to PNG images
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BANNERS_DIR = path.join(__dirname);
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'linkedin');

const banners = [{ file: 'banner-clean-navy.html', name: 'banner.png' }];

async function generateBanners() {
  console.log('\n📸 LinkedIn Banner Generator\n');

  // Create exports directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const banner of banners) {
    try {
      console.log(`📄 Processing ${banner.file}...`);

      const page = await browser.newPage();

      // Set viewport to exact LinkedIn banner size
      await page.setViewport({
        width: 1584,
        height: 396,
        deviceScaleFactor: 2, // For retina/high-DPI displays
      });

      // Load HTML file
      const htmlPath = path.join(BANNERS_DIR, banner.file);
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle0',
        timeout: 60000,
      });

      // Take screenshot of the .banner element only (removes padding)
      const element = await page.$('.banner');
      if (element) {
        const outputPath = path.join(OUTPUT_DIR, banner.name);
        await element.screenshot({
          path: outputPath,
          type: 'png',
        });
        console.log(`✅ Saved: ${outputPath}`);
      } else {
        console.log(
          `⚠️  No .banner element found, taking full page screenshot`
        );
        const outputPath = path.join(OUTPUT_DIR, banner.name);
        await page.screenshot({
          path: outputPath,
          type: 'png',
          fullPage: false,
        });
        console.log(`✅ Saved: ${outputPath}`);
      }

      await page.close();
    } catch (error) {
      console.error(`❌ Error processing ${banner.file}:`, error.message);
    }
  }

  await browser.close();

  console.log('\n✨ All banners generated successfully!');
  console.log(`📁 Location: ${OUTPUT_DIR}\n`);
}

// Run
generateBanners().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
