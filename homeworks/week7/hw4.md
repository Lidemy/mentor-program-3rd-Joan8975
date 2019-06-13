## 什麼是 DOM？
瀏覽器提供了一個橋樑讓 JavaScript 可以去改變畫面上的東西，這個橋樑就是 DOM

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
DOM 的事件傳遞機制分成三個階段，如下：
1. Capture Phase 捕獲
1. Target Phase 元素本身
1. Bubbling Phase 冒泡
![](https://i.imgur.com/6TMYtR4.png)

冒泡指的是「從啟動事件的元素節點開始，逐層往上傳遞」，直到整個網頁的根節點，也就是 document。

假設今天我的 HTML 如下
```javascript=
<!DOCTYPE html>
<html>
  <head>
    <body>
	  <button class="btn">click me</button>
    </body>
  </head>
</html>
```
當點擊了 `button` 這個元素，在**冒泡階段中**觸發事件的順序會是：

1. `<button class="btn">click me</button>`
2. `<body>`
3. `<html>`
4. Document

而在**捕獲階段**則剛好相反，順序會是：

1. Document
2. `<html>`
3. `<body>`
4. `<button class="btn">click me</button>`

### 而這兩個傳遞機制都會執行，順序是"先捕獲後冒泡"

透過  `addEventListener() `  這個函式的第三個參數 (true / false) 可以決定要把監聽事件加到捕獲階段還是冒泡階段，true 代表添加到捕獲階段，false 或是 沒有加參數 代表添加到冒泡階段。

```javascript=
<div class="outer">
  <div class="inner">
    <button class="btn">click me</button>
  </div>
</div>
```
```javascript=
addEvent('.outer')
addEvent('.inner')
addEvent('.btn')

function addEvent(className){
  document.querySelector(className).addEventListener('click', function(){
  console.log(className,'冒泡')},false)
  document.querySelector(className).addEventListener('click', function(){
  console.log(className,'捕獲')},true)
}

```
當點擊了 `button` ，console 出來的結果：
```
.outer 捕獲
.inner 捕獲
.btn 冒泡
.btn 捕獲
.inner 冒泡
.outer 冒泡
```
注意：`btn` 的冒泡與捕獲順序是依程式碼先後順序而定

## 什麼是 event delegation，為什麼我們需要它？
從事件傳遞機制裡的事件冒泡可以得知，任何點擊 `button` 的事件其實都會冒泡到 `wrap` 身上，因此我們可以在 `wrap` 做事件監聽就好。
```javascript=
<div class="wrap">
  <button class="btn">click me</button>
  <button class="btn">click me</button>
</div>
```
所以我們可以透過事件代理 event delegation 達到：
1. 比較有效率，如果每一個事件內容都差不多的話，不用寫一堆 function 去監聽每一個事件
2. 可以處理動態新增的情形，例如 appendChild 出來的元素不可能時時手動去加上 `addEventListener()` 


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
### e.preventDefault() 阻止瀏覽器預設的行為
HTML 部分元素會有預設行為，`e.preventDefault()` 可以阻止瀏覽器預設的行為，常見用在`<a>`的超連結，阻止連結跳轉。或是表單未完成送出時，可以使用  `e.preventDefault()` 阻止送出的行為。執行 `e.preventDefault()` 與傳遞事件沒有關係，傳遞事件仍然有作用。

### e.stopPropagation() 取消事件傳遞
`e.stopPropagation()` 可以根據不同的傳遞方式（捕獲或冒泡），來取消事件向上或向下傳遞。常見例子是 checkbox ，常常為了有比較好的體驗 HTML 會這樣寫：
```javascript=
<label class="lb">
  Label <input type="checkbox" name="chkbox">
</label>
```
這個時候如果對 `lb` 做監聽事件
```javascript=
var lb = document.querySelector('.lb');

lb.addEventListener('click', function (e) {
  console.log('lb click');
}, false);
```
結果出現兩次 "lb click"
```javascript=
"lb click"
"lb click"
```
原因是因為包在裡面的 `checkbox` 因為冒泡事件的關係觸發到外面的 `label`，如果要修正觸發兩次的錯誤行為，這個時候只要在 `checkbox` 監聽事件上加上 `e.stopPropagation()` ，就可以阻擋 `checkbox` 的事件冒泡囉～