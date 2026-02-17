# Product Overview

静的ブログサービス。Jekyllライクなワークフローで、Markdownで投稿を作成・更新できる。GitHub Actionsでビルドし、Netlifyに自動デプロイされる。

## Core Capabilities

1. **Markdownベースのコンテンツ管理**: `posts/` ディレクトリにMarkdownファイルを配置するだけで投稿を作成・更新できる
2. **自動ビルド・デプロイ**: `main` ブランチへのプッシュでGitHub Actionsがビルドし、Netlifyに自動デプロイ
3. **静的サイト生成**: Eleventyを使用してMarkdownをHTMLに変換し、静的サイトとして配信
4. **投稿一覧と個別表示**: 投稿一覧ページと個別投稿ページを自動生成

## Target Use Cases

- 個人ブログや技術ブログの運営
- Markdownでコンテンツを管理したい場合
- Gitベースのワークフローでコンテンツをバージョン管理したい場合
- CMS不要のシンプルなブログ運営

## Value Proposition

- **シンプル**: リポジトリが唯一の情報源。データベースやCMS不要
- **自動化**: プッシュするだけでビルド・デプロイが完了
- **標準的**: MarkdownとGitという標準的なツールを使用
- **静的**: 高速で安全な静的サイトとして配信

---
_Focus on patterns and purpose, not exhaustive feature lists_
