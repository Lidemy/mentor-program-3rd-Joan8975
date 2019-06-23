const request = new XMLHttpRequest();
const container = document.querySelector('body');
const click = document.querySelector('.click_btn');
const again = document.querySelector('.contain');

function luckyDraw() {
  click.style.display = 'none';
  const refresh = document.createElement('div');
  refresh.classList.add('again_btn');
  refresh.innerText = '再抽一次';

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const resp = request.response;
      const json = JSON.parse(resp);
      const outcome = json.prize;
      console.log(outcome);
      if (outcome === 'FIRST') {
        const item = document.createElement('div');
        item.classList.add('ticket');
        item.innerHTML = `
        <div class="wrap">
          <embed src="ap.svg" type="image/svg+xml" />
          <p><span>頭獎</span><br>日本東京來回雙人遊</p>
          <p class= title>恭喜你中頭獎了！日本東京來回雙人遊!</p>
        </div>
        `;
        container.appendChild(item);
        container.classList.add('first_bg');
      } else if (outcome === 'SECOND') {
        const item = document.createElement('div');
        item.classList.add('ticket');
        item.innerHTML = `
        <div class="wrap">
          <embed src="tv.svg" type="image/svg+xml" />
          <p><span>二獎</span><br> 90 吋電視一台！</p>
          <p class= title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二獎！90 吋電視一台！</p>
        </div>
        `;
        container.appendChild(item);
        container.classList.add('second_bg');
      } else if (outcome === 'THIRD') {
        const item = document.createElement('div');
        item.classList.add('ticket');
        item.innerHTML = `
        <div class="wrap">
        <embed src="yt.svg" type="image/svg+xml" />
        <p><span>三獎</span><br>知名 YouTuber 簽名<br>握手會入場券一張</p>
        <p class= title>恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！</p>
        </div>
        `;
        container.appendChild(item);
        container.classList.add('third_bg');
      } else if (outcome === 'NONE') {
        const item = document.createElement('a');
        item.classList.add('none_wrap');
        item.innerHTML = `
        <p class = 'none_title'>銘謝惠顧</p>
        `;
        container.appendChild(item);
        container.classList.add('none_bg');
      } else {
        alert('系統不穩定，請再試一次');
        document.location.reload();
      }
    } else {
      alert('系統不穩定，請再試一次');
      document.location.reload();
    }
  };
  request.onerror = () => {
    alert('系統不穩定，請再試一次');
    document.location.reload();
  };
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
  request.send();
  click.removeEventListener('click', luckyDraw, false);
  again.appendChild(refresh);
  document.querySelector('.again_btn').addEventListener('click', () => {
    document.location.reload();
  });
}
click.addEventListener('click', luckyDraw, false);
