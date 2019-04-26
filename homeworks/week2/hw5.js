function join(arr, concatStr) {
  const last = arr[arr.length - 1];
  let sum = '';
  for (let i = 0; i < arr.length - 1; i += 1) {
    sum += arr[i].concat(concatStr);
  }
  return (sum + last);
}
function repeat(str, times) {
  let sum = '';
  for (let i = 0; i <= times; i += 1) {
    sum += str;
  }
  return sum;
}
console.log(join(['a', 'b', 'c'], '!'));
console.log(repeat('A', 5));
