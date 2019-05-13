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
  default:
}
