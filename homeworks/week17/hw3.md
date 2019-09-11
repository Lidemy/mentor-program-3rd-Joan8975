```javascript=
var a = 1
function fn(){
  console.log(a) //1. a = undefined
  var a = 5
  console.log(a) //2. a = 5
  a++ // 3. a = 6
  var a
  fn2()
  console.log(a) //5. a = 20
  function fn2(){ 
    console.log(a) //4. a = 6
    a = 20
    b = 100
  }
}
fn()
console.log(a)// 6. a = 1
a = 10
console.log(a)// 7. a = 10
console.log(b)// 8. b = 100
```
1. 因為底下有 var ，會 hoisting 變成

```javascript=
var a
console.log(a) 
a = 5
```
所以這裡的 a 答案是 undefined

2. 因為前一行有 var a = 5，所以 a 已經變成 5了
3. 因為 a++ ，所以 a = 6
4. 因為 f(n) 裡面沒有定義 a ，只有賦值而已，所以這裡的 a 會找上一層的值，上一層 a 的值為 6 
5. 因為 f(n) 裡面沒有定義 a ，所以會往上一層找，f(n) 裡面的 a = 20 會取代掉上一層的 a = 6
6. 看 global scope ， a = 1
7. 因為上一行 a = 10 改變了他的值，所以 a = 10
8. 只有一個 b， b = 100