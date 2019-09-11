```javascript=
console.log(1)  //1.
setTimeout(() => { //2.
  console.log(2)
}, 0)
console.log(3) //3.
setTimeout(() => {
  console.log(4) //4.
}, 0)
console.log(5) //5.
```
1. 把 `console.log(1)` 放到 call stack 裡，因為沒有其他 function ，所以直接被執行，在 Browser 上 console 出來，最後再從 call stack 裡被移除

2. 把 `setTimeout(() => {console.log(2)}, 0)` 放到 call stack 裡被執行，瀏覽器會根據 Web API 建立計時器，等 0 秒時間到再把 `() => {console.log(2)}` 丟到 callback queue。


3. 把 console.log(3) 放到 call stack 裡，接著被執行，在 Browser 上 console 出來，最後再從 call stack 裡被移除

4. 把 `setTimeout(() => {console.log(4)}, 0)` 放到 call stack 裡被執行，因為是非同步的關係，所以放到 Web APIs 裡，等 0 秒時間到再把 `() => {console.log(4)}` 丟到 callback queue。

5. 把 console.log(3) 放到 call stack 裡，接著被執行，在 Browser 上 console 出來，最後再從 call stack 裡被移除

7. 因為 Event Loop 會不斷在 call stack 以及 callback queue 輪流來回檢查，但以 call stack 為優先處理，會先檢查是否處理完所有同步的部份（call stack是否清空），之後才會執行非同步的部份（ callback queue 裡的東西）。這時已經確定 call stack 已清空，開始處理 callback queue 的東西，根據 callback queue 處理東西 **"先進先出"** 的順序，先把`console.log(2)` 丟進 call stack，console 出來後再從 call stack 裡移除。

9. 把`console.log(4)` 丟進 call stack，console 出來後再從 call stack 裡移除。
