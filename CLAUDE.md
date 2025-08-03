# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a comprehensive wedding invitation website built as a React single-page application. The project creates an elegant, animated wedding invitation for Rei & Yoko's wedding (October 4, 2025) with features including image slideshows, countdown timer, event details, RSVP functionality with Firebase integration, and a complete admin management system for tracking responses.

## Tech Stack

- **React 19.1.0** with TypeScript 5.8.3 (strict mode)
- **Vite 7.0.4** - Build tool and dev server
- **Tailwind CSS 4.1.11** (Vite plugin version) with custom rose color palette and Japanese fonts (Noto Serif/Sans JP)
- **React Router DOM 7.7.1** for routing and admin route protection
- **Firebase 12.0.0** - Firestore database, Authentication for admin access
- **React Hook Form 7.62.0** - Advanced form management and validation
- **@vis.gl/react-google-maps** - Google Maps integration
- **date-fns 4.1.0** for date operations and formatting
- **lucide-react 0.526.0** for icons and UI elements
- **Firebase Tools** for deployment and hosting

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
- **利用方法**: `onComplete: () => void` propsでアニメーション完了を通知
- **特徴**: 
  - タイプライター効果で「WEDDING INVITATION」を1文字ずつ表示
  - レスポンシブテキスト改行（モバイル対応）
  - 完了後自動フェードアウト

#### `Navigation.tsx`
- **責務**: 固定ナビゲーションバーとスムーススクロール
- **利用方法**: ページ上部に固定表示、セクション間ナビゲーション
- **特徴**: 
  - スクロール位置に応じたアクティブセクション検出
  - モバイル対応ハンバーガーメニュー
  - 背景ブラー効果とオーバーレイ
  - スムーススクロールナビゲーション

#### `ImageSlideshow.tsx`
- **責務**: ヒーローセクションの画像スライドショー
- **利用方法**: ファーストビューとして配置
- **特徴**: 
  - デバイス別画像フィルタリング（PC/モバイル）
  - 5秒間隔自動スライド + 手動コントロール
  - ドットインジケーターと矢印ナビゲーション
  - 画像ごとの動的テキストカラー設定
  - フェードトランジション効果
  - エラーハンドリング付き画像読み込み

### コンテンツセクション

#### `MessageSection.tsx`
- **責務**: 結婚式招待メッセージ表示
- **利用方法**: 静的コンテンツセクション
- **特徴**: 日本語の正式な結婚式招待文、適切な改行とタイポグラフィ

#### `ProfileSection.tsx`
- **責務**: 新郎新婦プロフィール表示
- **利用方法**: `ProfilePhoto` コンポーネントと組み合わせた情報表示
- **特徴**: 
  - 2カラムレスポンシブレイアウト
  - インタラクティブプロフィール写真
  - 詳細個人情報（生年月日、出身地、職業、メッセージ）
  - 外部プロフィール画像（Unsplash）統合

#### `ProfilePhoto.tsx`
- **責務**: インタラクティブプロフィール写真コンポーネント
- **Props**: `mainPhoto: string, hoverPhoto: string, alt: string, name: string, className?: string`
- **特徴**: 
  - ホバー時の画像切り替え効果
  - スムーズなオパシティトランジション
  - インタラクション状態表示
  - カスタマイズ可能なスタイリング

#### `Countdown.tsx`
- **責務**: 結婚式までのリアルタイムカウントダウン表示
- **Props**: `targetDate: Date`
- **特徴**: 
  - 1秒間隔でのリアルタイム更新
  - 日・時・分・秒の4カラムグリッド表示
  - 過去日付の適切なハンドリング
  - インターバルクリーンアップ機能

#### `EventsSection.tsx`
- **責務**: 結婚式イベント詳細と会場情報表示
- **利用方法**: `GoogleMap` コンポーネントと連携したイベント情報
- **特徴**: 
  - 挙式・披露宴タイムライン
  - 綱町三井倶楽部の詳細会場情報
  - 包括的アクセス情報（電車・バス・車）
  - Googleカレンダー連携（プリフィル済みイベント）
  - GoogleMap統合と外部リンク

#### `GoogleMap.tsx`
- **責務**: Google Maps埋め込みと位置情報表示
- **Props**: `address: string, venueName: string, lat: number, lng: number, className?: string`
- **特徴**: 
  - @vis.gl/react-google-maps統合
  - API キー検証とエラーハンドリング
  - カスタムマーカーとマップコントロール
  - 包括的エラーメッセージとデバッグログ
  - フォールバックUI対応

#### `RSVPSection.tsx`
- **責務**: 包括的RSVP フォームとFirebase統合
- **利用方法**: react-hook-form による複雑フォーム管理
- **特徴**: 
  - 出席・欠席選択とバリデーション
  - 郵便番号住所自動補完（zipcloud API）
  - 動的同伴者管理（最大5名）
  - 電話番号フォーマットとバリデーション
  - プライバシーポリシー統合
  - Firebase データ送信とエラーハンドリング
  - メール重複チェック機能

#### `PrivacyPolicyModal.tsx`
- **責務**: プライバシーポリシー表示モーダル
- **Props**: `isOpen: boolean, onClose: () => void`
- **特徴**: 
  - フルスクリーンレスポンシブモーダル
  - 包括的プライバシーポリシー内容
  - スクロール対応とアクセシビリティ
  - オーバーレイクリック閉じ機能

### 管理者コンポーネント

#### `AdminLogin.tsx`
- **責務**: Firebase Authentication による管理者認証インターフェース
- **利用方法**: `/admin/login` ルートでの認証画面
- **特徴**: 
  - メール・パスワード認証フォーム
  - パスワード表示切り替え機能
  - Firebase エラーハンドリング（日本語メッセージ）
  - ローディング状態管理
  - ナビゲーション統合

#### `AdminDashboard.tsx`
- **責務**: RSVP データ管理のための包括的管理インターフェース
- **利用方法**: `/admin` ルートでの認証後アクセス
- **特徴**: 
  - リアルタイム統計ダッシュボード（回答数、出席者、同伴者等）
  - フィルタリング可能なRSVP データテーブル
  - CSV エクスポート機能（日本語対応）
  - データ更新とリフレッシュ機能
  - ログアウト機能
  - 同伴者関係表示

#### `ProtectedRoute.tsx`
- **責務**: 管理者エリアのルート保護
- **Props**: `children: React.ReactNode`
- **特徴**: 
  - 認証状態チェックと自動リダイレクト
  - ローディング状態ハンドリング
  - `useAuth` フック統合
  - 認証フロー管理

### 状態管理パターン
- **ローカル状態**: 各コンポーネントでuseStateを使用
- **認証状態**: useAuth カスタムフックでFirebase認証管理
- **フォーム状態**: React Hook Form による高度なフォーム管理
- **イベント通信**: props経由のコールバック関数
- **副作用**: useEffectでタイマー、リサイズ、スクロールイベント管理
- **データフェッチング**: Firebase サービスクラスによる非同期データ操作

### サービスアーキテクチャ
- **RSVPService**: Firestore RSVP データ管理、メール重複チェック、同伴者関係管理
- **AddressService**: 郵便番号住所検索（zipcloud API連携）
- **AuthService**: Firebase Authentication ログイン・ログアウト管理
- **AdminService**: 管理者向けRSVP データ取得、統計計算、CSV エクスポート

### CSS/スタイリング
- **Tailwind クラス**: ユーティリティファーストアプローチ
- **カスタムクラス**: `section-container`, `heading-main`, `text-elegant`, `btn-primary`, `input-field`
- **レスポンシブ**: md: ブレークポイント (768px) でデスクトップ対応
- **カラー**: rose色パレットをメインに使用
- **アニメーション**: フェード、スライド、タイプライター効果

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