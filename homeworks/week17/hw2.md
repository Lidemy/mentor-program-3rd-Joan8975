```javascript=
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
```
輸出：
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```
#### 跑第一個迴圈

1. i = 0, 把 `console.log('i: ' + 0)` 放到 call stack 裡，直接被執行，在 Browser 上 console 出來，最後再從 call stack 裡被移除

2. 把 `setTimeout(() => { console.log(i) }, i * 1000)` 放到 call stack 裡被執行，因為是非同步的關係，放到 Web APIs 裡等 0 秒時間到再把 `() => { console.log(i) }` 丟到 callback queue。

3. 執行 i++, i = 1

#### 跑第二個迴圈

1. i = 1, 把 `console.log('i: ' + 1)` 放到 call stack 裡，直接被執行，在 Browser 上 console 出來，最後再從 call stack 裡被移除

2. 把 `setTimeout(() => { console.log(i) }, i * 1000)` 這個 function 放到 call stack 裡被執行，接著到  Web APIs 裡等 1 秒時間到再把 `() => { console.log(i) }` 丟到 callback queue。

3. 執行 i++, i = 2

#### 跑第三個迴圈

1. i = 2, 把 `console.log('i: ' + 1)` 放到 call stack 裡，直接被執行，在 Browser 上 console 出來，最後再從 call stack 裡被移除

2. 把 `setTimeout(() => { console.log(i) }, i * 1000)` 這個 function 放到 call stack 裡被執行，接著到  Web APIs 裡等 2 秒時間到再把 `() => { console.log(i) }` 丟到 callback queue。

3. 執行 i++, i = 3

#### 跑第四個迴圈

1. i = 3, 把 `console.log('i: ' + 1)` 放到 call stack 裡，直接被執行，在 Browser 上 console 出來，最後再從 call stack 裡被移除

2. 把 `setTimeout(() => { console.log(i) }, i * 1000)` 放到 call stack 裡被執行，接著到  Web APIs 裡等 3 秒時間到再把 `() => { console.log(i) }` 丟到 callback queue。

3. 執行 i++, i = 4

#### 跑第五個迴圈

1. i = 4, 把 `console.log('i: ' + 1)` 放到 call stack 裡，直接被執行，在 Browser 上 console 出來，最後再從 call stack 裡被移除

2. 把 `setTimeout(() => { console.log(i) }, i * 1000)` 放到 call stack 裡被執行，接著到  Web APIs 裡等 4 秒時間到再把 `() => { console.log(i) }` 丟到 callback queue。

3. 執行 i++, i = 5


Event Loop 這時已經確定 call stack 已清空，開始處理 callback queue 的東西，

因為變數有效範圍 (scope) 的最小切分單位是 function (ES6 的 let 與 const 例外)


在 setTimeout 的 function 裡面 `console.log(i)` 找不到 i，這時就會再往上一層 scope 找，所以當 1/ 2/ 3/ 4/ 5 秒過去，變數 i 的值早已是 for 迴圈更新完畢的 i （i = 5），而不是迴圈內當下的那個 i 。