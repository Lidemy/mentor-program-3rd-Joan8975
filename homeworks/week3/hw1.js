function stars(n) {
  const result = [];
  let sum = '';
  for (let i = 1; i < n + 1; i += 1) {
    sum += '*';
    result.push(sum);
  }
  return result;
}
module.exports = stars;
