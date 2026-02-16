

```bash
cd ~/ccsdd-tutorial

volta install node@20
npm init -y
volta pin node@20

# 任意（ローカル固定したいなら）
npm install --save-dev cc-sdd

# 実行
npx cc-sdd
```


```
# エージェント チャット画面で

# 初期化
/kiro/spec-init github actionsでビルドしてnetlifyにデプロイする静的ブログサービス。jekyll-likeなものをイメージしていますが、その限りではありません。postをmarkdownで作成して更新できる機能がほしいです。

# 要件生成
/kiro/spec-requirements static-blog-netlify

# 必要であれば requirements.mdを編集して、要件生成を再実行

# 承認して設計へ進む場合
# 既存コードがある場合、差分分析
/kiro/validate-gap static-blog-netlify
# 設計
/kiro/spec-design static-blog-netlify -y

```
