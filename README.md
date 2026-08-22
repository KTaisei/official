# Portfolio site

Next.js static portfolio with a Decap CMS editing surface at `/admin`.

## First deployment

1. In `public/admin/config.yml`, replace the repository and Worker placeholders.
2. Create a GitHub OAuth App. Set its callback URL to `https://YOUR-WORKER.workers.dev/callback`.
3. In `worker/`, run `npx wrangler secret put GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `ALLOWED_GITHUB_LOGIN`, then deploy the Worker with `npx wrangler deploy`.
4. Push the repository to GitHub. In Settings → Pages, set Source to **GitHub Actions**.

Only the GitHub login stored in `ALLOWED_GITHUB_LOGIN` can obtain an editing token. The Client Secret never reaches the static website or repository.

#ポートフォリオサイト

`/admin` にある Decap CMS 編集画面を備えた Next.js 静的ポートフォリオ。

## 最初の展開

1. 「public/admin/config.yml」で、リポジトリとワーカーのプレースホルダを置き換えます。
2. GitHub OAuth アプリを作成します。コールバック URL を「https://YOUR-WORKER.workers.dev/callback」に設定します。
3. `worker/` で、`npx wrangler secret put GITHUB_CLIENT_ID`、`GITHUB_CLIENT_SECRET`、および `ALLOWED_GITHUB_LOGIN` を実行し、`npx wranglerdeploy` でワーカーをデプロイします。
4. リポジトリを GitHub にプッシュします。 [設定] → [ページ] で、[ソース] を **GitHub Actions** に設定します。

`ALLOWED_GITHUB_LOGIN` に保存されている GitHub ログインのみが編集トークンを取得できます。クライアント シークレットが静的な Web サイトやリポジトリに到達することはありません。