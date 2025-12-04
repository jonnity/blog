#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { createCanvas, registerFont } = require("canvas");
const sharp = require("sharp");
const yaml = require("js-yaml");

/**
 * Parse frontmatter from a markdown file
 */
function parseFrontmatter(filepath) {
  const content = fs.readFileSync(filepath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    throw new Error(`No frontmatter found in ${filepath}`);
  }

  const frontmatter = yaml.load(match[1]);
  return frontmatter;
}

/**
 * Extract year and month from filename
 * e.g., "monthly-2025-11.md" -> { year: "2025", month: "11" }
 */
function extractYearMonth(filename) {
  const match = filename.match(/monthly-(\d{4})-(\d{2})\.md$/);
  if (!match) {
    throw new Error(`Invalid filename format: ${filename}`);
  }
  return { year: match[1], month: match[2] };
}

/**
 * Register Japanese fonts
 */
function registerJapaneseFonts() {
  try {
    // Register Noto Sans CJK JP fonts
    const regularFont =
      "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc";
    const boldFont = "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc";

    if (fs.existsSync(regularFont)) {
      registerFont(regularFont, { family: "Noto Sans CJK JP" });
      console.log("Registered regular font");
    }

    if (fs.existsSync(boldFont)) {
      registerFont(boldFont, {
        family: "Noto Sans CJK JP",
        weight: "bold",
      });
      console.log("Registered bold font");
    }
  } catch (error) {
    console.warn("Could not register Japanese fonts:", error.message);
  }
}

/**
 * Generate OGP thumbnail image for monthly report
 */
async function generateThumbnail(markdownPath) {
  const filename = path.basename(markdownPath);
  const { year, month } = extractYearMonth(filename);

  // Register Japanese fonts
  registerJapaneseFonts();

  // Parse frontmatter
  const frontmatter = parseFrontmatter(markdownPath);
  const title = frontmatter.title || `月記 (${year}年${month}月)`;
  const summary = frontmatter.summary || [];

  // Image dimensions
  const width = 1200;
  const height = 630;

  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // White background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  // Load and draw logo in upper left
  const logoPath = path.join(__dirname, "..", "public", "logo_keyboard.svg");
  if (fs.existsSync(logoPath)) {
    try {
      // For SVG, we'll use sharp to convert it first
      const logoBuffer = await sharp(logoPath)
        .resize(150, null, { fit: "inside" })
        .png()
        .toBuffer();

      const { createCanvas: createTempCanvas, loadImage } = require("canvas");
      const logoImage = await loadImage(logoBuffer);
      ctx.drawImage(logoImage, 40, 40, logoImage.width, logoImage.height);
    } catch (error) {
      console.warn("Could not load logo:", error.message);
    }
  }

  // Draw title
  ctx.fillStyle = "#000000";
  ctx.font = 'bold 60px "Noto Sans CJK JP", sans-serif';
  ctx.fillText(title, 40, 200);

  // Draw summary bullets
  const maxSummaryItems = 5;
  const summaryItems = summary.slice(0, maxSummaryItems);

  ctx.font = '32px "Noto Sans CJK JP", sans-serif';
  let yPosition = 280;
  const lineHeight = 50;
  const maxWidth = width - 100;

  summaryItems.forEach((item, index) => {
    if (yPosition + lineHeight > height - 40) return; // Don't overflow

    // Draw bullet
    ctx.fillText("•", 50, yPosition);

    // Wrap long text
    const bulletText = item.toString();
    const words = bulletText.split("");
    let line = "";
    let x = 90;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i];
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth - 90 && i > 0) {
        ctx.fillText(line, x, yPosition);
        line = words[i];
        yPosition += lineHeight;
        if (yPosition + lineHeight > height - 40) break;
      } else {
        line = testLine;
      }
    }

    if (line && yPosition + lineHeight <= height - 40) {
      ctx.fillText(line, x, yPosition);
      yPosition += lineHeight + 10; // Extra spacing between items
    }
  });

  // Convert canvas to buffer
  const buffer = canvas.toBuffer("image/png");

  // Convert to WebP using sharp
  const outputFilename = `monthly-report-${year}-${month}-thumbnail.webp`;
  const outputPath = path.join(
    __dirname,
    "..",
    "public",
    "entry",
    outputFilename,
  );

  await sharp(buffer).webp({ quality: 90 }).toFile(outputPath);

  console.log(`Generated thumbnail: ${outputPath}`);

  return {
    thumbnailPath: `/entry/${outputFilename}`,
    outputPath,
    year,
    month,
  };
}

/**
 * Update markdown frontmatter with thumbnail reference
 */
function updateMarkdownFrontmatter(markdownPath, thumbnailPath) {
  const content = fs.readFileSync(markdownPath, "utf8");
  const match = content.match(/^(---\n[\s\S]*?\n---)/);

  if (!match) {
    throw new Error(`No frontmatter found in ${markdownPath}`);
  }

  const frontmatterBlock = match[1];
  const restOfContent = content.slice(frontmatterBlock.length);

  // Parse existing frontmatter
  const frontmatterContent = frontmatterBlock.slice(4, -4); // Remove --- markers
  const frontmatter = yaml.load(frontmatterContent);

  // Add thumbnail and thumbnailAlt
  const filename = path.basename(markdownPath);
  const { year, month } = extractYearMonth(filename);

  frontmatter.thumbnail = thumbnailPath;
  frontmatter.thumbnailAlt = `月記 (${year}年${month}月) のサマリー`;

  // Convert back to YAML
  const newFrontmatter = yaml.dump(frontmatter, {
    lineWidth: -1, // Prevent line wrapping
    quotingType: '"',
    forceQuotes: false,
  });

  const newContent = `---\n${newFrontmatter}---${restOfContent}`;

  fs.writeFileSync(markdownPath, newContent, "utf8");
  console.log(`Updated frontmatter in ${markdownPath}`);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: node generate-monthly-thumbnail.js <markdown-file>");
    console.error(
      "Example: node generate-monthly-thumbnail.js src/entries/monthly-2025-11.md",
    );
    process.exit(1);
  }

  const markdownPath = path.resolve(args[0]);

  if (!fs.existsSync(markdownPath)) {
    console.error(`File not found: ${markdownPath}`);
    process.exit(1);
  }

  try {
    const result = await generateThumbnail(markdownPath);
    updateMarkdownFrontmatter(markdownPath, result.thumbnailPath);
    console.log("Done!");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateThumbnail, updateMarkdownFrontmatter };
