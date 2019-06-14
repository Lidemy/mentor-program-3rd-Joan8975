const request = new XMLHttpRequest();
const container = document.querySelector('.container');
request.onload = () => {
  const res = request.response;
  const json = JSON.parse(res);
  const str = json.streams;
  if (request.status >= 200 && request.status < 400) {
    for (let i = 0; i < 20; i += 1) {
      const previewImg = str[i].preview.large;
      const contentLogo = str[i].channel.logo;
      const contentStatus = str[i].channel.status;
      const contentName = str[i].channel.display_name;
      const content = document.createElement('div');
      content.classList.add('item');
      content.innerHTML = `
      <img class= preview src="${previewImg}">
      <div class="info">
        <img class= logo src="${contentLogo}">
        <p>${contentStatus}</p>
        <p>${contentName}</p>
        <div class="clearfix"></div> 
      </div>
      `;
      container.appendChild(content);
    }
  } else {
    console.log('err');
  }
};
request.onerror = () => {
  console.log('error');
};
request.open('GET', 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends', true);
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
request.setRequestHeader('Client-ID', 'fflq7gcz8kuhzd8lli5om4hqvhypnj');
request.send();
