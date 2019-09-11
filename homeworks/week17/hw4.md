```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 1. 2
obj2.hello() // 2. 2
hello() // 3. undefined
```

#### 1. `obj.inner.hello()`
首先要先知道 `console.log(this.value)` 這裡的 this 的內容，簡單的方法就是把呼叫的 function 前面的物件都當參數放進 call() 裡面，因為 call() 的第一個參數就是 this ，所以可以找到 this 的內容。

把 function hello 前面的 `obj.inner` 放入 call() 裡，會變成 `obj.inner.hello.call(obj.inner)` 所以 this 是`obj.inner` ，而 `obj.inner.value` 就會是 2。

#### 2. `obj2.hello()`
 由於 obj2 為 obj.inner 的值，相當於把 `obj.inner` 放入 call() 裡，變成 `obj.inner.hello.call(obj.inner)` ，所以 this 是`obj.inner` ，而 `obj.inner.value` 就會是 2。
 
 #### 3. `hello()`
 hello 前面沒有任何物件，代表沒有透過物件呼叫 hello，就只是執行一個普通的 function，而 this 在物件導向和 DOM 的環境外，都是預設值，而隨著在不同環境，預設結果也不同。
 
在 node.js 環境下會指向 global ，瀏覽器則是 window ，不論是 global 還是 window， 在全域中都沒有針對 value 做設定，所以結果會是 undefined。