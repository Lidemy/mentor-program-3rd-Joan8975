const request = new XMLHttpRequest();
const container = document.querySelector('.comment_group');
const submitBtn = document.querySelector('button');
const messageTxt = document.querySelector('.message_txt');
request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const res = request.response;
    const json = JSON.parse(res);

    for (let i = 0; i < json.length; i += 1) {
      const item = document.createElement('div');
      item.classList.add('comment');
      item.innerHTML = `
      <p class="floor">${json[i].id}樓</p>
      <p class="text">${json[i].content}</p>
      `;
      container.appendChild(item);
    }
  } else {
    console.log('err');
  }
};

request.onerror = () => {
  console.log('error');
};
request.open('GET', 'https://lidemy-book-store.herokuapp.com/posts?_limit=20&_sort=id&_order=desc', true);
request.send();
submitBtn.addEventListener('click', () => {
  request.open('POST', 'https://lidemy-book-store.herokuapp.com/posts', true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(`content=${messageTxt.value}`);
  request.onerror = () => {
    alert('error');
  };
});
