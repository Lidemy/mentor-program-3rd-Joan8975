function printStars(n) {
  if (n >= 1 && n <= 30) {
    console.log(`${'*\n'.repeat(n - 1)}*`);
  }
}
printStars(5);
