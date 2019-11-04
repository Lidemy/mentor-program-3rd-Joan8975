## Redux 如何解決非同步（例如說 call API 拿資料）的問題

傳統的 redux 只能處理同步操作，在執行某個操作後，發送一個 action 給 dispatch，dispatch 再去呼叫 reducer 並把 action 丟進去進行相應的處理。

但是 Redux 要處理非同步時就需要透過 middleware 的幫助，因為他不像同步操作接收的是普通的物件，而是 function 。當 action creater 返回 action ( 此時為 function)，會經過 middleware 幫忙 "轉換" 成一個普通的物件，變成 reducer 認識的模樣。所以 middleware 是作用在 action 產生後, reducer 接收到之前這個時間段。非同步的 middleware 有像是 redux-thunk 或是 redux-promise 這兩套 library。
