#!/usr/bin/env node

const fs = require("fs");
const yaml = require("js-yaml");

/**
 * frontmatterのsummaryが記入済みかを検査する。
 *
 * 月記の雛形は`summary:`が空の状態で生成され、そのままでもビルドは通るため、
 * 公開前の記入漏れをここで止める。検査対象は引数で渡されたファイルのみ
 * (CIではPRで変更された月記) なので、過去のsummary未対応の記事は影響を受けない。
 *
 * Usage: node scripts/check-monthly-summary.js <file...>
 */

function parseFrontmatter(filepath) {
  const content = fs.readFileSync(filepath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);

  if (!match) {
    throw new Error(`No frontmatter found in ${filepath}`);
  }

  return yaml.load(match[1]);
}

/**
 * summaryが未記入である理由を返す。記入済みならnull。
 */
function findProblem(filepath) {
  let frontmatter;
  try {
    frontmatter = parseFrontmatter(filepath);
  } catch (error) {
    return error.message;
  }

  const summary = frontmatter?.summary;
  if (summary === undefined || summary === null) {
    return "summaryが空です";
  }
  if (!Array.isArray(summary)) {
    return `summaryが配列ではありません (${typeof summary})`;
  }

  const items = summary.filter(
    (item) => typeof item === "string" && item.trim() !== "",
  );
  if (items.length === 0) {
    return "summaryの項目が空です";
  }

  return null;
}

function main() {
  const files = process.argv.slice(2);
  if (files.length === 0) {
    console.log("検査対象の月記がないためスキップします");
    return;
  }

  const problems = files
    .map((file) => ({ file, problem: findProblem(file) }))
    .filter(({ problem }) => problem !== null);

  if (problems.length === 0) {
    files.forEach((file) => console.log(`OK  ${file}`));
    return;
  }

  problems.forEach(({ file, problem }) => {
    console.error(`NG  ${file}: ${problem}`);
  });
  console.error(
    "\nfrontmatterのsummaryを記入してください。" +
      "本文が固まっていれば /monthly-report-summary で生成できます。",
  );
  process.exitCode = 1;
}

main();
