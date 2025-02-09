---
createdAt: 2024/12/31
title: "月記 (2024年12月)"
description: 2024年12月の活動の振り返り
tags: 
  - 月記
---

## 開発関連

Synfig Studioでアニメーションを作ろうとした。
作りかけのアニメーションを見返したらわけわからんくなったから、レイヤーとかをちゃんと整理した。
なのに、なんかLottie出力がうまくいかなくなってる。

インポートしたSVGもプレビュー時点ではちゃんと見えてるのに、Lottieに出力すると一部が表示されなくなってしまっている。
issueも立ててみたけど、特に動きはない ([#3468](https://github.com/synfig/synfig/issues/3468))。
…ので、ちょっとlottieのフォーマットとかを見てみている。
ざっと[ドキュメント](https://lottiefiles.github.io/lottie-docs/)を見て、ある程度フォーマットとかを理解したから、何が起きているのか見てみようかなというところ。
ただ、SynfigStudioは編集する部分としてはSVGで持ってて、LottieExporter (Synfigのプラグイン) はそいつらを単に変換してるだけ？っぽいから、俺のSVG側に問題がある気がしている。

---

このブログサイトの名前のロゴのところを直した。
書き出したSVGで`<text>`で持ってて、フォントフォールバック起きていた。
その結果文字幅が変わって、名前が切れてしまってた。

あと、適当にNextjsのバージョンを14→15に上げたら、ビルドが通らなくなって[Upgrading from 14 to 15](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)してた。
後方互換性を持たせてほしい。
Nextのこと、徐々に徐々に嫌いになっていっている。vite + svelteとかに移行してみようかな。

---

## あり飼育状況

なんかみんな、ちょっとのろくはなりつつも活動を続けている。
引っ越してから初の冬なんだけど、前の家より底冷え感がないから、そのせいで冬眠しないのかしら。

当初からブログで飼いありを紹介しようとして、何もできていないので、来年はちゃんとしようと思う。

---

## 総括など

* 生活に変化があった
  * 結婚/引っ越しをして、ちょっと時間は取りにくくなった気はする
  * もう諸々整ったから、なんとかなっていくといいな
* アニメーション作ろうとしていて、その作業着手が億劫なのもあってズルズル伸び続けている
  * Sketch Matchが作りかけというのが足かせになってる感もあるので、もっと適当にフットワーク軽くものを作ったほうがいいのかも
* 去年末でこのページ公開して、1年断続的に更新できたのはよかった
  * そのアウトプットで↑の進捗が上がるのがベスト
  * あとは、月記ばっかだから、色々思いついたことかけるといいなとは思ってる
  * とりあえず、なんか出してハードルを下げようかな
* あとは、もっと他者と交流があるといいのかもしれない

---

## 12月の肉じゃが

```twitter
1867527286196723973
```

↑ピーナッツ坦々肉じゃが