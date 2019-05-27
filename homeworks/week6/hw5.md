## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

#### `<figure>` 
通常報章雜誌上除了正文，還會穿插一些圖片或圖表，有的圖片還會搭配一段文字描述。`<figure>` 則用於標記這些圖像、插圖、圖表和程式碼，讓語義更加清晰。
這個標籤的內容具有獨立性、可移植的、以及不影像正文等特性。經常與說明(caption) `<figcaption>` 一起使用。
`<figure>` 裡的第一個`<figcaption>` 代表這個`<figure>` 的標題。

#### `<figcaption>` 
`<figcaption>` 是用來定義`<figure>` 的標題（caption）。
`<figcaption>` 應該被置於`<figure>` 的第一個或最後一個子元素的位置。

#### `<blockquote>` 
`<blockquote>`定義一段文字屬於引用。而引言的 URL 來源可透過  cite 屬性賦予。



## 請問什麼是盒模型（box modal）？
盒模型（box modal）包含了元素內容（content）、內距（padding）、邊框（border）、外距（margin），由這四個盒子組成：
* content-box 內容盒子
* padding-box 內距盒子
* border-box 邊框盒子
* margin-box 外距盒子

![](https://i.imgur.com/e3nCGCl.png)

沒有特別指定時 width 是指 ”content-box” 的寬度，若設置了內距以及邊框，總體寬度會增加，若沒事先計算扣除邊框以及內距寬度，很有可能就會造成版面出錯。

後來人們慢慢意識到每次都要計算扣除內距和邊框的寬度非常不直覺，所以新增了一個叫 `box-sizing` 的屬性，可以控制 width 作用在誰身上，當設置了 `box-sizing: border-box` 後，所設定的 width 即是指 "border-box" 的寬度，即使設置了邊框和內距，整體寬度也不會改變。

## 請問 display: inline, block 跟 inline-block 的差別是什麼？什麼時機點會用到？

|                  |  inline | block   | inline-block |
| --------          | --------| --------| --------     |
| **設定 width**     | 無效       | 有效       | 有效             |
| **設定 height**    | 無效       | 有效       | 有效             |
| **padding上下**    | 不佔空間<br>（元素高度還是會撐開）   | 佔空間   | 佔空間      |
| **padding左右**    | 佔空間     | 佔空間   |佔空間       |
| **margin上下**     | 不佔空間   | 佔空間   | 佔空間      |
| **margin左右**     | 佔空間     | 佔空間   |佔空間       |
| **預設排列方向**     | 橫      | 豎       | 橫          |
| **強迫橫向排列**     | 預設即是 | 使用 float | 預設即是    |
| **例子** | `<a>` `<span>` |`<p>` `<div>`  |            |
| **什麼時機點會用到** | 想針對多個物件<br>做橫排 |  因為 block 的特性是<br>會佔掉一整列的空間，可以針對多個物件<br>做直排| 想針對多個物件<br>做橫排，又想像 block 一樣可調<br>各種屬性時|

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？分別各舉一個會用到的場合

### position: static
* static 是預設值，是網頁基本的定位方法。任何套用 ` position: static` 的元素「不會被特別定位」在頁面上特定位置，而是照著瀏覽器預設的配置自動排版在頁面上。
* 用到場合：沒有特別做其他定位（position: fixed/ absolute/ relative）時，網頁基本定位方法就是 `position:static`。

### position: fixed
* 物件設 fixed 之後，會從資料流當中抽離（後面的東西補上），自己獨立一層
* 尚未設定 top、right、bottom、left 的時候會固定在當時的資料流位置上, 捲軸捲動時不會跟著捲走
* 設定 top、right、bottom、left 後，以”視窗”範圍作為定位的依據做定位
* 會用到的場合就是常見的蓋版廣告

### position: absolute
* 物件設 abolute 後，會從資料流當中抽離，自己獨立一層
* 尚未設定 top、right、bottom、left 的時候會固定在當時的資料流位置上，而且可隨捲軸捲動
* 設定 top、right、bottom、left 後，物件會開始尋找具有定位設定的父層（position: relative/absolute/fixed;），並定位於其中
* 若父層沒有定位的設定，物件會再往上層尋找（父父層）並定位於其中
* 若所有父層都沒有做定位的設定，那麼抓不到父層的物件會以”視窗”範圍作為定位的依據做定位，定位於視窗的時候會隨著捲軸而捲動
* 會用到的場合有電商網站商品上的緞帶標籤，標籤上設定 `position: absolute` 可以依有設定定位的父層（商品圖片）來定位要放置左側或右側，或是突出做出有立體感的標籤。
![](https://i.imgur.com/g7Q8IYz.png)

### position: relative
* 物件設 relative 後，不會從資料流當中抽離（後面的東西不會補上）
* 設定 top、right、bottom、left 後 ，是針對物件原來的位置做篇移顯示
* 常見用到場合是電商網站上有緞帶標籤的商品圖，因為希望商品圖固定在原本的位置上（不會從資料流中抽離）又希望被當成標籤定位的依據，所以經常在商品圖設定 `position: realtive ` 。

