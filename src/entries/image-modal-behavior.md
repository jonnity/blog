---
createdAt: 2024/01/13
title: モーダル表示時の「戻る」動作について
description: このブログの画像の拡大表示に使用しているモーダルにおいて、「戻る」 (特にAndroidの「戻る」ボタン/ジェスチャー) でモーダルを閉じられるようにしたので、その方法についてまとめます。
tags: 
  - 個人開発
  - ブログ
thumbnail:
  url: thumbnail.webp
  alt: 左側にモーダルが開かれている画面、右側にそのモーダルが閉じた画面のスクリーンショットが配置されていて、左側の画面にはAndroidの「戻る」ジェスチャーの実行中であることを示す「＜」マークがある。「＜」マークは丸で囲んで強調されており、そこから右の画面への矢印があり、モーダルを閉じる動作が表されている。
---

皆さんは『モーダルを消そうと思って「戻る」をしたら意図せず前の画面に戻ってしまった』ことはありますか？私はあります。
このブログでも上記のことが起こるようになっており、直したので、それについてまとめます。

![ブログ内の画像をクリックすると、画像が画面いっぱいに表示される挙動のアニメーション](openModal.gif)
モーダルってのはこういうの

## 問題点

冒頭で説明したシチュエーションを体験したことのない人のために問題点を説明します。
そんなやつはどうせiPhoneでも使ってやがるんだろうと思います。

というのも、Android端末をよく使う人にはわかってもらえると思うのですが、Androidの「戻る」ボタン/ジェスチャーで、モーダルを消せる気がするんですよね。
そのとき、単にページ内の状態管理だけで実装しているモーダルだと、当然前の画面に戻ってしまいます。

なので、「戻る」と↓こうなっちゃっていました。

![問題に感じていた動作: モーダルを開いているときに「戻る」ジェスチャーを実行し、前の画面に戻ってしまうAndroidの操作アニメーション](backInModal.gif)
このアニメーション中でやってる「戻る」ジェスチャーが、モーダル消せますって顔してる

![更新後の動作: モーダルを開いているときに「戻る」ジェスチャーを実行するとモーダルが閉じるアニメーション](backCloseModal.gif)
こうなって欲しい (このブログは、今はこうなってる)

余談ですが、そう思うと、「戻る」に対してはiPhoneの「画面の左端からスワイプする」って動作のほうが直感的なのかもしれないですね。
あとPCだと、Escapeキーで消そうとして消えないこともあります。Escapeは何も起きないだけなのでましですが、消えてほしい。

## 対応方法

このブログでは、この記事の公開と同時に「戻る」で消えるようにしました (該当の変更は[このPR](https://github.com/jonnity/blog/pull/63))。

まず、主に想定しているのはAndroidの「戻る」ボタン/ジェスチャーですが、これはブラウザ側での「戻る」実行になってしまうので、Webサイトで直接イベントとして拾うことはできないようです。
なので、単にブラウザの「戻る」でモーダルが消えるようにする必要があります。
そのために、モーダルを開くときにブラウザの履歴に「クエリパラメータ付きの同ページ」を追加するようにしました (↓な感じ)。

```typescript:ImageViewer.tsxの抜粋
const openModal = useCallback(() => {
  setIsModalTarget(true);
  const params = new URLSearchParams(currentSearchParams.toString());
  params.set(showModalParamKey, showModalValue);
  router.push(pathname + "?" + params.toString(), { scroll: false });
}, [router, pathname, currentSearchParams]);
```

その上で、「戻る」を検知してモーダルを閉じるようにしています (↓な感じ)。

```typescript:ImageViewer.tsxの抜粋
useEffect(() => {
  if (!hasShowModalParam) {
    setIsModalTarget(false);
  }
}, [hasShowModalParam]);
```

ちなみに、`popState`イベントで`setIsModalTarget(false)`を実行しても同じことはできました。

```typescript
useEffect(() => {
    const popStateListener = () => {
      setIsModalTarget(false);
    };
    window.addEventListener("popstate", popStateListener);
    return () => {
      window.removeEventListener("popstate", popStateListener);
    };
  }, []);
```

なお、モーダルを開くときに追加しているクエリパラメータは、具体的には"sm=1"という意味のない値で、どの画像をモーダルとして開くかは各コンポーネント内に状態を持つことで管理しています。
それに起因して、このブログでは、『「戻る」で拡大画像を消した後、「進む」をしても再表示できない』ようになっています。
クエリパラメータを各画像のID情報を持たせたりすれば、そのような逆操作も可能にできるとは思いますが、できないほうが直感的かなと思いそうしています。
モーダルは半ばウィンドウのようなものなので、その再表示にはモーダルを開くときの操作 (今回なら画像をクリック) が改めて必要なほうが、他の物の挙動に似るのでいいのではないでしょうか。

最終的な`ImageViewer.tsx`の全体像は↓のようになりました。

```typescript:/src/util/entry/components/ImageViewer.tsx
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const hiddenScrollbarClassName = "hidden-scrollbar";
const showModalParamKey = "sm";
const showModalValue = "1";

const ImageModal: React.FC<{
  src: string;
  alt: string;
}> = ({ src, alt }) => {
  const router = useRouter();
  useEffect(() => {
    const escapeKeyListener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };
    document.addEventListener("keydown", escapeKeyListener);
    document.body.classList.add(hiddenScrollbarClassName);
    return () => {
      document.removeEventListener("keydown", escapeKeyListener);
      document.body.classList.remove(hiddenScrollbarClassName);
    };
  }, [router]);

  return (
    <div
      className="absolute left-0 top-0 flex h-dvh w-dvw justify-center bg-black bg-opacity-70 p-2 hover:cursor-zoom-out lg:p-8"
      style={{ top: window.scrollY }}
      onClick={() => router.back()}
    >
      <img src={src} alt={alt} className="object-scale-down" />
    </div>
  );
};

type Prop = { src: string; alt: string; caption: string };
export const ImageViewer: React.FC<Prop> = ({ src, alt, caption }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();
  const [isModalTarget, setIsModalTarget] = useState<boolean>(false);
  const hasShowModalParam =
    currentSearchParams.get(showModalParamKey) === showModalValue;

  useEffect(() => {
    if (!hasShowModalParam) {
      setIsModalTarget(false);
    }
  }, [hasShowModalParam]);

  const openModal = useCallback(() => {
    setIsModalTarget(true);
    const params = new URLSearchParams(currentSearchParams.toString());
    params.set(showModalParamKey, showModalValue);
    router.push(pathname + "?" + params.toString(), { scroll: false });
  }, [router, pathname, currentSearchParams]);

  return (
    <>
      <p className="flex h-fit flex-col items-center">
        <img
          className="max-h-96 max-w-full object-contain hover:cursor-zoom-in"
          src={src}
          alt={alt}
          onClick={openModal}
        />
        <span>{caption}</span>
      </p>
      {hasShowModalParam && isModalTarget && <ImageModal src={src} alt={alt} />}
    </>
  );
};
```

＃`{hasShowModalParam && isModalTarget && <ImageModal src={src} alt={alt} />}`の`hasShowModalParam &&`は不要ですね…。`hasShowModalParam`が`false`のときは必ず`isModalTarget`も`false`になるので…。

## まとめ

* Androidの「戻る」ボタン/ジェスチャーはモーダルを閉じれる気がしてしまう
  * そのときに何もしていないとそのまま前のページに戻ってしまう
* ↑を防ぐためには、モーダルを開くときに履歴に何かを追加する必要がある
* その上で「戻る」を検知してモーダルを閉じるといい感じ
  * そのとき「進む」で再表示されないほうが直感的な気がする

PC/iOSでは「戻る」でモーダルを消そうとすることはないかもしれませんが、ぜひAndroidユーザーのために、モーダルは「戻る」で消せるようにしてください。
