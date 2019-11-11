var tileType = {
  EMPTY: 0,
  TILE: 1,
  PLAYER: 2
};
var direction = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
}
export default class State {

  static initState(gridSize, tileLocations, playerLocation) {
    var numTiles = gridSize * gridSize;
    var tiles = [];
    for (var i = 0; i < numTiles; i++) {
      var tile = {
        x: 0,
        y: 0,
        type: tileType.EMPTY,
        tileNumber: -1
      };

      // set tiles
      for (var j=0;j < tileLocations.length; j++) {
        if (tileLocations[j] == i) {
          tile.type = tileType.TILE;
          tile.tileNumber = j + 1;
        }
      }

      // set player
      if (i == playerLocation) {
        tile.type = tileType.PLAYER;
      }
      tiles.push(tile);
    }
    return new State(tiles, gridSize, playerLocation);
  }

  constructor (tiles, gridSize, playerLocation) {
    this.tiles = tiles;
    this.gridSize = gridSize;
    this.playerLocation = playerLocation;
  }

  movePlayer (dir) {
    var newPosition = 0;
    var canMove = true;
    if (dir == direction.UP)
    {
      newPosition = this.playerLocation - this.gridSize
      if (newPosition < 0) canMove = false;
    }
    else if (dir == direction.DOWN)
    {
      newPosition = this.playerLocation + this.gridSize
      if (newPosition > (Math.pow(this.gridSize,2) - 1)) canMove = false;
    }
    else if (dir == direction.LEFT)
    { 
      if (this.playerLocation % this.gridSize == 0) canMove = false;
      newPosition = this.playerLocation - 1;
    }
    else if (dir == direction.RIGHT)
    {
      if (this.playerLocation % this.gridSize == this.gridSize - 1) canMove = false;
      newPosition = this.playerLocation + 1;
    }

    if (!canMove) return this;
    var newTiles = JSON.parse(JSON.stringify(this.tiles));

    newTiles[this.playerLocation].type = newTiles[newPosition].type;
    newTiles[this.playerLocation].fill = newTiles[newPosition].fill;
    newTiles[this.playerLocation].tileNumber = newTiles[newPosition].tileNumber;

    newTiles[newPosition].type = tileType.PLAYER;
    newTiles[newPosition].fill = this.playerColor;
    newTiles[newPosition].tileNumber = -1;

    return new State(newTiles, this.gridSize, newPosition);
  }

  checkCompleted (goalPositions) {
    var completed = true;
    for (var i=0; i<this.tiles.length; i++) {
      if (this.tiles[i].type != tileType.TILE) continue;

      if (goalPositions[this.tiles[i].tileNumber - 1] != i) {
        completed = false;
        break;
      }
    }
    return completed;
  }
}
