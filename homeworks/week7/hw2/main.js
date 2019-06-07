document.querySelector('.btn_submit').addEventListener('click',
  (e) => {
    const input1 = document.querySelectorAll('.required');
    const input2 = document.querySelectorAll('input[name=radio]');
    const wrapper = document.querySelectorAll('.wrapper');
    const input3 = document.querySelectorAll('input');

    for (let j = 0; j < input1.length; j += 1) {
      if (input1[j].value.length === 0) {
        const item = document.createElement('div');
        item.classList.add('require');
        wrapper[j].appendChild(item.cloneNode(true));
        if (wrapper[j].querySelector('.require').innerText === '') {
          wrapper[j].querySelector('.require').innerText = '這是必填問題';
          wrapper[j].classList.add('err_bg');
          input1[j].setAttribute('class', 'line');
          e.preventDefault();
        } else {
          e.preventDefault();
        }
      }
    }
    if (!input2[0].checked && !input2[1].checked) {
      const item = document.createElement('div');
      document.querySelector('.program').appendChild(item);
      item.classList.add('require');
      if (document.querySelector('.program div').innerText === '') {
        document.querySelector('.program div').innerText = '這是必填問題';
        document.querySelector('.program').classList.add('err_bg');
        e.preventDefault();
      } else {
        e.preventDefault();
      }
    } else if (input3[0].value.length !== 0 && input3[0].checkValidity() === true
      && input3[1].value.length !== 0
      && input3[4].value.length !== 0
      && input3[5].value.length !== 0) {
      console.log(input3[0].value);
      console.log(input3[1].value);
      for (let i = 0; i < input2.length; i += 1) {
        if (input2[i].checked) {
          console.log(input2[i].value);
        }
      }
      console.log(input3[4].value);
      console.log(input3[5].value);
      alert('成功送出！');
      document.location.reload();
    } else {
      e.preventDefault();
    }
  });
