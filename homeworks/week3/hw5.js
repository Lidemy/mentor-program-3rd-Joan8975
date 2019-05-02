function add(a, b) {
  const x = a.split('').reverse();
  const y = b.split('').reverse();
  if (a.length < b.length) {
    for (let i = 0; i < b.length - a.length; i += 1) {
      x.push('0');
    }
  } else {
    for (let i = 0; i < a.length - b.length; i += 1) {
      y.push('0');
    }
  }
  x.push('0');
  y.push('0');
  const result = [];
  for (let i = 0; i < y.length; i += 1) {
    if (result[i - 1] >= 10) {
      result[i] = Number(x[i]) + Number(y[i]) + 1;
      result[i - 1] %= 10;
    } else {
      result[i] = Number(x[i]) + Number(y[i]);
    }
  }
  if (result[y.length - 1] === 0) {
    result.splice(y.length - 1, 1);
  }
  return result.reverse().join('');
}
module.exports = add;
