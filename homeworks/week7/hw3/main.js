const calculator = document.querySelector('.calculator');
const display = document.querySelector('.cal_display');
const keys = document.querySelector('.cal_keys');
keys.addEventListener('click',
  (e) => {
    const { act: action } = e.target.dataset;
    const keycontent = e.target.innerText;
    const displaynum = display.innerText;
    const previousKey = calculator.dataset.previousKeyType;
    function answer(n1, operator, n2) {
      let result = '';
      if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
      } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2);
      } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
      } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
      }
      return result;
    }
    if (action === 'decimal') {
      calculator.dataset.previousKeyType = 'decimal';
      if (!displaynum.includes('.')) {
        display.innerText = `${displaynum}.`;
      } else if (previousKey === 'operateKey' || previousKey === 'calculate') {
        display.innerText = '0.';
      }
    }
    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
      calculator.dataset.previousKeyType = 'operateKey';
      calculator.dataset.first = displaynum;
      calculator.dataset.operate = action;
    }
    if (!action) {
      calculator.dataset.previousKeyType = 'number';
      if (displaynum === '0' || previousKey === 'operateKey' || previousKey === 'calculate') {
        display.innerText = keycontent;
      } else {
        display.innerText = displaynum + keycontent;
      }
    }
    if (action === 'calculate') {
      calculator.dataset.previousKeyType = 'calculate';
      let { first: firstValue } = calculator.dataset;
      const { operate: operator } = calculator.dataset;
      let secondValue = displaynum;
      if (firstValue) {
        if (previousKey === 'calculate') {
          firstValue = displaynum;
          secondValue = calculator.dataset.modValue;
        }
        display.innerText = answer(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
    }
    if (action === 'clear') {
      calculator.dataset.previousKeyType = 'clear';
      calculator.dataset.first = '';
      calculator.dataset.modValue = '';
      calculator.dataset.operate = '';
      calculator.dataset.previousKey = '';
      display.innerText = '0';
    }
  });
