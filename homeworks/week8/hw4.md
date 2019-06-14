## 什麼是 Ajax？
可以非同步跟伺服器交換資料的 JavaScript 稱為 AJAX，非同步的好處是發送 Request 之後，不用等 Response 回來，可以往下執行其他程式碼，等 Response 回來之後，透過回呼函式把資料帶進來，最後顯示在瀏覽器上。

## 用 Ajax 與我們用表單送出資料的差別在哪？
使用 Ajax 可以讓我們不需要跳換頁面就可以拿到 Server 的 response 資料。

## JSONP 是什麼？
JSONP（JSON with Padding）可以讓網頁從別人的 server 要資料。和 CORS（跨來源資源共用）一樣都是解決跨網域限制的方法。因為 `<script>` 這個 Tag 不受同源政策的限制，所以可以透過 `<script>` 裡面放資料，再寫 `function` 指定好後把資料帶回去

## 要如何存取跨網域的 API？
如果 Server 沒有在 header 加上 `access-control-allow-origin` 可以透過 JSONP 的方式存取跨網域的 API。
把 `<script>` 元素的 src 屬性設成你想拿資料的來源網址，並建立好接收 response 的回呼函式，這時 server 端接受回呼函式為參數，並將回呼函式的結果回傳給 client 端，當傳輸完成後，client 會自動執行 Server 回傳的回呼函式，取得結果。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四週是學習用 node.js 呼叫 API，透過 node.js 程式直接發 request 到 server，server 直接發 response 回去給 node.js ， 中間不會有任何限制，回傳的東西是什麼就是回傳什麼; 而這週是瀏覽器上的 JavaScript 先透過瀏覽器把 request 發送到 server， 接著 server 透過瀏覽器再把 response 傳回來。因為都是透過瀏覽器的關係，會有一些限制，瀏覽器也會額外加上一些資訊，所以有跨網域的問題。