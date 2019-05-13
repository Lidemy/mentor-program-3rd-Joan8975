const request = require('request');
const process = require('process');

switch (process.argv[2]) {
  case 'read':
    request(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      (error, response, body) => {
        const obj = JSON.parse(body);
        console.log(obj.name);
      });
    break;
  case 'list':
    request('https://lidemy-book-store.herokuapp.com/books?_limit=20',
      (error, response, body) => {
        const obj = JSON.parse(body);
        obj.forEach(
          (item) => {
            console.log(item.id, item.name);
          },
        );
      });
    break;
  case 'create':
    request.post({
      url: 'https://lidemy-book-store.herokuapp.com/books/',
      form: {
        name: process.argv[3],
      },
    },
    (error, response) => {
      if (error === null && response.statusCode === 201) {
        console.log('資料成功新增');
      } else {
        console.log(`呼叫 API 時發生錯誤！狀態碼：${response.statusCode}, 錯誤訊息：${error}`);
      }
    });
    break;
  case 'delete':
    request.delete(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      (error, response) => {
        if (error === null && response.statusCode === 200) {
          console.log('資料成功刪除');
        } else {
          console.log(`呼叫 API 時發生錯誤！狀態碼：${response.statusCode}, 錯誤訊息：${error}`);
        }
      });
    break;
  case 'update':
    request.patch({
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: {
        name: process.argv[4],
      },
    },
    (error, response) => {
      if (error === null && response.statusCode === 200) {
        console.log('資料成功修改');
      } else {
        console.log(`呼叫 API 時發生錯誤！狀態碼：${response.statusCode}, 錯誤訊息：${error}`);
      }
    });
    break;
  default:
}
