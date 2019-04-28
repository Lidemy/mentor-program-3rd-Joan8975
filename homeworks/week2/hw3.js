function reverse(str) {
  const word = str.split('');
  let sum = '';
  let i;
  for (i = word.length - 1; i >= 0; i -= 1) {
    sum += word[i];
  }
  return sum;
}
reverse('hello');
