## 請簡單解釋什麼是 Single Page Application

以往的 MPA（Multiple Page Application）是多個頁面渲染出多個結果，在 server side render 輸出「完整的 HTML」給到瀏覽器接著顯示出來，顯示時會因瀏覽器等待 Server 的 Response 載入 HTML 而會有一小段的空白畫面。

SPA（Single Page Application）則是把畫面的渲染從 server side render 改到 client side render，畫面渲染由前端先輸出「完整的資料」（基本 HTML tag、 CSS、 JavaScript 等等），再用 JavaScript 動態生成「完整的 HTML」，隨著 Ajax 的技術成熟，利用 Ajax 非同步的特性，達成**不換頁**也能跟 Server 拿資料，完成基本網頁 CRUD 操作。

而後端永遠只需要輸出同一個檔案，供前端串接，如此一來不僅降低 Server 的負載量，若有一天 server 掛掉，使用者頂多看不到資料，仍可以造訪網站看到前端基本的渲染。

## SPA 的優缺點為何

### 優點：

1. 降低 Server 的負載量
2. 前後端切分明顯，職責分明，前後端要更換寫法或框架都比較方便。
3. 沒有頁面跳換時的短暫空白畫面問題，改善用戶體驗
4. 即便 server 或 api 壞了，使用者頂多看不到資料，網頁不致於連畫面都渲染不出來。

### 缺點：

SPA 在一開始只會載入基本的 JavaScript 和 tag，主要內容需要在使用者下指令後才動態產生，所以搜尋引擎會抓取不到資料，SEO 會有問題，解法是讓第一個頁面由 Server side render，之後的操作才用 Client side render，而這個概念叫 SSR（Server Side Rendering）。


