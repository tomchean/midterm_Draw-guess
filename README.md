Draw & Guess
---
一句話描述這個 project 在做什麼: 使用react與socket.io實作你畫我猜
---
Deployed 連結 : https://mydraw-something.herokuapp.com 
---
使用/操作方式:
>clone後,輸入npm install,再npm start 或是node server.js 在瀏覽器輸入localhost:3000 即可.
>預設進入的介面為登入介面,輸入名字後會進入遊戲房間,在房間內每個使用者會有兩種模式,第一種是畫家（在介面左下角名稱前面會有特殊符號）,畫家首先需要更新題目答案,當送出答案時,所有使用者會開始倒數60秒,畫家可以在這60秒內依據自訂題目作畫,且可以在聊天室輸入提示,另外畫家可以調整筆劃大小,顏色,畫錯時可以清除.第二種為猜題者,猜題者根據畫家猜題,假設猜錯會顯示在聊天室裡,猜對分數會增加,模式轉換的時機為60秒結束或是全部的猜題者都答對.
---
使用與參考之框架/模組/原始碼:
>參考github：https://github.com/open-canvas-ui/canvas2dDraw 此repo完成處理單機的canvas做圖,我以此repo為起始,利用socket.io 完成同步繪畫以及使用者登入的介面及router處理
---
心得