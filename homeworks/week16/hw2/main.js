function Stack() {
  const list = [];
  this.push = (n) => {
    list.splice(list.length, 0, n);
  };
  this.pop = () => {
    const value = list[list.length - 1];
    list.splice(list.length - 1, 1);
    return value;
  };
}
function Queue() {
  const list = [];
  this.push = (n) => {
    list.splice(list.length, 0, n);
  };
  this.pop = () => {
    const value = list[0];
    list.splice(0, 1);
    return value;
  };
}

const stack = new Stack();
stack.push(10);
stack.push(5);
console.log(stack.pop());// 5
console.log(stack.pop());// 10

const queue = new Queue();
queue.push(1);
queue.push(2);
console.log(queue.pop());// 1
console.log(queue.pop());// 2
