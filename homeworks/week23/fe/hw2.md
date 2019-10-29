## 為什麼我們需要 Redux？

React 中兩個 component 傳遞狀態是 A component 把 state 傳到 B component 變成 props, B component 再透過 B 的 callback function 修改到 A 的 state，達成 component 之間的溝通。 

但如果今天兩組件溝通橫跨多層時，例如要從 A component 傳 state ，經過 B、C component 傳給 D component 使用，這種跨多層組件的溝通，一則對 B、C 來說他們不需要這個 state 但是要寫一堆參數幫忙傳下去，二則當時間一久可能會搞不清楚是從哪個 component 傳來的，最後變得很麻煩。

Redux 可以解決這個問題。

## Redux 是什麼？
> Redux is a predictable state container for JavaScript apps.”

Redux 官方文件第一句是這麼介紹的，它的 " predictable " 讓它在大型前端專案中相當重要。

首先， Redux 可以幫你把專案的狀態保存在唯一一個 store 中（唯一資訊來源），要使用的時候不用糾結到底是 state 還是 props，因為可以確定是保存在那一個 store，所以一定是用 props。

另外 Redux 裡保存的 state 是唯讀的，如果想要修改 state 必須 dispatch 一個 action 來描述發生的事件類別（type）以及要被改變的內容（payload），可以幫助我們做 **可預測** 的狀態管理，redux 對大型專案來說大大提昇了維護效率。

不僅僅只有 React 才可以使用 Redux，在 Angular、Ember、jQuery 或甚至原生 JavaScript 都可以搭配使用。


## Single Page Application 是什麼？有哪些頁面一定要用這個架構去設計嗎

SPA（Single Page Application）是指畫面渲染由前端先輸出「完整的資料」（基本 HTML tag、 CSS、 JavaScript 等等），再用 JavaScript 動態生成「完整的 HTML」，隨著 Ajax 的技術成熟，利用 Ajax 非同步的特性，達成不換頁也能跟 Server 拿資料，完成基本網頁 CRUD 操作。

而後端永遠只需要輸出同一個檔案，供前端串接，如此一來不僅降低 Server 的負載量，若有一天 server 掛掉，使用者頂多看不到資料，仍可以造訪網站看到前端基本的渲染。

像是音樂播放器、影音平台這種換頁時內容不能中斷的服務就必須用 SPA 去達成。