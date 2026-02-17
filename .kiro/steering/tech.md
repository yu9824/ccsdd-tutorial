# Technology Stack

## Architecture

静的サイト生成（SSG）アーキテクチャ。EleventyがMarkdownとNunjucksテンプレートを処理し、静的HTMLを生成。GitHub ActionsでCI/CDパイプラインを構築し、Netlifyにデプロイ。

## Core Technologies

- **Language**: JavaScript (Node.js)
- **Framework**: Eleventy 3.x (静的サイトジェネレーター)
- **Template Engine**: Nunjucks (`.njk` ファイル)
- **Runtime**: Node.js 20+ (Voltaで固定)

## Key Libraries

- **@11ty/eleventy**: 静的サイト生成のコアライブラリ
- **netlify-cli**: Netlifyへのデプロイツール（CI/CDで使用）

## Development Standards

### Build Configuration

- Eleventy設定は `eleventy.config.js` に集約
- 入力ディレクトリ: プロジェクトルート（`.`）
- 出力ディレクトリ: `_site/`
- 無視パス: `.kiro/`, `.cursor/`, `node_modules/`, 設定ファイルなど（開発ツールを除外）

### Content Processing

- Markdownファイルは `posts/*.md` から収集
- フロントマター（YAML）でメタデータを管理（`title`, `date`, `slug`, `draft` など）
- `draft: true` の投稿はビルド出力から除外
- 日付順（新しい順）でソート

### Static Assets

- `public/` ディレクトリのファイルは `addPassthroughCopy` で出力にコピー
- CSS、JavaScript、画像などの静的アセットは `public/` に配置

## Development Environment

### Required Tools

- **Node.js**: 20.20.0（Voltaで固定）
- **npm**: パッケージ管理
- **Volta**: Node.jsバージョン管理（推奨）

### Common Commands

```bash
# Build: 静的サイトを生成
npm run build

# 開発サーバー（Eleventyの組み込みサーバーを使用する場合）
npx @11ty/eleventy --serve
```

## Key Technical Decisions

1. **Eleventy選択**: シンプルで柔軟な静的サイトジェネレーター。Markdownとテンプレートの組み合わせが容易
2. **Nunjucksテンプレート**: Eleventyのデフォルトテンプレートエンジン。柔軟なテンプレート機能を提供
3. **GitHub Actions + Netlify**: CI/CDパイプラインをGitHub Actionsで管理し、Netlifyにデプロイ。シークレット管理が容易
4. **Volta使用**: Node.jsバージョンを固定し、チーム間で一貫性を保つ
5. **リポジトリベースのコンテンツ管理**: データベースやCMSを使わず、Gitリポジトリが唯一の情報源

---
_Document standards and patterns, not every dependency_
