## 請以自己的話解釋 API 是什麼
我覺得 API 是兩方中間的溝通者，而他有一套自己的規範。最常見的例子就是餐廳的服務生，服務生 (API) 提供給你點菜的菜單 (API 規範)，而廚房（對方的系統）有你想要吃的食物，這個時候就需要透過服務生把你填的菜單送到廚房，告訴廚房你要吃什麼，然後服務生再把廚房煮好的食物端到你桌上。
在這過程中你必須依照菜單上的規範點餐，不能隨便點菜單上沒有的食物，就像我們必須依照 API 文件上的規範執行，就能夠得到對方提供的服務是一樣的道理。


## 請找出三個課程沒教的 HTTP status code 並簡單介紹
`401 Unauthorized` 
請求未被應用，因為缺乏目標資源的有效身分驗證。回應錯訊裡面除了這個狀態碼還會有一個叫 `WWW-Authenticate` 開頭的訊息，訊息裡面包含如何正確授權的資訊。
在第四個作業接 Twitch API 的時候就有要求要先取得 client id，在 header 的地方要改成自己的 client ID ，錯誤就會跳出這個 401 錯訊。

`413 Payload Too Large` 
要求的實體太大。伺服器可能關閉連接或返回叫 `Retry-After` 的標頭。

`418 I'm a teapot` 
1998年作為 IETF 的傳統愚人節笑話, 在 RFC 2324 超文字咖啡壺控制協定'中定義的，並不需要在真實的 HTTP 伺服器中定義。當一個控制茶壺的 HTCPCP 收到 BREW 或 POST 指令要求其煮咖啡時應當回傳此錯誤。這個HTTP狀態碼在某些網站（包含 google.com ）與項目（ 如Node.js、ASP.NET 和 Go 語言 ）中用作彩蛋。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL: https://shielded-ravine-56889.herokuapp.com/

### **回傳所有餐廳資料**
Method：GET
path：/restaurants
參數：_limit:限制回傳資料數量
範例：https://shielded-ravine-56889.herokuapp.com/restaurants?limit=4
Response:
```
[
  {
    "id": 1,
    "name": "KFC"
  },
  {
    "name": "Pizza Hut",
    "id": 2
  },
  {
    "name": "McDonald",
    "id": 3
  },
  {
    "name": "Mos Burger",
    "id": 4
  }
]
```
### **回傳單一餐廳資料**
- Method：GET
- path：/restaurants/:id
- 範例：https://shielded-ravine-56889.herokuapp.com/restaurants/2
- Response:
```
{
  "name": "Pizza Hut",
  "id": 2
}
```
### **刪除餐廳**
- Method：DELETE
- path：/restaurants/:id
- 範例：https://shielded-ravine-56889.herokuapp.com/restaurants/2

### **新增餐廳**
- Method：POST
- 參數：name: 店名
- path：/restaurants
- 範例：https://shielded-ravine-56889.herokuapp.com/restaurants

### **修改餐廳**
- Method：PATCH
- 參數：name: 店名
- path：/restaurants:/id
- 範例：https://shielded-ravine-56889.herokuapp.com/restaurants/2