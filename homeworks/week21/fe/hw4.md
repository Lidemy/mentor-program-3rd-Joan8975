## 為什麼我們需要 React？可以不用嗎？

如果是要寫像 Landing Page 這種開發狀態變化不是很大的頁面以，是可以不需要使用 React 的。

但是如果是大型應用程式，有複雜的狀態變化，常常需要在 UI 和相對應渲染頁面邏輯的檔案兩邊跑，在維護上比較麻煩，而 React 是把「顯示邏輯」和「UI」放在一起成為「元件」，後續維護上也相對方便許多。

所以在不想要頻繁改變 DOM 浪費效能和方便維護的情況下，使用 React 會是比較好的選擇。

## React 的思考模式跟以前的思考模式有什麼不一樣？

以往是把事件綁在 DOM 上，當功能越多，觸發頁面的事件越多，前端資料狀態的變化也越頻繁，因此需要頻繁的去改變 DOM 結構。

在 React 上是把「改變資料」和「排版」分開，只要資料變動一次，就根據寫好的版型，重新把資料塞進去，並且顯示給使用者。

 
## state 跟 props 的差別在哪裡？

- state: 元件本身的狀態，只有元件本身可以控制、修改自己的狀態。
- props: 可以想像成子元件和父元件中間的一跟管子，當子元件需要父元件的參數來進行子元件本身的設定時，就要透過 props 這個管子把參數從父元件流通過來。
子元件無法修改父元件傳進來的參數，僅能利用參數做元件本身的設定。



## 請列出 React 的 lifecycle 以及其代表的意義

整個生命週期分成三大類：

### Mounting(當 Component 被建立時)
==component 被建立 ➜ call constructor() (這時侯沒把東西掛到 DOM 上) ➜ render ➜ componentDidMount() (把 component 掛到 DOM 上)==

#### componentDidMount()
- 把 component mount到 DOM 上面就必須用 componentDidMount() 來完成，所以在 componentDidMount() 真正被執行之後東西才會真的出現在 DOM 上面。
- 因為 componentDidMount() 是在 component  render 完後才會呼叫他，所以適合做一些初始化的東西。
- componentWillUnmount() 可以把 componentDidMount() 建立的東西做清除。

---

### Updating(當 Component 更新時)
==事件觸發 ➜ change state ➜ shouldComponentUpdate() ➜ render() ➜ componentDidUpdate()==


#### shouldComponentUpdate()

* shouldComponentUpdate() 被呼叫的時間點是在改變 state 後，沒特別設定的話預設會回傳 true ，接著到 render 階段，回傳 flase 則不觸發 render()。
* 如果 shouldComponentUpdate() 回傳 flase ，componentDidUpdate() 也不會被觸發。

#### componentDidUpdate()
- 因為每次 state 更新之後都會 call componentDidUpdate()，所以可以用這個方法設定當每次 state 更新之後，要做什麼事情，不用每次都在 setState 設定 callback function。
* 如果 shouldComponentUpdate() 回傳 flase ，componentDidUpdate() 也不會被觸發。


---


### Unmounting

#### componentWillUnmount()
- 在 component 被 unmount 或 destroy 之前執行。
- 這個方法可以清除 componentDidMount() 的一些設定內容，例如無效的 Timer。通常會和 componentDidMount 合在一起使用



