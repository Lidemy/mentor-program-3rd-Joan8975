``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 執行 isValid 函式，把 [3, 5, 8, 13, 22, 35] 帶入 arr
2. 執行第 2 行，設定變數 i 是 0，檢查 0 是否 < 6，是，繼續執行
3. 執行第 3 行，判斷 arr[0], 也就是 3 是否 <= 0，否，結束第一次迴圈
4. 返迴第 2 行，i++，i 變成 1，檢查 1 是否 < 6，是，繼續執行
5. 執行第 3 行，判斷 arr[1], 也就是 5 是否 <= 0，否，結束第二次迴圈
6. 返迴第 2 行，i++，i 變成 2，檢查 2 是否 < 6，是，繼續執行
7. 執行第 3 行，判斷 arr[2], 也就是 8 是否 <= 0，否，結束第三次迴圈
8. 返迴第 2 行，i++，i 變成 3，檢查 3 是否 < 6，是，繼續執行
9. 執行第 3 行，判斷 arr[3], 也就是 13 是否 <= 0，否，結束第四次迴圈
10. 返迴第 2 行，i++，i 變成 4，檢查 4 是否 < 6，是，繼續執行
11. 執行第 3 行，判斷 arr[4], 也就是 22 是否 <= 0，否，結束第五次迴圈
12. 返迴第 2 行，i++，i 變成 5，檢查 5 是否 < 6，是，繼續執行
13. 執行第 3 行，判斷 arr[5], 也就是 35 是否 <= 0，否，結束第六次迴圈
14. 返迴第 2 行，i++，i 變成 6，檢查 6 是否 < 6，否，跳出該迴圈
15. 執行第 5 行，設定變數 i 是 2，檢查 2 是否 < 6，是，繼續執行
16. 執行第 6 行，判斷 arr[2] !== arr[1] + arr[0], 也就是 8 !== 5 + 3 ，否，結束第一次迴圈
17. 返迴第 5 行，i++，i 變成 3，檢查 3 是否 < 6，是，繼續執行
18. 執行第 6 行，判斷 arr[3] !== arr[2] + arr[1], 也就是 13 !== 8 + 5 ，否，結束第二次迴圈
19. 返迴第 5 行，i++，i 變成 4，檢查 4 是否 < 6，是，繼續執行
20. 執行第 6 行，判斷 arr[4] !== arr[3] + arr[2], 也就是 22 !== 13 + 8 ，是，回傳'invalid'
21. isValid 函式執行結束