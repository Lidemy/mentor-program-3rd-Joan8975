## 交作業流程
### 將它人 Github repository 連結到自己建立的 local repository
1. 點邀請連結，複製給的 Github repository 連結（若不是邀請協作則 fork ）
1. Clone with HTTPS 複製連結
3. `git clone 連結`
4. `npm install`  // 安裝必備東西
### local 端準備
5. `git branch week1`  // 開一個新的 branch 叫 week1 
1. `git checkout week1` // 切換到 week 1 上
1. 做作業
1. `git commit -am "message"` // 把作業 add 並且同時 commit 到 local repository上
### 推到 Github 上
9. `git push origin week1` // push 新的 branch 到 github 上面
### 提出 merge 到 master 的請求
10. 確定繳交本週所有作業後在 Github 上點擊 Compare & pull request
1. 進入 open a pull request 頁面後，輸入標題以及心得或問題，按下 Create pull request 按鈕。送出後複製該頁面連結
### 發 issue 請老師來幫我看作業並 merge
12. 到第三期交作業專用的 repository (homeworks-3rd), 進 issue 裡面建立 New issue
1. 輸入標題以及內容，標題有規範 [Week1] ，內容填寫剛剛複製的 pull request 連結，最後 Submit new issue
### 檔案被 merge 後執行以下 
14. 到本地端上執行 `git checkout master` // 切換到 master
1. `git pull origin master` // 把老師 merge 好的 master 拉下來
1. `git branch -d week1` // 把原本之前的 branch week1 刪掉
1. 如果看到老師 close issue 就代表作業 ok;  如果老師覺得要修改，一樣執行 14~16，再另開一個 branch 從 5 開始再執行一次
