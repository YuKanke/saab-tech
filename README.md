# saab-tech.com

SaaB Technologies（屋号）の公式サイト。GitHub Pages でホスティングしている。

## 構成

フレームワーク・ビルドツールなしの静的サイト。

- `index.html` — トップページ（ワンページ構成）
- `policy.html` — プライバシーポリシー
- `css/style.css` — 全スタイル（デザイントークンは冒頭の `:root` に定義）
- `js/site.js` — ナビ開閉・問い合わせフォーム・旧Service Workerの掃除
- `service-worker.js` — 旧サイトのSWを解除するためのキルスイッチ（削除しないこと）
- `img/cases/` — 実績セクション用に最適化した画像（幅800px）

## 開発

ローカル確認はサーバーを立てるだけ:

```bash
python3 -m http.server 8000
```

## お問い合わせフォーム

Googleフォームに hidden iframe 経由で POST している。
フォームの質問を変更した場合は `index.html` 内の `entry.XXXXXXX` を更新すること。

## GA4

測定IDを取得したら `index.html` 内のコメントアウトされた gtag スニペットを有効化する。
