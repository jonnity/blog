---
# createdAt: 2024/9/8
title: Synfig Studioのlottie出力時にPythonのエラーに遭った話
description: Pythonのファイル読込時のエンコード設定のデフォルト値のせいで、アニメーション作成ツールのSynfig Studioでlottie出力をすることを諦めることになるところでした
tags: 
  - 個人開発
  - トラブルシュート
---

## 要約

* [Synfig Studio](https://www.synfig.org/)には、[lottie](https://lottiefiles.com)形式で出力する機能がプラグインとして実装されている (@[このへん](https://github.com/synfig/synfig/tree/master/synfig-studio/plugins/lottie-exporter))
* このプラグインはPythonで実行されていて、xmlで書かれている`.sif` (をgzip圧縮した`.sifz`) ファイルを読み、lottieファイルを出力する
* Pythonがシステムのlocaleからデフォルトのエンコード設定を変えるような動きをするので、utf-8で書かれている`.sif`ファイルを、日本語環境でそのまま使おうとすると変なエラー出る
  * TODO: 詳細化
* だから`コントロール パネル\時計と地域`から「地域」→「システムロケールの変更」→「ベータ: ワールドワイド言語サポートでUnicode UTF-8を使用」にチェックしたら、動作するようになった

## Python、どうなってるんすか？

TODO:

* なんか直ったけどほんとにそこが原因？
  * そこの設定によって、他のファイルもそうやって読み込んでるか、確認
* なんか他の方法もある？
  * Pythonでファイル読むときに指定はできるっしょ

## ということでissueを立ててみた

って言えるといいね
