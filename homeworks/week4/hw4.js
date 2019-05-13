const request = require('request');

request.get({
  url: 'https://api.twitch.tv/helix/games/top',
  headers: {
    'Client-ID': 'fflq7gcz8kuhzd8lli5om4hqvhypnj',
  },
},
(error, response, body) => {
  const obj = JSON.parse(body);
  for (let i = 0; i < obj.data.length; i += 1) {
    console.log(`${obj.data[i].id} ${obj.data[i].name}`);
  }
});
