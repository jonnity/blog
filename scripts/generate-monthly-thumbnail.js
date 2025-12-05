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
 * Check if a character should not appear at the beginning of a line (行頭禁則文字)
 */
function isLineStartForbiddenChar(char) {
  const forbiddenChars = [
    "、",
    "。",
    "，",
    "．",
    ")",
    "）",
    "]",
    "］",
    "}",
    "｝",
    "」",
    "』",
    "】",
    "〕",
    "〉",
    "》",
    "！",
    "？",
    "!",
    "?",
  ];
  return forbiddenChars.includes(char);
}

/**
 * Wrap text with Japanese line breaking rules (禁則処理)
 */
function wrapTextWithKinsoku(ctx, text, maxWidth) {
  const lines = [];
  const chars = text.split("");
  let currentLine = "";

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const testLine = currentLine + char;
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && currentLine.length > 0) {
      // Check if current char is a line-start forbidden character
      if (isLineStartForbiddenChar(char)) {
        // Move the last character from current line to next line with this char
        if (currentLine.length > 0) {
          const lastChar = currentLine[currentLine.length - 1];
          lines.push(currentLine.slice(0, -1));
          currentLine = lastChar + char;
        } else {
          // Edge case: if somehow the line is empty, just add the char
          currentLine = char;
        }
      } else {
        // Normal line break
        lines.push(currentLine);
        currentLine = char;
      }
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
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

  // Load and draw background image
  const bgPath = path.join(
    __dirname,
    "..",
    "public",
    "bg-ant-nest_landscape.webp",
  );
  const { loadImage } = require("canvas");

  if (fs.existsSync(bgPath)) {
    try {
      // Convert WebP to PNG buffer using sharp
      const bgBuffer = await sharp(bgPath)
        .resize(width, height, { fit: "cover" })
        .png()
        .toBuffer();

      const bgImage = await loadImage(bgBuffer);
      // Draw background image to fill the canvas
      ctx.drawImage(bgImage, 0, 0, width, height);
    } catch (error) {
      console.warn("Could not load background:", error.message);
      // Fallback to white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
    }
  } else {
    // Fallback to white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
  }

  // Draw rounded rectangle with white background (90% opacity)
  const padding = 40;
  const boxX = padding;
  const boxY = padding;
  const boxWidth = width - padding * 2;
  const boxHeight = height - padding * 2;
  const borderRadius = 12;

  // Create rounded rectangle path
  ctx.beginPath();
  ctx.moveTo(boxX + borderRadius, boxY);
  ctx.lineTo(boxX + boxWidth - borderRadius, boxY);
  ctx.quadraticCurveTo(
    boxX + boxWidth,
    boxY,
    boxX + boxWidth,
    boxY + borderRadius,
  );
  ctx.lineTo(boxX + boxWidth, boxY + boxHeight - borderRadius);
  ctx.quadraticCurveTo(
    boxX + boxWidth,
    boxY + boxHeight,
    boxX + boxWidth - borderRadius,
    boxY + boxHeight,
  );
  ctx.lineTo(boxX + borderRadius, boxY + boxHeight);
  ctx.quadraticCurveTo(
    boxX,
    boxY + boxHeight,
    boxX,
    boxY + boxHeight - borderRadius,
  );
  ctx.lineTo(boxX, boxY + borderRadius);
  ctx.quadraticCurveTo(boxX, boxY, boxX + borderRadius, boxY);
  ctx.closePath();

  // Fill with white at 90% opacity
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = "white";
  ctx.fill();

  // Draw border
  ctx.globalAlpha = 1.0;
  ctx.strokeStyle = "#d1d5db"; // gray-300
  ctx.lineWidth = 2;
  ctx.stroke();

  // Reset global alpha
  ctx.globalAlpha = 1.0;

  const contentPadding = 30; // Padding inside the box

  // Draw title in upper left (inside the box)
  ctx.fillStyle = "#000000";
  ctx.font = 'bold 60px "Noto Sans CJK JP", sans-serif';
  const titleX = boxX + contentPadding;
  const titleY = boxY + contentPadding + 50; // 50px from top for baseline
  ctx.fillText(title, titleX, titleY);

  // Load and draw logo in upper right (inside the box)
  const logoPath = path.join(__dirname, "..", "public", "logo_keyboard.svg");

  if (fs.existsSync(logoPath)) {
    try {
      // For SVG, we'll use sharp to convert it first
      const logoBuffer = await sharp(logoPath)
        .resize(150, null, { fit: "inside" })
        .png()
        .toBuffer();

      const logoImage = await loadImage(logoBuffer);
      // Position logo in the upper right
      const logoX = boxX + boxWidth - logoImage.width - contentPadding;
      const logoY = boxY + contentPadding;
      ctx.drawImage(logoImage, logoX, logoY, logoImage.width, logoImage.height);
    } catch (error) {
      console.warn("Could not load logo:", error.message);
    }
  }

  // Draw summary bullets
  const maxSummaryItems = 5;
  const summaryItems = summary.slice(0, maxSummaryItems);

  ctx.font = '32px "Noto Sans CJK JP", sans-serif';
  let yPosition = titleY + 60;
  const lineHeight = 50;
  const maxWidth = boxWidth - contentPadding * 2 - 50; // Account for bullet space

  summaryItems.forEach((item, index) => {
    const boxBottom = boxY + boxHeight - contentPadding;
    if (yPosition + lineHeight > boxBottom) return; // Don't overflow the box

    // Draw bullet
    const bulletX = titleX + 10;
    ctx.fillText("•", bulletX, yPosition);

    // Wrap text with kinsoku rules
    const bulletText = item.toString();
    const lines = wrapTextWithKinsoku(ctx, bulletText, maxWidth);
    const textX = bulletX + 40;

    // Draw each line
    for (let i = 0; i < lines.length; i++) {
      if (yPosition + lineHeight > boxBottom) break;

      ctx.fillText(lines[i], textX, yPosition);
      yPosition += lineHeight;
    }

    // Add extra spacing after the item
    yPosition += 10;
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
