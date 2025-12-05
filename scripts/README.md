# 記事作成スクリプト

このスクリプトは、ブログ記事用のMarkdownファイルを作成するためのツールです。

## 使用方法

### 通常記事の作成

```bash
npm run create-entry "記事のタイトル"
```

または

```bash
node scripts/create-entry.js "記事のタイトル"
```

指定したタイトルで `src/entries/{タイトル}.md` ファイルが作成されます。

### 月記の作成

```bash
npm run create-monthly
```

または

```bash
node scripts/create-entry.js monthly
```

実行すると年月の入力を求められます。デフォルトは現在の年月です。
`src/entries/monthly-yyyy-mm.md` ファイルが作成されます。

## テンプレート

### 通常記事

```markdown
---
createdAt: yyyy/mm/dd
title: "記事のタイトル"
description: TODO
tags:
  - TODO
---

##
```

### 月記

```markdown
---
createdAt: yyyy/mm/dd
title: "月記 (yyyy年m月)"
description: yyyy年m月の活動の振り返り
tags:
  - 月記
summary:
  -
---

## 生活の所感

## 開発状況

## あり飼育状況

## 肉じゃが
```
