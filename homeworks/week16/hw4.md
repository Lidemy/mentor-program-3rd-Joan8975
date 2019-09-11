## CSS 預處理器是什麼？我們可以不用它嗎？
單純使用 css 會經常遇到低覆用性或不容易維護等問題，而 CSS 預處理器則是為了解決這些原因而被創造出來，他擁有 mixin、巢狀選擇器、繼承選擇器等等。 這些功能會令 CSS 結構的更簡潔、可讀性更高、也更容易維護。

CSS 預處理器只是幫助我們在寫 CSS 的時候彌補原生 CSS 的一些缺點，所以即便沒有使用 CSS 預處理器也沒有關係。
## 請舉出任何一個跟 HTTP Cache 有關的 Header 並說明其作用。
### Expires
Cache 機制可以將不常變動的資料做儲存，幫助瀏覽器獲取資源時速度更快，減少開啟網頁初期的等待時間。

實作時在 HTTP Response Header 裡面加上一個 `Expires` 和到期時間

```
Expires：Tue, 24 Sep 2019 03:40:20 GMT
```
在下一次造訪相同頁面時，瀏覽器會檢查上面的到期時間，如果尚未過期，就會直接從 Cache 裡面拿資料回傳，也不會發 Request，只是更新 Expires Header 的時間; 若檢查過期，瀏覽器才會重新發 Request ，更新資料和 Expires Header 的時間。

但是由於 client 端的日期是跟隨作業系統的時間，如果使用者的本機設定和現實不符，調成未來的某一天，可能就會造成瀏覽器誤判 Cache 資料過期，沒變動的資料依然不斷發送 Request 更新，造成資料庫的負擔。


## Stack 跟 Queue 的差別是什麼？
Stack跟 Queue 都是一種資料結構，差別是運作原理不同。

Stack 按照『後進先出』`LIFO, Last In First Out` 的原理運作，就像堆餐盤，桌面一個一個向上疊放，取用時由最上面一個個向下拿去，所以後丟進去的資料，反而會比較快取得。

Queue 則是『先進先出』`FIFO, First-In-First-Out`，像排隊的概念，先排的人先處理。常被用來應用在一些模擬程式中，如醫院的病人掛號, 計算銀行需要設置櫃臺的數量以減少顧客等待時間等等。

## 請去查詢資料並解釋 CSS Selector 的權重是如何計算的（不要複製貼上，請自己思考過一遍再自己寫出來）
### 規則：

> ### 目標越明確，優先權越高
> ### 層級相同，位置越後優先權越高
> 
### 層級權重:
> ### ！important > inline style > #id > .class > tag > *

### 範例一 ：
![](https://i.imgur.com/OLlZlP2.png)

**span 的顏色：**

當要比較 `span` 裡面文字的顏色為何時，根據 "目標越明確，優先權越高"，`span` 是比較明確針對 `span` 做設定的，故顯示效果為 `red`。

**內文顏色時（不含 span）:**

當要比較內文顏色時（不含 span），`p.test` 以及 `div .test` 都有相同的 test ，接著比較 p 以及 div ，由於兩者都屬於 tag ，根據 "層級相同，位置越後優先權越高"，內文顏色應該為最後面的 `blue`。

### 範例二 ：
![](https://i.imgur.com/ZuUi37j.png)

**內文顏色:**
當 `＃test` 和 `p.dev` 比較時，因為 ` #id > .class > tag` 所以不管有幾個 `.class` 還是 `tag` 串在一起 `#test` 權重還是比較高。

但是當 `inline style` 加入比較時，因為 ` inline style > #id > .class > tag` ，所以顏色應該是 `blue`。

如果這時大魔王 ！important 出現了
![](https://i.imgur.com/bTC01Py.png)

因為 !important 優先權最高，顏色就會變成 `aqua`。









