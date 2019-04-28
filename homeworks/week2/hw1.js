function printStars(n) {
  const i = '*';
  if (n >= 1 && n <= 30) {
    console.log(`${i}\n`.repeat(n - 1) + i);
  }
}
printStars(5);
