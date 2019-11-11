<template>
  <div ref="container">
    <v-stage 
      v-if="loaded"
      :config="stageSize" 
    >
      <v-layer>
        <v-rect
          v-for="(tile, index) in tiles"
          :key="index"
          :config="{
            x: tiles[index].x,
            y: tiles[index].y,
            width: tileSize.width,
            height: tileSize.height,
            fill: tiles[index].fill,
            stroke: 'black',
            strokeWidth: gridStroke
          }"
        />
        <v-text
          v-for="(tile, index) in filledTiles"
          :key="filledTiles[index].tileNumber"
          :config="{
            x: (filledTiles[index].x + (tileSize.width / 4)),
            y: filledTiles[index].y,
            text: filledTiles[index].tileNumber,
            fontSize: tileSize.width / 2,
            fill: 'black'  
          }"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
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
export default {
  props: {
    width: {
      type: Number,
      default: window.innerWidth
    },
    height: {
      type: Number,
      default: window.innerHeight
    }
  },
  data() {
    return {
      loaded: false,
      gridSize: 4,
      gridPadding: 5,
      gridStroke: 5,
      stageSize: {
        width: this.width,
        height: this.height
      },
      tileSize: {
        width: 0,
        height: 0
      },
      initialTileLocations: [3,6,8],
      playerLocation: 0,
      tiles: [],
      tileColor: 'green',
      playerColor: 'red'
    };
  },
  computed: {
    filledTiles: function () {
      var filledTiles = this.tiles.filter(tile => {
        return tile.tileNumber != -1
      });
      return filledTiles;
    }
  },
  mounted: function() {
    this.initTiles();
    window.addEventListener("resize", this.resizeStage);
    this.resizeStage();
    document.onkeydown = this.checkKey;
  },
  methods: {
    initTiles: function() {
      var tiles = this.gridSize * this.gridSize;
      for (var i = 0; i < tiles; i++) {
        var tile = {
          x: 0,
          y: 0,
          fill: 'white',
          type: tileType.EMPTY,
          tileNumber: -1
        };
        for (var j=0;j < this.initialTileLocations.length; j++) {
          if (this.initialTileLocations[j] == i) {
            tile.type = tileType.tile;
            tile.fill = this.tileColor;
            tile.tileNumber = j + 1;
          }
        }
          
        if (i == this.playerLocation) {
          tile.tile = tileType.PLAYER;
          tile.fill = this.playerColor;
        }
        this.tiles.push(tile);
      }
      this.updateTilePos();
      this.loaded = true;
    },
    updateTilePos: function() {
      this.tiles.forEach((tile, index) => {
        var y = Math.floor(index / this.gridSize);
        var x = index % this.gridSize;
        this.tiles[index].y = (y * this.tileWidth()) + this.gridPadding;
        this.tiles[index].x =   x * this.tileWidth()
                                + (this.stageSize.width/2)
                                - (this.tileWidth() * (this.gridSize / 2));
      });
    },
    resizeStage: function() {
      const container = this.$refs.container;
      if (!container) return;

      const width = container.offsetWidth;
      this.stageSize.width = width;

      this.tileSize.width = this.tileWidth();
      this.tileSize.height = this.tileWidth();
      this.updateTileSize();
      this.updateTilePos();
    },
    updateTileSize: function() {
      this.tileSize.width = this.tileWidth();
      this.tileSize.height = this.tileWidth();
    },
    tileWidth: function() {
      if (this.stageSize.width < this.stageSize.height) {
        return (this.stageSize.width / this.gridSize) - this.gridPadding;
      } else {
        return (this.stageSize.height / this.gridSize) - this.gridPadding;
      }
    },
    checkKey: function (e) {
      e = e || window.event;
      if (e.keyCode == '38') {
        // up arrow
        e.preventDefault();
        this.movePlayer(direction.UP);
      }
      else if (e.keyCode == '40') {
        // down arrow
        e.preventDefault();
        this.movePlayer(direction.DOWN);
      }
      else if (e.keyCode == '37') {
        // left arrow
        e.preventDefault();
        this.movePlayer(direction.LEFT)
      }
      else if (e.keyCode == '39') {
        // right arrow
        e.preventDefault();
        this.movePlayer(direction.RIGHT);
      } 
    },
    movePlayer: function(dir) {
      var newPosition = 0;
      if (dir == direction.UP) {
        newPosition = this.playerLocation - this.gridSize
        if (newPosition < 0) return;

      } else if (dir == direction.DOWN) {
        newPosition = this.playerLocation + this.gridSize
        if (newPosition > (Math.pow(this.gridSize,2))) return;

      } else if (dir == direction.LEFT) {
        if (this.playerLocation % this.gridSize == 0) return;
        newPosition = this.playerLocation - 1;

      } else if (dir == direction.RIGHT) {
        if (this.playerLocation % this.gridSize == this.gridSize - 1) return;
        newPosition = this.playerLocation + 1;
      }

      this.tiles[this.playerLocation].type = this.tiles[newPosition].type;
      this.tiles[this.playerLocation].fill = this.tiles[newPosition].fill;
      this.tiles[this.playerLocation].tileNumber = this.tiles[newPosition].tileNumber;

      this.tiles[newPosition].type = tileType.PLAYER;
      this.tiles[newPosition].fill = this.playerColor;
      this.tiles[newPosition].tileNumber = -1;
      this.playerLocation = newPosition;
    }
  }
};
</script>

<style>
</style>