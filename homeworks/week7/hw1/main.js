const start = new Date();
const myVar = setTimeout(() => { document.querySelector('body').classList.add('turn'); }, 2000);
function count() {
  const end = new Date();
  const len = (end.getTime() - start.getTime()) / 1000;
  if (len - 2 < 0) {
    alert('還沒變色哦，失敗');
    clearTimeout(myVar);
  } else if (len > 0) {
    alert(`你的成績：${len - 2}秒`);
  }
  const again = document.createElement('button');
  again.innerText = '再試一次';
  document.querySelector('h2').appendChild(again);
  document.querySelector('button').addEventListener('click',
    () => {
      document.location.reload();
    });
  document.querySelector('body').removeEventListener('click', count, false);
}
document.querySelector('body').addEventListener('click', count, false);
