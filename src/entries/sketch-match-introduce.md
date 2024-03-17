---
createdAt: 2024/01/01
title: "Sketch Matchの紹介: 作成中のゲームの現状"
description: 作成中の「お絵かき + 神経衰弱のオンラインパーティーゲーム」Sketch Matchを紹介します。
tags: 
  - 個人開発
  - ゲーム
  - SketchMatch
# thumbnail:
#   url: thumbnail.webp
#   alt: 左側にモーダルが開かれている画面、右側にそのモーダルが閉じた画面のスクリーンショットが配置されていて、左側の画面にはAndroidの「戻る」ジェスチャーの実行中であることを示す「＜」マークがある。「＜」マークは丸で囲んで強調されており、そこから右の画面への矢印があり、モーダルを閉じる動作が表されている。
---

このサイトを作った主目的の一つ、個人開発で作っているものの進捗報告をします。
ブログでブログの話しかしていない状態だったので、ようやく意義が生じますね。

今回のテーマは、お絵描き + 神経衰弱のパーティーゲーム、`Sketch Match`についてです。
一応、一通り遊べるようにはなってるので、動画を撮ってみました (一人でやってます)。現状はこんな感じ！

```youtube
VwWhr-KX-4E
```

## コンセプト

[Gartic Phone](https://garticphone.com/)とか[ピクトセンス](https://pictsense.com)みたいな、みんなで絵を書くゲームはなんだかんだ盛り上がるので、その辺の枠に滑り込もう！
というのが最初の取っ掛かりだったと思います。

その上で、なんやかんやあって神経衰弱を組み合わせました。
(ほぼ同じコンセプトのゲームがWeb上に存在していたようなのですが、現状遊べない状態にあるようなので気にしないことにしています。)

基本的な流れは↓のようになっています。

1. 各プレイヤーは表示されたお題の絵を描く
    * このとき、各お題はそれぞれ、２人のユーザーに出されてる (同じお題で描かれた絵が２つある状態になる)
2. みんなが描いた絵で神経衰弱をする
3. 正しいペア (同じお題で描かれた絵) を選べたらそのプレイヤーは１点獲得
4. ペアのうちどちらが上手かを投票を決め、絵が選ばれたプレイヤーは１点獲得

神経衰弱なので、全部の絵が表になるまで繰り返します。
同じお題でも全然違う絵になったりして、神経衰弱パートで「絵は覚えてるのにわかんない」みたいになったら面白いだろ！！なあ！！！という気持ちです。

## 技術要素

### 技術スタック

フロントエンドの構成要素は、↓のような感じです。

* Next.js (Page Router)
  * SSG機能 (`next export`) を利用
  * Github ActionsでビルドしてFirebase Hostingにデプロイできるようにしてある
* Typescript
* CSS Modules

バックエンドは全部Firebaseに頼っていて、↓のサービスを利用しています。

* Firebase Realtime Database
* Cloud Functions for Firebase
* Cloud Storage for Firebase
* Firebase Hosting

DB部分は、RealtimeDBの他にCloud Firestoreも選択肢にありましたが、リアルタイムに各プレイヤーの接続状況 (プレゼンス) を把握したいがためにRealtimeDBを使っています。
Firestoreには[`OnDisconnect`](https://firebase.google.com/docs/reference/js/v8/firebase.database.OnDisconnect)に相当するものがないんですよね。
ただ、データ更新の監視はどちらでも可能、かつ、`OnDisconnect`が不発になるときがあるので、プレゼンスのみRealtimeDBで管理するというのもありなのかもしれないです (`OnDisconnect`の設定後に他の`Reference` (DBの要素) いじるとそのハンドラが消える？とかだった気がする。ともかくそんなに使いやすくはない)。
[ドキュメント](https://firebase.google.com/docs/database/rtdb-vs-firestore?hl=ja)にある通りFirestoreのほうが新しくて、クエリや、そもそものDBとしてのパフォーマンスはいいらしいので。

### 基本的な仕組み

基本的には、各プレイヤーでRealtimeDBを監視しておいて、「誰かの操作によってDB更新→それをトリガーに画面更新」を繰り返すことでゲームを実現しています。

ただ、特定の誰かの操作をトリガーにできない処理、例えば「全員が絵を書き終えたときに神経衰弱の盤面を作る処理」とかがあるので、そういうところでCloud Functionが必要になります。
その場合でも、Cloud Functionからクライアントが変更を監視しているRealtimeDBを操作することでバックエンド→フロントエンドで情報伝達をしており、
フロント側でDBを監視する部分がキモになっています。

![Sketch Matchの構成図。下方にユーザーが利用する端末があり、その上にFirebaseで利用しているサービスが列挙されており、Firebase HostingではWebページの配信/取得、Firebase Realtime Databaseではデータベースの更新/変更監視、Cloud Storage for Firebaseでは画像のアップロード/取得を行う旨が説明されている。またFirebase Realtime DatabeseはCloud Function for Firebaseにも矢印が引かれており、データベースの変更検知でCloud Functionが実行され、そこでデータベースの更新が行われる様子も説明されている。](structure.png)
Sketch Matchの構成図

「firebase SDK→`zod`でバリデーション→`jotai`で状態管理」というのを基本にしています。
例えば、一緒に遊ぶプレイヤーたちは、ゲームの進行状況 (今が「絵を描いている」ところなのか、「神経衰弱をしている」ところなのか) を共有する必要がありますが、その情報は以下のようなカスタムフックでDBの情報を取得しています。

```typescript
import { useCallback, useEffect, useState } from "react";
import { onValue, ref, update } from "firebase/database";

import { dbPaths, RoomState, RoomStateSchema } from "@domain/RoomInfo";
import { useDatabase } from "@hooks/atoms/useDatabase";
import { useJoinedRoomId } from "@hooks/atoms/useRoomId";

export function useRoomState() {
  const db = useDatabase();
  const roomId = useJoinedRoomId();
  const [state, setState] = useState<RoomState>("loading");
  useEffect(() => {
    const stateRef = ref(db, `${roomId}/${dbPaths.state}`);
    const unsubscribe = onValue(stateRef, (data) => {
      try {
        const fetchedState = RoomStateSchema.parse(data.val());
        setState(fetchedState);
      } catch (e) {
        console.error(e);
        setState("error");
      }
      return () => {
        unsubscribe();
      };
    });
  }, [roomId]);
  return state;
}

export function useUpdateRoomState() {
  const db = useDatabase();
  const roomId = useJoinedRoomId();
  return useCallback(
    async (state: RoomState) => {
      const roomRef = ref(db, roomId);
      update(roomRef, { state });
    },
    [roomId]
  );
}
```

他に管理している情報としては、一緒に遊ぶプレイヤー (ルーム内のプレイヤー) の情報 (名前などもですが、神経衰弱をする中で今誰のターンか、なども) はもちろん、
ルーム内のカードの情報や、(神経衰弱でペアが揃ったあとの) 投票状況など色々あります。

ここが色々ありすぎてわけ分からなくなりつつあることも、モチベ低下に繋がっているので、うまい実装ができるといいんですが、よくわからない…。

## 現状と今後について (まとめ)

「一応遊べるようになっているものの、悪意に無防備すぎるのでもう少しちゃんとしなければと思ったままやる気が消えている」というのが現状です。
セキュリティ的にはFirebaseに乗っかってるので概ね大丈夫なのですが、悪意が私の財布に向いた瞬間にピンチになるなと思っています。
公開すればある程度しょうがないのですが、今はルームに無制限にプレイヤーが参加できてしまったりするので…。

あとはルール説明など、細かい部分がいくつか作れてません (いったん雑なテキストを置いてたりする)。
この辺のやる気ってどうしたら出るんですか？クスリ？？
広告が出せて、人気が出たらお金がもらえるかもと思えればまた違うんですかね。

お金で言うと、なんか毎月Googleに1円を払っています (Hosting/Functionでちょっとストレージが必要なので、そのお金なはず)。

計画と1円にムカついてきたので、取り急ぎ公開できるようなものにできるよう、早急に作業を進めようと思います。
公開できたときには、ぜひ友達と遊んでみて、感想を教えてください。友達がいなければ私にお声がけください。
