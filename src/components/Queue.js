export default class Queue {
  constructor () {
    this.pointer = 0;
    this.array = [];
  }

  push (state) {
    this.array.push(state);
    this.pointer++;
  }

  pop () {
    this.pointer--;
    return this.array.pop();
  }
}