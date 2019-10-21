## React Router 背後的原理你猜是怎麼實作的？
Router 是指當頁面的 URL 發生改變時，UI 會根據不同的 URL 變化而變化，但是頁面並不會刷新。

早期的路由是通過 hash 來實現的，由於改變 URL 上的 hash 值並不會發生頁面跳轉，所以可以透過 hash 的值來決定渲染出怎樣的畫面。有個叫 hashchange 的事件可以監聽 hash 的值，在事件的回呼函式中可以執行 UI 的展示。

另外也可以透過 HTML DOM history 實現前端路由，如 `History.replaceState()`、`History.pushState()`，可以改變當前顯示的 url 又不會刷新頁面。

而 React Router 裡的 component 就是基於上面的原理重新包裝，以 `<BrowserRouter>` 為例，這個 component 就利用了 window.history，當點擊 `<Link>` 後會渲染新的 component，在新的 component 裡輸出 props.history 會看到一些屬性，裡面像是 go、goBack、goForward 這些方法，其實就是分别對應到 window.history 裡面的 `window.history.go`、`window.history.back`以及 `window.history.forward`。

## SDK 與 API 的差別是什麼？
**SDK:**  software development kit，軟體開發工具包，可能會包含作業環境、語言以及許多 API。
**API:**  Application Programming Interface，應用程式介面，一般指一些預先定義好的函式，引入使用可達到資料傳輸，獲取所需資料，對接時環境要自己提供。

如果是簡單功能的需求，串 API 即可，大且複雜的需求，SDK 功能齊全比較合適。

## 在用 Ajax 的時候，預設是不會把 Cookie 帶上的，要怎麼樣才能把 Cookie 一起帶上？

Client side 以及 Server side 都需做設定，

**Client side：**
request 中設定 ` withCredentials: true`

**Server side：**
在 hearder 設定 
`header('Access-Control-Allow-Credentials:true');`
`header('Access-Control-Allow-Origin: 這裡不可以為'＊'，需改為 'http://www.example.com');`  


