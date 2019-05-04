function isPalindromes(str) {
  const arr = str.split('');
  const reverse = str.split('').reverse();
  for (let i = 0; i < str.length; i += 1) {
    if (arr[i] === reverse[i]) {
      return true;
    }
  }
  return false;
}
module.exports = isPalindromes;
