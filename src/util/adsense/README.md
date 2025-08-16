# GoogleAdSense Component

レスポンシブ対応のGoogleAdSenseディスプレイ広告コンポーネントです。

## 特徴

- TypeScript完全対応
- レスポンシブデザイン対応
- 呼び出し元からサイズ指定可能
- プリセットサイズの提供
- SSR/CSR対応（Next.js）

## インストールと設定

### 1. AdSenseスクリプトの追加

`src/app/layout.tsx`または`pages/_document.tsx`にAdSenseスクリプトを追加してください：

```tsx
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
  crossOrigin="anonymous"
/>
```

### 2. 環境変数の設定

`.env.local`ファイルに以下を追加：

```env
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT=xxxxxxxxxx
```

## 使用方法

### 基本的な使用方法

```tsx
import { GoogleAdSense } from '@/util/adsense';

function MyComponent() {
  return (
    <GoogleAdSense
      adClient="ca-pub-xxxxxxxxxxxxxxxx"
      adSlot="xxxxxxxxxx"
      width={728}
      height={90}
      adFormat="auto"
    />
  );
}
```

### レスポンシブ広告

```tsx
import { ResponsiveAdSense } from '@/util/adsense';

function MyComponent() {
  return (
    <div className="flex justify-center my-4">
      <ResponsiveAdSense
        size="responsive"
        adClient="ca-pub-xxxxxxxxxxxxxxxx"
        adSlot="xxxxxxxxxx"
      />
    </div>
  );
}
```

### プリセットサイズの使用

```tsx
import { ResponsiveAdSense } from '@/util/adsense';

function MyComponent() {
  return (
    <>
      {/* 中レクタングル広告 */}
      <div className="flex justify-center my-6">
        <ResponsiveAdSense
          size="medium-rectangle"
          adClient="ca-pub-xxxxxxxxxxxxxxxx"
          adSlot="xxxxxxxxxx"
        />
      </div>
      
      {/* モバイルバナー */}
      <div className="flex justify-center my-2 sm:my-4">
        <ResponsiveAdSense
          size="mobile-banner"
          adClient="ca-pub-xxxxxxxxxxxxxxxx"
          adSlot="xxxxxxxxxx"
        />
      </div>
    </>
  );
}
```

## 開発・テスト環境での使用

### 開発環境での自動設定

開発環境（`NODE_ENV === "development"`）では以下が自動的に適用されます：

- **ダミーID自動使用**: `ca-pub-0000000000000000` と `0000000000` を自動使用
- **テストモード有効**: `data-adtest="on"` が自動追加
- **安全な開発**: 実際のAdSenseアカウントに影響なし

手動でテストモードを有効にする場合：

```tsx
import { GoogleAdSense } from "@/util/adsense";

function MyComponent() {
  return (
    <GoogleAdSense
      adClient="ca-pub-xxxxxxxxxxxxxxxx" // 開発環境では自動的にダミーIDに置換
      adSlot="xxxxxxxxxx" // 開発環境では自動的にダミーIDに置換
      width={728}
      height={90}
      testMode={true} // 本番環境でも手動でテストモード有効化
    />
  );
}
```

**注意**: 開発環境では `adClient` と `adSlot` に何を指定しても、安全なダミーIDに自動置換されます。

### テスト用コンポーネントの使用

安全にテストできる専用コンポーネントも提供しています：

```tsx
import { TestAdSense, TestResponsiveAdSense, AdSensePreview } from "@/util/adsense";

function TestPage() {
  return (
    <>
      {/* テスト用AdSense（自動的にテストモード有効） */}
      <TestAdSense width={728} height={90} />
      
      {/* テスト用レスポンシブAdSense */}
      <TestResponsiveAdSense size="responsive" />
      
      {/* 広告エリアのプレビュー（実際の広告は表示されない） */}
      <AdSensePreview 
        size="medium-rectangle" 
        label="中レクタングル広告エリア"
      />
    </>
  );
}
```

## APIリファレンス

### GoogleAdSenseProps

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|------------|----|----|-----------|------|
| adClient | string | ✓ | - | AdSenseクライアントID |
| adSlot | string | ✓ | - | 広告スロットID |
| width | number \| string | | 'auto' | 広告の幅 |
| height | number \| string | | 'auto' | 広告の高さ |
| adFormat | 'auto' \| 'rectangle' \| 'vertical' \| 'horizontal' | | 'auto' | 広告フォーマット |
| fullWidthResponsive | boolean | | true | 全幅レスポンシブ対応 |
| className | string | | '' | CSSクラス名 |
| style | React.CSSProperties | | {} | インラインスタイル |
| testMode | boolean | | false | テストモード（開発環境では自動で有効） |

### ResponsiveAdSenseProps

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|------------|----|----|-----------|------|
| size | AdSize | ✓ | - | プリセットサイズ |
| customWidth | number \| string | | - | カスタム幅（プリセットを上書き） |
| customHeight | number \| string | | - | カスタム高さ（プリセットを上書き） |

### AdSize（プリセットサイズ）

- `banner` / `leaderboard`: 728x90
- `medium-rectangle`: 300x250
- `large-rectangle`: 336x280
- `skyscraper` / `wide-skyscraper`: 160x600
- `mobile-banner`: 320x50
- `large-mobile-banner`: 320x100
- `square`: 250x250
- `small-square`: 200x200
- `responsive`: 自動レスポンシブ

## スタイリング

このコンポーネントはTailwindCSSを使用してレスポンシブデザインを実現しています。`responsive`サイズを使用する場合、以下のTailwindクラスが自動的に適用されます：

- `w-full max-w-full h-auto` - 基本的な幅・高さ設定
- `min-h-[50px]` - モバイル（デフォルト）
- `sm:min-h-[90px]` - タブレット以上
- `md:min-h-[250px]` - デスクトップ以上

## テスト用コンポーネント

### TestAdSense / TestResponsiveAdSense

テスト用のコンポーネントでは、以下の安全な設定が自動的に適用されます：

- `data-adtest="on"` - テストモード有効
- ダミーのクライアントID・スロットID使用
- 開発環境での安全なテスト実行

### AdSensePreview

実際の広告を表示せず、広告領域の見た目を確認するためのプレースホルダーコンポーネントです。

## 注意事項

- AdSenseのポリシーに従って適切に使用してください
- **開発環境では自動的にダミーIDとテストモード（`data-adtest="on"`）が有効になります**
- **本番環境（`NODE_ENV=production`）では実際のAdSenseクライアントIDとスロットIDが使用されます**
- テストモード以外で大量のクリックを行うとアカウント停止のリスクがあります
- 広告の表示には時間がかかる場合があります
- 広告ブロッカーが有効な場合は表示されません
- 環境変数で開発/本番の切り替えが自動的に行われるため、コード変更不要で安全にデプロイできます