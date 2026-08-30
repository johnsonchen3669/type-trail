# 型旅 TypeTrail

30 天 JavaScript、TypeScript 與 AI 開發文章系列的伴讀測驗網站。首版收錄 Day 1 五題，交卷後顯示分數、答案與解析，作答進度保存在瀏覽器。

## 開發環境

專案使用 Angular 22、Tailwind CSS 4、Vitest 與 Node.js 24.19.0。所有 Node 指令都透過 `fdev` 的 Docker 容器執行，主機不需安裝 Node.js。

```bash
fdev up
fdev status
fdev logs
fdev down
```

`fdev up` 會安裝依賴並啟動 Angular 開發伺服器；實際網址與動態 host port 可由 `fdev status` 查看。
專案的 compose override 會使用容器內的獨立 npm cache，避開其他 fdev 專案的共享 cache 汙染。

## 驗證

```bash
fdev run npm test -- --watch=false
fdev run npm run build
```

## 部署

推送到 `main` 後，GitHub Actions 會建立 production 版本並部署至 GitHub Pages：

```text
https://typetrail.johnson.dev
```

網站使用 hash routing，讓 GitHub Pages 上的頁面重新整理仍可正常載入，例如
`https://typetrail.johnson.dev/#/day/1`。自訂網域記錄在 `public/CNAME`。

## 題庫

題目以 discriminated union 定義於 `src/app/quiz/`。新增日期時，建立新的型別化資料檔並沿用純函式判分與進度儲存層。
