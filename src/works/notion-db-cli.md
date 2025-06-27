---
title: notion-db-cli
categories:
  - CLI
  - Notion
  - Tools
  - Rust
description: Notion DBを操作するCLIツール。DBスキーマに基づいたCSVテンプレートの作成、CSVで書いたデータの一括追加などが可能
createdAt: 2025/06/27
# updatedAt
externalLink:
  url: https://github.com/jonnity/notion-db-cli/releases
  message: Download
---

## 概要

Rust製のNotion DB用CLIツールです。主に、大量のデータを追加したいときに便利に使えるよう、以下のコマンドが実装されています。

* `db-list`: アクセスできるNotion DBの一覧表示
* `db-view`: 指定したNotion DBのスキーマの確認 / それに基づいたCSVテンプレートの生成 (`-f`/`--file` オプション)
* `db-add`: 指定したNotion DBに対するCSVに記載されたレコードの一括追加
* `db-query`: 指定したNotion DB内のアイテム一覧表示

## 使い方

1. [release](https://github.com/jonnity/notion-db-cli/releases)から使用する環境に合わせてバイナリを取得する。
2. ["Integrations" page of Notion](https://www.notion.so/profile/integrations)のページから、対象とするワークスペースに、Internal Integrationを作成し、トークンを取得する。
3. CLIから操作したいDBのページを開き、"Connections"メニューから、作成したIntegrationに接続を許可する。
4. 環境変数`NOTION_CLI_RS_TOKEN`を取得したトークンの値に設定する (もしくはバイナリ実行時に`--token`で同じくトークンの値を指定する)。
5. 取得したバイナリを、上記のコマンドで実行する (`help`表示も参照してください)

## リリースノート

最新のリリースノートは[notion-db-cli/blob/main/release.md](https://github.com/jonnity/notion-db-cli/blob/main/release.md)にもあります。

### 0.0.1 (2025/06/27)

notion-db-cliの最初のリリース。
