## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
#### varchar:  
可以設定最大長度, 實際範圍是65532或65533， 因為內容頭部會佔用1或2個位元組儲存該字串的長度，如果欄位 default null（即預設值為空），整條記錄還需要1個位元組儲存預設值 null。如果是 utf8 編碼， 那麼 varchar 最多存 65532/3 = 21844 個字元。 varchar 查詢速度較 text 快。

#### text:
當不知道屬性的最大長度時，適合用 text。最多儲存 65535 個字元，跟 varchar 的區別是 text 需要 2 個位元組空間記錄欄位的總位元組數。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又會以什麼形式帶去 Server？
Cookie 是屬於一種小型的文字檔案，透過加密的方式儲存在用戶端（Client Side）上的資料，一般來說 cookie 會紀錄用戶的資訊，比較常見的做法是應用在購物車、會員登入或瀏覽紀錄、停留時間等等的，讓 Server 可以透過辨別用戶身分，來取得相關的資訊 。

當 Server 收到 Request，就傳回一個包含了一或多個 Set-Cookie 欄的HTTP Response給瀏覽器。 這一欄包含了伺服器想儲存的 Cookie 資訊。瀏覽器就會將 Cookie 儲存起來，通常儲存在一個檔案內。 當瀏覽器要求某一個網頁時，瀏覽器會檢查它儲存了的Cookie是否允許被該網頁存取， 如果允許就會在HTTP Request Header 加 Cookie。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

首先是有 SQL injection 這個資料庫的安全漏洞，藉由特殊字元，改變語法上的邏輯，駭客就能取得資料庫的所有內容，當然也包含了會員的帳號，密碼，以 hw3 作業的登入驗證為例:
> $ sql = "SELECT * from users where username = '$ username' and password = '$ password'";
> 
當帳號與密碼被惡意輸入為 `1' OR '1'='1` 的時候，駭客可以無註冊帳號密碼，就能登入網站。

另外會員的密碼最好是經過加密，這樣就能避免資料外洩時，密碼也同時外洩。
