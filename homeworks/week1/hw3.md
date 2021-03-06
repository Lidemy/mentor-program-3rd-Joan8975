## 教你朋友 CLI
### 什麼是 Command Line ?
Command line Interface，命令列介面，縮寫：CLI。先再順便介紹 Graphical User Interface, 圖形使用者介面，縮寫：GUI。兩者都是提供使用者命令電腦執行指令的介面，但從字面上可以很清楚看到差異，GUI 就是把使用者介面全部圖形化，可以看到送出的按鈕、菜單欄、對話框...等等，主要透過滑鼠作為輸入的工具，比較人性化 ; 而 CLI 則是通過鍵盤輸入字符指令，電腦接收到指令後，予以執行。
### 為什麼要使用 CLI?
GUI 介面看起來比較友善且直覺，為什麼還要另外記憶一些操作的指令去用 CLI 呢？ 其實最大的原因是因為 CLI 相較 GUI 更節約電腦系統的資源，再熟記指令的前提下，相對的操作上比較快，效率也比較高。舉個例子，如果現在需要計算機計算數字，在 GUI 操作必須先找到應用程式這個資料夾，接著滾動滑鼠找到計算機，點擊開啟 ; 但是在 CLI 介面下，只要輸入 bc 就可以開啟計算機了。這只是個簡單的例子，但若是需要執行大量且複雜的命令，使用 CLI 還是比較高效的！
### Command Line Tool 介紹
在 Mac 上只要搜尋 Terminal 終端機，打開這個應用程式就可以在上面輸入指令了。終端機本身通常不是一部電腦，它沒有運算能力，僅用來顯示資料及輸入資料。
### 常見的 CLI 基本指令
| 命令列指令 |   說明  |
| --------| -------- |
| pwd   | 	顯示目前目錄  |
| ls (list)  | 列出在目前目錄所有的檔案及目錄 | 
| ls -al      | 後面接的 -al 參數，a 是指連小數點開頭的檔案（例如.gitignore）也會顯示，<br>l 則是完整檔案的權限、擁有者以及建立、修改時間 | 
| cd (change directly)          | 切換目錄 | 
| cd ..          | 退回上一層目錄 | 
| clear          | 清除畫面內容 | 
| clear          | 清除畫面內容 | 
| man (manual)    | 使用手冊查詢，按" Q " 可離開  | 
| rm (remove)     | 刪除檔案  | 
| rm -r    | 刪除整個目錄，注意若該目錄內有檔案，不會顯示提示，直接全部刪掉  | 
| rmdir    | 刪除整個目錄, 若資料夾內有檔案則無法刪除  | 
| mkdir(make directory)    | 建立資料夾  | 
| mv(move)    | 移動檔案或重新命名。<br>當 B 是目錄時，`mv A B` 代表把 A 移動到 B 目錄裡面; <br>若 B 不是目錄， `mv A B` 代表把 A 重新命名為 B  | 
| cp(copy)          | 複製檔案 |
| cp -r A B          | 複製整個 A 目錄, 命名為 B |
| cat          | 快速查看文字檔內容 |
| grep         | 抓取關鍵字 |
| wget         | 下載檔案/原始碼。`wget 網址/圖片連結網址` 指把原始碼/圖片下載下來 |
| " > "| redirection, 重新導向 input/ output。<br>`ls -al > A` 指把這個目錄詳細內容都導向到 A 目錄裡面，注意會把 A 檔案內容覆蓋 |
| " >> "        | redirection, 重新導向 input/ output。<br>`ls -al >> A` 指把這個目錄的詳細內容都導向到 A 資料夾裡面 在 A 資料夾新增內容，不覆蓋 |
| " ｜ "  | pipe, 可以把左邊指令的輸出變成右邊指令的輸入。<br>`cat A ｜ grep 1`從顯示的 A 檔案內容中抓取關鍵字 "1" |

### 來試試執行你的需求吧！

> *我想用 command line 建立一個叫做 wifi 的資料夾*

打開終端機，輸入 `mkdir wifi` ，輸入後可以利用 ` ls` 指令來確認是否成功建立 wifi 這個資料夾。


> *並且在裡面建立一個叫 afu.js 的檔案*
> 
因為要在 wifi 這個資料夾裡面建立檔案，所以輸入`cd wifi ` 進入 wifi 這個資料夾內，若不確定自己是否成功進入，想確定現在所在的目錄位置，可以利用 `pwd`  確認。確認位置無誤就建立檔案了，輸入 `touch afu.js` 就成功啦！不放心嗎？ 不放心的話一樣可以利用 ` ls` 指令來把當前目錄的內容都列出做確認哦ヽ༼⊙ل͜⊙༽ﾉ
