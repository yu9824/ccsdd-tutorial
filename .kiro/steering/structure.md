# Project Structure

## Organization Philosophy

コンテンツ中心の構造。投稿ファイル（`posts/`）と静的アセット（`public/`）が主要な入力。テンプレート（`_includes/`）でレイアウトを定義。開発ツールや設定ファイルはビルド時に無視される。

## Directory Patterns

### Post Source Files
**Location**: `/posts/`  
**Purpose**: Markdown形式のブログ投稿ファイルを配置  
**Pattern**: `*.md` ファイル。YAMLフロントマターでメタデータを定義（`title`, `date`, `slug`, `draft` など）  
**Example**: `posts/hello-world.md`

### Static Assets
**Location**: `/public/`  
**Purpose**: CSS、JavaScript、画像などの静的ファイルを配置。ビルド時に `_site/` にコピーされる  
**Pattern**: 任意のファイル構造。`addPassthroughCopy` でそのまま出力にコピー  
**Example**: `public/css/style.css`, `public/js/main.js`

### Templates
**Location**: `/_includes/`  
**Purpose**: Nunjucksテンプレートファイル。レイアウトとコンポーネントを定義  
**Pattern**: `*.njk` ファイル。`base.njk` がベースレイアウト、`post.njk` が投稿レイアウト  
**Example**: `_includes/base.njk`, `_includes/post.njk`

### Build Output
**Location**: `/_site/`  
**Purpose**: Eleventyが生成する静的サイトの出力先。Git管理対象外（`.gitignore` に含まれる）  
**Pattern**: ビルド時に自動生成される。デプロイ時にこのディレクトリがNetlifyにアップロードされる

### Development Tools (Ignored)
**Location**: `/.kiro/`, `/.cursor/`  
**Purpose**: 開発プロセス管理とAIエージェントツール。ビルド時に無視される  
**Pattern**: これらのディレクトリはEleventy設定で明示的に無視される

## Naming Conventions

- **Posts**: kebab-case（例: `hello-world.md`, `my-first-post.md`）
- **Templates**: kebab-case（例: `base.njk`, `post.njk`）
- **Static Assets**: kebab-caseまたは標準的な命名（例: `style.css`, `main.js`）
- **Config Files**: kebab-case（例: `eleventy.config.js`）

## Import Organization

このプロジェクトは主にEleventyの設定とテンプレートシステムを使用するため、JavaScriptのimportは限定的。

- Eleventy設定: `eleventy.config.js` で `module.exports` を使用
- テンプレート: Nunjucksの `{% include %}` や `{% extends %}` を使用

## Code Organization Principles

1. **コンテンツとコードの分離**: `posts/` と `public/` がコンテンツ、`_includes/` がコード
2. **設定の集約**: Eleventy設定は `eleventy.config.js` に集約
3. **開発ツールの除外**: `.kiro/`, `.cursor/` などはビルド時に無視
4. **コレクションの活用**: Eleventyのコレクション機能で投稿を管理（`collections.posts`）
5. **フロントマターの標準化**: 投稿のメタデータはYAMLフロントマターで統一

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_
