const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    const obj = JSON.parse(body);
    obj.forEach((item) => { console.log(`${item.id} ${item.name}`); });
  },
);
