---
createdAt: 2025/04/28
title: GitHub Actionsにおける未許可`Reusable workflow`使用時のエラー
description: GitHub Actionsで未許可の`Reusable workflow`を使おうとすると`Missing download info`という不親切なエラーで終了する。
tags: 
  - GitHub Actions
  - Reusable workflow
  - トラブルシュート
---

## 起きたこと

このブログは、`main`ブランチにプッシュされた内容がそのままデプロイされるよう、[`.github/workflows/deploy-main.yml`](https://github.com/jonnity/blog/blob/main/.github/workflows/deploy-main.yml)でワークフローを定義している。
先日、[Rust演習の記録](/blog/rust-exercises)を公開しようとしたとき、突如エラーが発生した: [エラー時のログ](https://github.com/jonnity/blog/actions/runs/14619974120/job/41018945708)。

ざっと内容を見てみると、自分で定義したワークフローに入る前の、種々必要なデータを集めているところでエラーが起きているようだった。具体的には以下のようなメッセージで終了していた。

```
Download action repository 'rtCamp/action-slack-notify@v2' (SHA:e31e87e03dd19038e411e38ae27cbad084a90661)
Getting action download info
Error: Missing download info for LoveToKnow/slackify-markdown-action@698a1d4d0ff1794152a93c03ee8ca5e03a310d4e
```

## 原因

前提として、以下の状態にあった。

* デプロイの成否を[`rtCamp/action-slack-notify`](https://github.com/rtCamp/action-slack-notify)でSlackに通知するようにしていた
* `rtCamp/action-slack-notify`では、[`LoveToKnow/slackify-markdown-action`](https://github.com/LoveToKnow/slackify-markdown-action)が使われていた
* (公式が提供しているもの以外は) 許可した`reusable workflows`しか実行できないようにしており、上記２つのWorkflowを許可していた (それぞれメジャーバージョンでのみ指定)
  * `lovetoknow/slackify-markdown-action@v1`
  * `rtCamp/action-slack-notify@v2`


![このブログページのリポジトリの、GitHub Actionsに関する設定のページ。`Actions permissions`は`Allow jonnity, and select non-jonnity, actions and reusable workflows`が選択されており、`Allow specified actions and reusable workflows`としては、`lovetoknow/slackify-markdown-action@v1`および`rtCamp/action-slack-notify@v2`の２つが記載されている](github-actions-unalllowed-error.webp)
許可リストは、メジャーバージョンのみで指定している

そこから、[`rtCamp/action-slack-notify`の最新バージョン (v2.3.3, 2025/4/9リリース) での変更](https://github.com/rtCamp/action-slack-notify/compare/v2.3.1...v2.3.3)で、`LoveToKnow/slackify-markdown-action`の使用バージョンがバージョン指定ではなく、ハッシュで行われるように変更された (↓みたいに)。

```diff
- uses: LoveToKnow/slackify-markdown-action@v1
+ uses: LoveToKnow/slackify-markdown-action@698a1d4d0ff1794152a93c03ee8ca5e03a310d4e #v1.1.1

```

その結果、`LoveToKnow/slackify-markdown-action@698a1d4d0ff1794152a93c03ee8ca5e03a310d4e`は許可されていないとして、ワークフローが失敗するようになった。

## 解決策

`LoveToKnow/slackify-markdown-action@698a1d4d0ff1794152a93c03ee8ca5e03a310d4e`を上述の許可リストに追加した。

![このブログページのリポジトリの、GitHub Actionsに関する設定のページ。前の画像から、許可リストに`LoveToKnow/slackify-markdown-action@698a1d4d0ff1794152a93c03ee8ca5e03a310d4e`が追加されている](github-actions-unalllowed-error-after-allowing.webp)
許可リストに追加

`rtCamp/action-slack-notify`を`2.3.2`で指定したり、`LoveToKnow/slackify-markdown-action@*`とかの書き方で雑に許可しても動くとは思う。
でもまあ、`rtCamp/action-slack-notify`はとりあえず最新のバージョン使っといてと思うし、`LoveToKnow/slackify-markdown-action`で何かが変わって、それが`rtCamp/action-slack-notify`で採用されたのならそれを知りたいとも思うので、とりあえず個別に許可する方針で対応した。

## まとめ

GitHub Actionsで、許可されていないReusable workflowを使おうとすると、`Missing download info`とかいう、んなアホな的なエラーメッセージが出る。

エラーメッセージはちゃんと原因がわかるように表示しよう。
