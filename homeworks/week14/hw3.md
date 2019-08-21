## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
當要拜訪 Google 網站時，會輸入一段網址，但電腦其實是需要知道 IP 位置才能連上 Google 而不是網址，英文組成的網域名稱只是幫助人們方便記憶，所以需要一個機制來把我們常見的網址轉換成 IP 位置，Domain Name System(DNS) 就是處理這個轉換的伺服器。

#### 對 Google 的好處：
由於 Google 可以知道用戶在哪些時間搜尋了哪些網頁，蒐集了這些資料後可以賣廣告營利。

#### 對一般大眾的好處：
穩定性高、比較少故障，另外 Google Public DNS 有快取，若欲拜訪的網址已有許多人拜訪過，會被存入快取，所以在解析 DNS 時會速度更快，減少開啟網頁初期的等待時間。

## 什麼是資料庫的 lock？為什麼我們需要 lock？
lock 應用在 Race Condition（資源競爭）的時候。為了避免超賣，在更新資料之前，需要先把資料鎖起來，保證結果是正確的。
```php
$conn->autocommit(FALSE);
$conn->begin_transaction();
$conn->query("SELECT amount from products where id = 1 for update");     
//只有一筆會往下執行，其他的停留在這裡（但是會有效能上的損耗）
$conn->commit(); //執行之後會把鎖還回去，讓下一筆往下執行
```
使用 `SELECT ... FOR UPDATE` 會在被讀取的 row 加上 exclusive lock ，而 exclusive lock 可以避免其他 thread `UPDATE` 、 `DELETE` 、 `SELECT ... FOR UPDATE` 這些 row ，直到被 Commit 為止。

## NoSQL 跟 SQL 的差別在哪裡
### 1.Schema 欄位架構
任何一種以 SQL 為基礎的資料庫系統，其中一個特性是他們必須事先定義好 Schema，先把每一個欄位的名稱跟型態都先固定住; 而 NoSQL 則是沒有 Schema，會以 JSON 格式的資料存進 Database，好處是不用事先知道要存什麼資料，較為彈性，減少資料存取程式的開發難度，但是因為沒有 Schema，無法支援標準的 SQL 語法來查詢資料，在查詢資料的時候相對速度就會比較慢，也無法執行複雜的 Join 指令。

### 2.擴充能力高，成本低
NoSQL 資料庫的另一個重要特性是具有水平擴充能力，只要增加新的伺服器節點，就能自動增加資料庫的容量，可以減少長期維護資料庫的人力，而且可以利用低價的一般等級電腦就能進行水平擴充，不像關聯式資料庫的叢集系統往往需要效能和容量較大的伺服器才能勝任。
### 3.成熟度不足，版本升級風險高
很多 NoSQL 資料庫都是這2、3年內才出現，所以，資料庫本身的功能還不完整，也較少出現成熟穩定的版本，版本升級過程中很容易會出現不相容的情形，須承擔技術不夠成熟時的變動風險。

## 資料庫的 ACID 是什麼？
為了確保資料的完整性，關聯式資料庫採用的交易（Transaction）設計，讓資料存取或異動過程中不會受到干擾。而 Transaction 資料庫要符合 ACID 四個特性：

#### 原子性 atomicity：
交易是不可分割的單元,就像原子一樣。整個流程要不是全部成功，不然就整段失敗當做沒發生過一樣，不會有部分完成。

#### 一致性 consistency：
異動過程確保整體資料庫的一致性，不論 Transaction 前後，都維持資料的一致性（例如錢的總數要相同）。

#### 隔離性 isolation：
執行多筆交易時能隔離交易中的資料不受其他交易影響。當一個  Transaction 在進行時，**它所用到的資料庫資料**，或是**產生的中間結果**不能讓其他 Transaction 影響(寫入）或使用，直到該 Transaction 結束為止（commit)。

#### 持久性 durability：
交易成功之後，寫入的資料會一直存在不會不見，交易過程不會變動原始資料。

參考資料：
- https://www.ithome.com.tw/news/92506
- https://ithelp.ithome.com.tw/articles/10187443
- http://karenten10-blog.logdown.com/posts/192629-database-transaction-1-acid
- https://retrydb.blogspot.com/2017/04/sql-server-acid.html
