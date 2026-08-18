# CoA Career LP

添付デザイン（LP_素案）をそのまま再現した静的サイトです。HTML / CSS / JS のみで構成されており、ビルド不要でそのまま公開できます。

```
coa-career-lp/
├── index.html
├── css/style.css
├── js/main.js
├── assets/images/
│   ├── hero-photo.png          ← 差し替え用プレースホルダー
│   ├── advisors/
│   │   ├── advisor-endo.png
│   │   ├── advisor-shibatani.png
│   │   └── advisor-ogata.png
│   └── logos/
│       ├── preferred-networks.png
│       ├── elephantech.png
│       ├── quantinuum.png
│       ├── vrain-solution.png
│       ├── renesas.png
│       └── orbital-lasers.png
└── README.md
```

## 差し替えが必要な素材

コード側の実装は完了していますが、以下の画像は仮素材（プレースホルダー）です。実際の写真・ロゴに差し替えてください。ファイル名を変えなければ、画像を上書きするだけで反映されます。

| ファイル | 内容 | 推奨サイズ |
|---|---|---|
| `assets/images/hero-photo.png` | ヒーロー右側の面談風景写真 | 横1200px以上（横長） |
| `assets/images/advisors/advisor-endo.png` | 遠藤美歌さんの顔写真 | 正方形 440px角以上 |
| `assets/images/advisors/advisor-shibatani.png` | 芝谷勇貴さんの顔写真 | 正方形 440px角以上 |
| `assets/images/advisors/advisor-ogata.png` | 雄賀多暁光さんの顔写真 | 正方形 440px角以上 |
| `assets/images/logos/*.png` | 導入企業ロゴ（Preferred Networks / Elephantech / QUANTINUUM / VRAIN Solution / RENESAS / Orbital Lasers） | 高さ80px程度、背景透過PNG |

**注意（ロゴ画像について）：** 各社ロゴは商標であるため、今回はダミーのテキストロゴを仮置きしています。実際の公開前に、各社から使用許諾を得た正式なロゴデータ（PNG/SVG、背景透過）に差し替えてください。既に許諾を得ている場合は、上表のファイル名のまま上書きすればレイアウト調整は不要です。

## そのまま動く箇所

- 配色・文言・レイアウト・レスポンシブ対応・求人カードの横スクロール矢印・スムーズスクロールは実装済みです。
- フォントは Google Fonts の Noto Sans JP を CDN 経由で読み込んでいます（インターネット接続が必要）。社内オフラインで確認する場合は表示が代替フォントになります。

## ローカルでの確認方法

ビルド不要です。`index.html` をブラウザで直接開くか、簡易サーバーを立てて確認してください。

```bash
# Python がある場合
cd coa-career-lp
python3 -m http.server 8000
# → http://localhost:8000 をブラウザで開く
```

---

## GitHubでの公開手順（GitHub Pages）

### 1. リポジトリを作成する
1. GitHub にログインし、右上の「+」→「New repository」
2. リポジトリ名を決める（例: `coa-career-lp`）
3. Public / Private はどちらでも可（GitHub Pages は無料プランでも Public なら公開可能。Private で公開したい場合は GitHub Pro/Team/Enterprise が必要）
4. 「Create repository」をクリック（READMEなどは追加しなくてOK）

### 2. このフォルダの中身をpushする
手元の環境（ターミナル）で以下を実行します。`coa-career-lp` フォルダをダウンロード・展開した場所で行ってください。

```bash
cd coa-career-lp
git init
git add .
git commit -m "Initial commit: CoA Career LP"
git branch -M main
git remote add origin https://github.com/<あなたのGitHubユーザー名>/coa-career-lp.git
git push -u origin main
```

`<あなたのGitHubユーザー名>` の部分は実際のユーザー名（または組織名）に置き換えてください。

### 3. GitHub Pagesを有効化する
1. GitHub上のリポジトリページを開く
2. 「Settings」タブ →左メニューの「Pages」
3. 「Build and deployment」の「Source」を **Deploy from a branch** に設定
4. 「Branch」で **main** ブランチ、フォルダは **/(root)** を選択して「Save」
5. 数十秒〜数分待つと、ページ上部に公開URLが表示されます
   - 例: `https://<ユーザー名>.github.io/coa-career-lp/`

### 4. 更新の反映方法
画像を差し替えたりテキストを修正した場合は、以下でpushするだけで自動的にサイトへ反映されます（GitHub Pagesは main ブランチへのpushをトリガーに自動デプロイされます）。

```bash
git add .
git commit -m "画像を本番素材に差し替え"
git push
```

### 独自ドメインを使いたい場合
「Settings → Pages」内の「Custom domain」に取得済みのドメイン（例: `career.coa-nexus.com`）を入力し、ドメイン管理側でCNAMEレコードを `<ユーザー名>.github.io` に向けてください。詳細は GitHub公式ドキュメント「Managing a custom domain for your GitHub Pages site」を参照してください。

### Vercel / Netlify を使う場合（参考）
GitHub連携型のホスティング（Vercel, Netlifyなど）を使う場合は、GitHubにpushした後、各サービスの管理画面で「Import from GitHub」からこのリポジトリを選択するだけで、ビルド設定不要（静的サイトのため）で公開できます。
