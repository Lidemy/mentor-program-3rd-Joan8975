function capitalize(str) {
  const first = str.slice(0, 1);
  const rest = str.slice(1);
  const uppercase = first.toUpperCase();
  return (uppercase + rest);
}
console.log(capitalize('hello'));
