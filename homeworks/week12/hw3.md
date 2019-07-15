## 請說明 SQL Injection 的攻擊原理以及防範方法
SQL Injection，藉由特殊字元，改變語法上的邏輯，駭客就能取得資料庫的所有內容，當然也包含了會員的帳號，密碼，以下登入驗證程式碼為例:
```javascript=
$sql = "SELECT * from users where username = '$ username' 
and password = '$ password'
```

當帳號與密碼被惡意輸入為 `1' OR '1'='1` 的時候，駭客可以無註冊帳號密碼，就能登入網站。

防範方法是使用 **prepare statement:**
```javascript=
$stmt = $conn->prepare("SELECT * FROM users WHERE username=? and pwd=?"); //把參數換成"?"
$stmt->bind_param('ss', $username, $password); //把替換的參數寫在這，兩個 s 代表兩個參數; 
$stat->execute(); //執行
$result = $stat->getResult(); //得到結果
}
```
## 請說明 XSS 的攻擊原理以及防範方法
XSS (Cross-Site Scripting) 跨站式腳本攻擊，惡意攻擊者在 We b網頁上透過插入代碼的方式，以達到特殊目的（更改網站樣式、把網站引導到釣魚網頁，甚至取走 Cookies）。

目前 XSS 攻擊的種類大致可以分成以下幾種類型：
#### Stored XSS (儲存型)
輸入的內容會永久保存在 database 裡面, 所以若資料被惡意修改，之後的使用者會一直看到被修改的內容，殺傷力極大。
防範的方法可以透過 php 提供的  **htmlspecialchars() 函數** 來跳脫字元（escape）、過濾資訊，最後會輸出純文字而不是腳本。
```javascript=
htmlspecialchars($str, ENT_QUOTES, 'utf-8')
```
預定義的字符：

```
& 為 &amp;
" 為 &quot;
' 為 &#039;
< 為 &lt;
> 為 &gt;
```

#### Reflected XSS (反射型)
把惡意程式碼放在網址列上以 GET 參數傳遞，如下：
```
http://www.exam.com?status=<script>alert(1)</script>
```
若網頁後端沒有過濾掉惡意字元，直接回傳的話，會變成正常的代碼執行。攻擊者通常需要誘導使用者去觸發連結才可以進行攻擊。

#### DOM-Based XSS (基於 DOM 的類型)
網頁上的 JavaScript 在執行過程中，沒有詳細檢查資料使得操作 DOM 的過程帶入了惡意指令。這個攻擊跟後端沒有關係，需由前端進行防範。

## 請說明 CSRF 的攻擊原理以及防範方法
#### 攻擊原理:
CSRF 的攻擊是指在不同的 domain 底下卻能夠偽造出「使用者本人發出的 request」。
舉例來說，駭客在自己 domain 偽造出像是使用者本人發出的 request 連結或圖片，當使用者被引誘點擊，使用者瀏覽器發送 request 時自動帶上相關的 cookie ，Server 端收到之後檢查了 cookie，識別出使用者，這時駭客就成功達成攻擊行為了。
#### 防範方法:
**1. 加上圖形驗證碼、簡訊驗證碼**
**2. 加上 CSRF token**
在 form 裡面加一個隱藏的欄位放 CSRF token, 每次隨機產生值，存在 Server Session 中。表單送出後 Server 再驗證表單的 token 與所存是否一致。

**3. Double Submit Cookie**
與第二種解法相似，差別在於除了有 Server 的 Session， 同時 Client side 也產出值存 Cookie ，最後再看兩個值是否相同來判斷是不是由同一個 domain 發出。

**4. Client 端的 Double Submit Cookie**
若是在 Single Page Application(SPA) 的專案下，可以改由 Client side 生成 token，只要確保不被猜出來即可。

**5. browser 本身的防禦**
Google 瀏覽器提供了 SameSite Cookie 功能，顧名思義當 Cookie 加上 `SameSite` 之後，除了該網站這個 domain 發出的請求，其他 domain 發出的請求都不會帶上這個 Cookie，幫助使用者在 Cookie 上又加一層驗證。