export default class Node {
  constructor (state, parent, lastMove) {
    this.state = state
    this.parent = parent
    this.explored = false
    this.lastMove = lastMove;
  }

  children () {
    var children = [];
    for (var i=0; i<4; i++) {
      children.push(new Node(
        this.state.movePlayer(i),
        this,
        i
      ))
    }
    return children;
  }
}