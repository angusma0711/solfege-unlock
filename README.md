# Solfege Unlock · 唱名解鎖

供香港小二學生使用的合作二線譜視唱遊戲。教師控制投影，全班原地歌唱，收集六枚音符後解鎖最後四音短句。

網站：https://angusma0711.github.io/solfege-unlock/

## 啟動

需要 Node.js 22.12+ 及 pnpm 11。執行 `pnpm install`、`pnpm dev`，開啟終端列出的網址。`pnpm build` 產生 dist，`pnpm preview` 預覽。GitHub main 更新後由 Actions 自動發布 Pages。

## 教學與操作

給起音 → 學生先唱 → 視需要顯示唱名／播放答案 → 教師判斷完成 → 收集音符 → 手動下一題。重試保留題目、不扣分。只包含 Do、Re、Mi，各音等長。無登入、後端、咪高峰或學生資料。

沿用考試圖片的兩線及 d 定位，按更新後的 Do／Re／Mi 範圍出題：Do 在兩線中間，Re 在 Do 與上線之間，Mi 在上線；參考音為 C4／D4／E4。唱名、譜面座標與可移調的參考音高獨立。鋼琴使用真錄音取樣，來源及授權見 src/game/assets/piano/CREDITS.md。角色及背景沿用使用者既有 Running Singing game 素材。

## 驗證

`pnpm dev --port 5187` 後執行 `pnpm test`（需安裝 Playwright，或設定 PLAYWRIGHT_MODULE 指向安裝位置）。驗證六題流程、正式譜面、重試／重設、防重複收集、跑步姿勢、音訊排程／取消、移調、無音訊完成及四種畫面尺寸。

Safari／iPad 真機、實體投影及揚聲器聽感仍需現場確認。
