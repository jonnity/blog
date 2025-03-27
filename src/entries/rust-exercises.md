---
createdAt: 2025/04/15
title: Rust演習の記録
description: The Rust Programming Languageに沿ってRustの演習を行い、その内容を記録する
tags: 
  - Rust
  - 備忘録
---

## アウトプット

<!-- TODO: Privateリポジトリになってるから、公開する -->
手元で作成したものは、[jonnity/rust-exercise](https://github.com/jonnity/rust-exercise)にコミットしている。


## へ～って思ったとこ

* `let guess: u32 = guess.trim().parse().expect("Please type a number!");`みたいな、変数名使い回す (shadowing) 書き方ありなんだ (「2. 数当てゲームのプログラミング」内のコード)
  * 型付けがしっかりしてるのと、再定義を許可することって両立するんだね
  * 可読性とかの話としては同列に感じる (=再定義を乱用したら、意味わからんコードは書ける) けど、メモリ管理の観点からしたら、全然別の話ってことなのかも
