
import Node from './Node.js'

export default class BFS {
  constructor(startState, goalPositions) {
    this.startState = startState;
    this.goalPositions = goalPositions;
    this.startNode = new Node(startState, null, null);
    this.queue = [];
  }
  generateMoveSet() {
    return this.run_BFS(this.startNode, []);
  }

  run_BFS_r(node, queue) {
    if (node.state.checkCompleted(this.goalPositions)) {
      console.log("done");
      // find path through parents

      return;
    }

    node.children().forEach(node => {
      queue.push(node);
    })

    this.run_BFS_r(queue.shift(), queue);
  }

  run_BFS(initialNode) {
    var queue = [initialNode];
    var complete = false;
    var moves = [];
    while (!complete) {
      var node = queue.shift();
      console.log(node);
      if (node.state.checkCompleted(this.goalPositions)) {
        console.log("complete");
        var top = false;
        var checkNode = node;
        while (!top) {
          console.log(checkNode.lastMove);
          if (checkNode.lastMove == null) {
            top = true;
          } else {
            moves.unshift(checkNode.lastMove);
            checkNode = checkNode.parent;
          }
        }        
        complete = true;
      }
      node.explored = true;

      node.children().forEach(node => {
        queue.push(node);
      })
    }

    return moves;
  }

}