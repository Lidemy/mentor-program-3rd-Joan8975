## Bootstrap 是什麼？
Bootstrap 是一個用於快速開發網站的前端框架，提供各種模組化樣式和組件，只需要引用已經設定好的 class，就可以快速創建出網站，並且確保跨瀏覽器的閱讀相容性。
此外，Bootstrap 提供了一套響應式、移動設備優先的流式網格系統（Fluid Grid System），可以根據不同螢幕尺寸調整頁面，讓頁面在各種尺寸上看起來都有很好的效果。
## 請簡介網格系統以及與 RWD 的關係
先說說網格系統，網格系統（Grid System）其實是一種平面設計方法與風格，它藉由固定的格子，去切割版面來設計佈局，運用在網頁則是把一定寬度的頁面切割成數欄，並且欄與欄之間留有間隙。
使用格線佈局可以建立對齊規律的排版，藉由分欄拆出不同的區塊來放不同的內容，但同時各區塊間仍然整齊規律，增加可讀性。
在跨裝置體驗相當受重視的現今，響應式網頁(RWD) 則是透過 Grid System 提供某種程度的比例概念，讓不同的設備都可以正常瀏覽同一網站，提供最佳的視覺體驗。
## 請找出任何一個與 Bootstrap 類似的 library
1. [Foundation](https://foundation.zurb.com/)
2. [Semantic UI](https://semantic-ui.com/)
3. [Pure](https://purecss.io/)
## jQuery 是什麼？
jQuery是一個快速、簡潔的 JavaScript 函式庫，簡化 HTML 與 JavaScript 之間的操作，並支援跨瀏覽器。舉例來說，選擇器 (selector) 的部份在原生 JavaScript 必須寫出常常一串 `document.getElementsByClassName()` ，而透過 jQuery 撰寫只需要用 `$(".className")` ，相對簡潔的許多。另外 jQuery 的 animate() 函數在網頁元件動畫上也有很好的表現，元件動作不會很機械有斷點，變得很流暢。
## jQuery 與 vanilla JS 的關係是什麼？
無論過去、現在還是未來，Vanilla JS 都是世界上最輕量的框架，沒有之一！（笑）。其實 vanilla JS 就是原生 JavaScript 啦！ vanilla JS 這個名詞是用來嘲諷瘋狂追求前端框架的現象。那 vanilla JS 這個原生 JavaScript 與 jQuery 差別是什麼呢？前者是使用原生瀏覽器提供的 API; 後者則是使用 jQuery 這個 library 提供的 API，優點是支援跨瀏覽器，寫程式可以比較簡潔，但缺點是會造成太依賴 library ，並且 library 其實還是有檔案大小的。