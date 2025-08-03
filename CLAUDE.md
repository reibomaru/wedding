# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a wedding invitation website built as a React single-page application. The project creates an elegant, animated wedding invitation for Rei & Yoko's wedding (October 4, 2025) with features including image slideshows, countdown timer, event details, and RSVP functionality.

## Tech Stack

- **React 19.1.0** with TypeScript 5.8.3 (strict mode)
- **Vite 7.0.4** - Build tool and dev server
- **Tailwind CSS 4.1.11** (Vite plugin version) with custom rose color palette and Japanese fonts (Noto Serif/Sans JP)
- **React Router DOM 7.7.1** for routing
- **date-fns 4.1.0** for date operations
- **lucide-react 0.526.0** for icons
- **Firebase Tools** for deployment

## Common Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Component Structure
The app follows a component-based architecture with a main `WeddingInvitation` component that orchestrates all sections:

- `App.tsx` - Router setup with intro animation state
- `WeddingInvitation.tsx` - Main page layout orchestrating all sections
- `IntroAnimation.tsx` - Entry animation component
- `Navigation.tsx` - Fixed navigation bar
- `ImageSlideshow.tsx` - Hero section with wedding photos
- `MessageSection.tsx` - Welcome message
- `ProfileSection.tsx` - Couple profiles
- `Countdown.tsx` - Wedding countdown timer
- `EventsSection.tsx` - Event details with calendar integration
- `RSVPSection.tsx` - RSVP form

### Key Design Patterns
- Single-page application with React Router for navigation
- Component composition with TypeScript interfaces
- Tailwind CSS utility classes with custom theme
- Date operations handled through date-fns library
- Responsive design with mobile-first approach

### Styling
- Uses Tailwind CSS v4 with Vite plugin integration
- Custom rose color palette defined in `tailwind.config.js`
- Japanese typography with Noto Serif JP and Noto Sans JP fonts
- Responsive design with `section-container` utility class

### State Management
- Local component state using React hooks
- No global state management library (Redux, Zustand, etc.)
- Props drilling for simple data flow

## Important Files
- `src/App.tsx` - Main application with router and intro animation logic
- `src/components/WeddingInvitation.tsx` - Primary page component
- `tailwind.config.js` - Custom Tailwind theme with Japanese fonts and rose palette
- `vite.config.ts` - Vite configuration with React and Tailwind plugins
- `.cursor/rules/tech-stack.mdc` - Detailed tech stack documentation

## Key Dates and Data
- Wedding date: October 4, 2025, 11:30 AM (hardcoded in `WeddingInvitation.tsx:12`)
- Images stored in `src/assets/` (M002.jpg, M031.jpg, M041.jpg, M061.jpg, M075.jpg, M077.jpg)

## Component Documentation

### Core Components

#### `WeddingInvitation.tsx`
- **責務**: メインページレイアウトとセクションオーケストレーション
- **利用方法**: ルートコンポーネントとして使用、全セクションを統合
- **特徴**: 結婚式日時をハードコード (2025-10-04T11:30:00)、Countdownコンポーネントに渡す

#### `IntroAnimation.tsx` 
- **責務**: アプリ起動時のウェルカムアニメーション
- **利用方法**: `onComplete` propsでアニメーション完了を通知
- **特徴**: タイプライター効果で「WEDDING INVITATION」を1文字ずつ表示、完了後2秒でフェードアウト

#### `Navigation.tsx`
- **責務**: 固定ナビゲーションバーとスムーススクロール
- **利用方法**: ページ上部に固定表示、セクション間ナビゲーション
- **特徴**: 
  - スクロール位置に応じたアクティブセクション検出
  - モバイル対応ハンバーガーメニュー
  - 背景ブラー効果 (`backdrop-blur-sm`)

#### `ImageSlideshow.tsx`
- **責務**: ヒーローセクションの画像スライドショー
- **利用方法**: ファーストビューとして配置
- **特徴**: 
  - レスポンシブ画像フィルタリング（PC/SP別表示）
  - 5秒間隔自動スライド、手動ナビゲーション対応
  - 画像ごとのテキストカラー設定
  - 6枚の結婚式写真 (M002.jpg, M031.jpg, M061.jpg, M075.jpg, M077.jpg, M041.jpg)

### コンテンツセクション

#### `MessageSection.tsx`
- **責務**: 結婚式招待メッセージ表示
- **利用方法**: プロフィール前の挨拶セクション
- **特徴**: 日本語の正式な結婚式招待文、改行とスペーシング調整済み

#### `ProfileSection.tsx`
- **責務**: 新郎新婦プロフィール表示
- **利用方法**: 静的情報表示
- **特徴**: 
  - 2カラムレイアウト（新郎・新婦）
  - 生年月日、出身地、職業、自己紹介を含む
  - 杉浦伶 & 田中陽子の詳細情報

#### `Countdown.tsx`
- **責務**: 結婚式までのカウントダウン表示
- **利用方法**: `targetDate: Date` propsで結婚式日時を指定
- **特徴**: 
  - リアルタイム更新（1秒間隔）
  - 日・時・分・秒の4カラム表示
  - レスポンシブグリッドレイアウト

#### `EventsSection.tsx`
- **責務**: 結婚式イベント詳細と会場情報
- **利用方法**: イベント情報セクションとして配置
- **特徴**: 
  - 挙式・披露宴の時間情報
  - 綱町三井倶楽部の会場詳細
  - Googleカレンダー連携機能
  - 外部リンク（会場公式サイト）

#### `RSVPSection.tsx`
- **責務**: 出欠確認フォーム
- **利用方法**: ユーザー情報入力とフォーム送信
- **特徴**: 
  - 出席・欠席ラジオボタン選択
  - 個人情報フォーム（住所、連絡先等）
  - 同伴者登録機能（最大5名）
  - アレルギー情報入力
  - 利用規約同意チェックボックス
  - Firebase送信予定（現在はconsole.log）

### 状態管理パターン
- **ローカル状態**: 各コンポーネントでuseStateを使用
- **イベント通信**: props経由のコールバック関数
- **副作用**: useEffectでタイマー、リサイズ、スクロールイベント管理
- **フォーム**: controlled components パターン

### CSS/スタイリング
- **Tailwind クラス**: ユーティリティファーストアプローチ
- **カスタムクラス**: `section-container`, `heading-main`, `text-elegant`, `btn-primary`, `input-field`
- **レスポンシブ**: md: ブレークポイント (768px) でデスクトップ対応
- **カラー**: rose色パレットをメインに使用

### TypeScript コーディング規約
- **Type vs Interface**: `interface` ではなく `type` を使用する
  - 例: `type Props = { ... }` (推奨)
  - 避ける: `interface Props { ... }`
- **型定義**: `src/types/` ディレクトリに集約
- **型インポート**: `import type { ... }` を使用してtype-only importを明示

## Development Notes
- Uses ESLint with Flat Config format
- TypeScript in strict mode with project references
- React 19 features and patterns
- Firebase Tools included for deployment
- No test framework currently configured