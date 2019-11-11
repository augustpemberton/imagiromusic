var direction = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
}
export default class DFS{
  constructor(startState, goalState) {
    this.startState = startState;
    this.goalState = goalState;
  }
  generateMoveSet() {
    
    return [direction.DOWN, direction.LEFT, direction.UP, direction.RIGHT];
  }
}