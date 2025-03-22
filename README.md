# jonnityのブログ/ポートフォリオ

![jonnity's logo](logo_keybourd.png)

## プロジェクト概要

jonnity ([Github](https://github.com/jonnity), [X](https://x.com/jonnied_man), [mixi2](https://mixi.social/invitations/@jonnity/HkhMHZVUyjy5Hk4McKij5Z), [Threads](https://www.threads.net/@jonnied_man)) のブログ/ポートフォリオサイトのプロジェクトです。

<https://jonnity.com>で公開しています。

## 技術スタック

* Next.js (SSG)
  * Typescript
  * tailwindcss
  * react-markdown
* Github Actions (自動デプロイ/プッシュ時のlint)
* Cloudflare Pages

### 主な機能

* Markdownベースのコンテンツ管理システム
  * `/src/entries`以下にあるmdファイルから`generateStaticParams`で動的にページ生成
* レスポンシブデザイン (Tailwind CSS)
* react-markdownを使った各種拡張


### 開発環境

#### dev実行手順

1. `npm ci`
2. `npm run dev`

#### buildスクリプト

1. `npm ci`
2. `npm run build`

## Contribute

誤字脱字等、内容についてのご指摘は、上記jonnityのアカウントか、本リポジトリのissueにお願いします。
