## 跟你朋友介紹 Git
## Git 的基本概念
最常聽到對 Git 的解釋都是「Git 就是拿來做版本控制的阿」，但是其實也可以用最傳統的方式做版本控制，例如不斷複製資料夾，每個資料夾以不同日期命名，就可以知道不一樣的版本，但是當檔案版本多的時候，被些備份資料所佔的空間是很驚人的，再來時間一久，你還記得 2019-02-28 和 2019-04-27 這兩個版本間差異是什麼嗎？最可怕的是，在共同協作時，其他工程師堅稱是你改把檔案改壞了，沒有記錄可能就只能背黑鍋了，而 Git 可以幫你解決了這些問題。

對很多人來說 Git 最大的優點是它屬於「分散式版控系統」。傳統的集中式版控系統把版本庫集中存放在中央伺服器上，每個開發者如果想要更新都要透過網路連到伺服器才能進行; 而 Git 讓**每個人都有一份完整的本地端儲存庫**，所以每次提交版本變更時，都可以先提交到自己本地的儲存庫，不需透過網路連線，等到需要同步到遠端儲存庫時，再使用網路推(push 指令)到遠端伺服器如 GitHub 上。由於大部分的操作都可在本地端執行，如此一來可大幅省下網路延遲的成本，節省開發時間。

為了減少佔用的磁碟空間，Git 不像其他大部分版控系統保存資料前後變化的差異數據，而是為當時的專案資料建立快照（Snapshot），為什麼叫快照呢? 又是什麼意思？其實跟 Git 的物件結構有關。

當我們每次更新檔案後，執行 ` git add .` 就會產生叫 blob 的物件，同時也會幫這個 blob hash 一串 id, 而這個物件就是更動的檔案內容（不包含檔名）。而每次 ` git commit` 會產出兩個資料夾，一個稱為 tree 物件，內容包含先前  ` git add .`  的 blob 物件以及檔名; 另一個稱為 commit 物件，內容包含剛剛那個 tree 物件以及上個版本 commit 的物件，不論是 commit 物件、 tree 物件 還是 blob 物件都會生成一串自己的 id。當需要找回過去版本時，只要輸入那個版本的 commit hash id，就可以在裡面找出其他 hash id（tree > blob），最後找出對應的內容來顯示。

還是覺得抽象的話請看下列敘述：

>想象一下，給一張桌子拍一張照片，紀錄了桌子上所有物品的位置、狀態，這樣就可以稱之為快照了。 
我們不必存儲所有的物品，只需存儲這個照片就可以了，下一次想恢覆以前的狀態的時候，只需要翻出當時的那張照片，再把物品按照那張照片裏的位置擺放一下就OK了。
> 
" 下一次想恢覆以前的狀態的時候，只需要翻出當時的那張照片 " 可以想像是輸入以前版本的 commit hash id，" 再把物品按照那張照片裏的位置擺放一下就OK了 " 不就是在 commit 物件裡面找到其他物件的 hash id，進而顯示對應的內容嗎？這樣似乎比較好理解"快照"這個說法了。

如果專案內沒有變更的檔案就不會多儲存一份來佔用磁碟空間（不產生新的 hash id ），開發者開啟新版本存取這個檔案時，還是找到原本的 hash id 打開先前的舊版檔案，而不是開啟內容相同的新副本。這個物件結構的特性還有很多優點，有興趣的話可以[來這裡看看](https://github.com/doggy8088/Learn-Git-in-30-days/blob/master/zh-tw/06.md) ，這個特性讓 Git 在所有版控系統中脫穎而出啊！

## Git 的基礎指令使用
### 1. git init
了解 Git 的一些基本特性後，我們來熟悉 Git 的工作流程吧，首先要建立開發專案（包括建立工作區和版本庫），工作區就是你電腦裡的目錄，若你要把當前目錄做版本控制，就要使用 `git init` 指令建立一個這個專案的版本庫（Repository ）。關係如下圖：<br>
![](https://i.imgur.com/EW1ynYS.jpg)

### 2. git status
上面的關係圖可以很清楚顯示什麼區域存放什麼檔案，但是 Git 並不會有這樣的 GUI 來告訴你這些，這時你就可以透過` git status ` 這個指令來顯示 **stage** 與 **當前head** 之間檔案的狀態，而 git 內存在以下四種檔案狀態:

* **Untracked files**
該檔案尚未被追蹤，代表著它還存放在工作區內，尚未加入 stage ，即使你 commit 也無法把檔案移到 master 裡面，這時要使用 `git add` 指令把檔案加入 stage 追蹤。
```
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

	a.txt

nothing added to commit but untracked files present (use "git add" to track)
```
* **Modified files**
檔案已修改，狀態顯示 Changes not staged for commit，代表該檔案可能之前已經加入 stage 或 master，但是只要有修改就會告知需要重新 `git add` 把檔案加入 stage 。 

```
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   a.txt
```

* **Unmodified files／Commited files**
所有檔案都 commited，檔案內容沒做任何修改，檔案內容都與 master 內容一致的狀態。
```
$ git status
On branch master
nothing to commit, working tree clean
```
* **Staged files**
檔案已加入 stage 但是尚未 commit 到 master 上，狀態顯示 Changes to be committed，下方程式碼裡的 'new file' 代表它是已加入追蹤的新檔案，被標示可 commit 了 。這時候輸入 `git commit` 指令就可以把檔案加入 master 存入下一個版本。
```
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   a.txt
```
**四種檔案狀態之間的關係：**
<br>
![](https://i.imgur.com/P56941o.png)

### 3.git add
把檔案從工作區添加到 stage 裡。當之後 commit 時，會默認檢查 stage ，所以 ` git add ` 是用來確定下一次 commit 時快照的樣子。

### 4.git commit
執行 ` git commit ` 這個指令的時候會把所有通過 `git add` 存入的檔案建立一個快照存入 master 裡面。


### 5. .gitignore
一般通常都會有一些檔案不需要放進 Git 版本控制，但是又不想要看到它一直被顯示 Untracked files，這個時候可以建立名為 .gitignore 的檔案 （`touch .gitignore`），進入 vim 編輯器把不要加入版控的檔案名稱寫入（` vim .gitignore`）。

### 6.git diff
修改後還沒 add 之前，可以用這個指令查看和原本已經 add 的那個檔案的差異（查看一個檔案在工作區與 stage 裡面的差異）。 

## Git 與 GitHub 
剛剛都是介紹 Git 與本地端 repository 的概念與指令，其實有許多網路上的服務支援 Git 的版本管理系統，還提供遠端 repository 可以使用，如 GitHub, Bitbucket…等等。接下來教你怎麼把你的笑話同步儲存到 GitHub 遠端 repository 上吧～
1. 首先在 GitHub 上建立 New repository，填寫名稱後送出。
2. 由於你已經建立好本地的 repository 了，接下來只需要和遠端的 repository 做連結就好，打開 terminal，進入 git 的資料夾，輸入 ` git remote add origin git@github.com:kaochenlong/practice-git.git`
3. 這時已經設定好遠端成節點，接下來，就是要把東西推上去了，輸入 ` git push origin master` 就成功啦！ 
4. 如果你今天在 GitHub 上更新了你的笑話，記得要 先在 terminal 輸入 `git pull origin master`，把上面的內容同步更新到本地端哦！

打到這裡，本宮乏了，下面參考資料你悠著點看，拿到笑話冠軍記得請我吃頓飯哈！


## 參考資料
[30 天精通 Git 版本控管](https://blog.miniasp.com/post/2013/11/03/Learning-Git-Part-2-Master-Git-in-30-days)
[Git-Book](https://git-scm.com/book/en/v2)
[廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013745374151782eb658c5a5ca454eaa451661275886c6000)
[為你自己學 Git ](https://gitbook.tw/)


