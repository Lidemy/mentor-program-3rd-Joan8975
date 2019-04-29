function alphaSwap(str) {
  let sum = '';
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === str[i].toLowerCase()) {
      sum += str[i].toUpperCase();
    } else {
      sum += str[i].toLowerCase();
    }
  }
  return sum;
}
module.exports = alphaSwap;
