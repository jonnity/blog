---
createdAt: 2024/01/13
title: モーダル表示時の「戻る」動作について
description: このブログの画像の拡大表示に使用しているモーダルにおいて、「戻る」 (特にAndroidの「戻る」ボタン/ジェスチャー) でモーダルを閉じられるようにしたので、その方法についてまとめます。
tags: 
  - 個人開発
  - ブログ
---

皆さんは『モーダルを消そうと思って「戻る」をしたら意図せず前の画面に戻ってしまった』ことはありますか？私はあります。
このブログでも上記のことが起こるようになっており、直したので、それについてまとめます。

PCだと、Escapeキーで消そうとして消えないこともあります。Escapeは何も起きないだけなのでましですが、消えてほしい。

![モーダルの例示](todo)
モーダルってのはこういうの

## 問題点

冒頭で説明したシチュエーションを体験したことのない人のために問題点を説明します。
そういう人はどうせiPhoneを使ってるんだろうと思います。

というのも、Android端末をよく使う人にはわかってもらえていると思うのですが、Androidの「戻る」ボタン/ジェスチャーで、モーダルを消せる気がするんですよね。
ただ、単にページ内の状態管理だけで実装しているモーダルだと、当然前の画面に戻ってしまいます。
なので、

![モーダル表示までの画面遷移](todo)
こうなってから

![そこからの戻る動作](todo)
「戻る」とこうなっちゃう

![更新した戻る動作](todo)
こうなって欲しいのにね (このブログは、今はこうなってる)

という感じです。

余談ですが、そう思うと、「戻る」に対してはiPhoneの「画面の左端からスワイプする」って動作のほうが直感的なのかもしれないですね。

## このブログにおける対応

このブログの画像は、クリックすると画面いっぱいにその画像をモーダルで表示するようにしているのですが、「戻る」で消せませんでした。
この記事の公開と同時に「戻る」で消えるようにしたので、その対応についてまとめます (該当の変更は、[このPR](https://github.com/jonnity/blog/pull/63)でしてます)。

* 調べるとフラグメントでやるといいみたいな記事は出てきた
* でも各節タイトルのスクロール位置への移動のためにフラグメントは使っているから、クエリパラメータでやった
  * 多分一緒
* それだけだと不都合があったから、クエリパラメータと画像を表示するコンポーネント内の状態管理を併用して実装した
* その結果、↓が実現できて、これが一番直感的な気がする
  * モーダルは「戻る」で消せる
  * その後「進む」で再表示はできない

具体的な実装は↓な感じ

モーダル部分をこんな感じで実装して、

```tsx
({ src, alt }) => {
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
```

それの表示非表示を

```tsx
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

で管理してる

## まとめ

PC/iOSでは、「戻る」でモーダルを消そうとすることはないかもしれませんが、ぜひAndroidユーザーのために、モーダルは「戻る」で消せるようにしてください。
