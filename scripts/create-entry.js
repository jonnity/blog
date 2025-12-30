#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function formatDate(date) {
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
}

function formatMonthlyTitle(year, month) {
  return `月記 (${year}年${month}月)`;
}

function formatMonthlyDescription(year, month) {
  return `${year}年${month}月の活動の振り返り`;
}

function createMonthlyTemplate(year, month) {
  const today = new Date();
  const createdAt = formatDate(today);
  const title = formatMonthlyTitle(year, month);
  const description = formatMonthlyDescription(year, month);

  return `---
createdAt: ${createdAt}
title: "${title}"
description: ${description}
tags: 
  - 月記
summary:
  - 
---

## 大喜利

## 開発状況

## 生活の所感

## あり飼育状況

## 肉じゃが

`;
}

function createRegularTemplate(title) {
  const today = new Date();
  const createdAt = formatDate(today);

  return `---
createdAt: ${createdAt}
title: "${title}"
description: TODO
tags: 
  - TODO
---

## 
`;
}

function promptMonthly() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  rl.question(
    `年月を入力してください (デフォルト: ${currentYear}/${currentMonth.toString().padStart(2, "0")}): `,
    (input) => {
      let year = currentYear;
      let month = currentMonth;

      if (input.trim()) {
        const parts = input.trim().split("/");
        if (parts.length >= 1 && parts[0]) {
          year = parseInt(parts[0]);
        }
        if (parts.length >= 2 && parts[1]) {
          month = parseInt(parts[1]);
        }
      }

      if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        console.error("無効な年月です。");
        rl.close();
        return;
      }

      const filename = `monthly-${year}-${month.toString().padStart(2, "0")}.md`;
      const filepath = path.join(__dirname, "..", "src", "entries", filename);

      if (fs.existsSync(filepath)) {
        console.error(`ファイル ${filename} は既に存在します。`);
        rl.close();
        return;
      }

      const content = createMonthlyTemplate(year, month);
      fs.writeFileSync(filepath, content, "utf8");
      console.log(`${filename} を作成しました。`);
      rl.close();
    },
  );
}

function createMonthlyAutomatic() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const filename = `monthly-${year}-${month.toString().padStart(2, "0")}.md`;
  const filepath = path.join(__dirname, "..", "src", "entries", filename);

  if (fs.existsSync(filepath)) {
    console.error(`ファイル ${filename} は既に存在します。`);
    process.exit(1);
  }

  const content = createMonthlyTemplate(year, month);
  fs.writeFileSync(filepath, content, "utf8");
  console.log(`${filename} を作成しました。`);
}

function createRegularEntry(title) {
  if (!title) {
    console.error("タイトルを指定してください。");
    process.exit(1);
  }

  const filename = `${title}.md`;
  const filepath = path.join(__dirname, "..", "src", "entries", filename);

  if (fs.existsSync(filepath)) {
    console.error(`ファイル ${filename} は既に存在します。`);
    process.exit(1);
  }

  const content = createRegularTemplate(title);
  fs.writeFileSync(filepath, content, "utf8");
  console.log(`${filename} を作成しました。`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(
      "使用方法: node create-entry.js [monthly] [monthly-auto] [タイトル]",
    );
    console.error("  monthly: 月記用テンプレートを作成（対話形式）");
    console.error("  monthly-auto: 月記用テンプレートを作成（現在の月で自動）");
    console.error("  タイトル: 通常記事用テンプレートを作成");
    process.exit(1);
  }

  if (args[0] === "monthly") {
    promptMonthly();
  } else if (args[0] === "monthly-auto") {
    createMonthlyAutomatic();
  } else {
    const title = args.join(" ");
    createRegularEntry(title);
  }
}

main();
