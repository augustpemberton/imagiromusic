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
          v-for="tile in tiles"
          :key="'text-' + tile.x + tile.y"
          :config="{
            x: tile.x + (tileSize.width / 3),
            y: tile.y + (tileSize.width / 4),
            text: tile.text,
            fontSize: tileSize.width / 2,
            fontFamily: 'Lexend Deca',
            fill: 'black',
          }"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import State from '@/components/State.js';
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
    },
    initialTileLocations: {
      type: Array,
      default: () => [1,5,13]
    },
    initialPlayerLocation: {
      type: Number,
      default: 0
    },
    goalPositions: {
      type: Array,
      default: () => [1, 5, 9]
    }
  },
  data() {
    return {
      loaded: false,
      state: {}, 
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
      playerLocation: 9,
      tiles: []
    };
  },
  computed: {
    filledTiles: function () {
      var filledTiles = this.state.tiles.filter(tile => {
        return tile.tileNumber != -1
      });
      return filledTiles;
    }
  },
  mounted: function() {
    this.initTiles();
    this.updateState();

    window.addEventListener("resize", this.resizeStage);
    this.resizeStage();

    document.onkeydown = this.checkKey;
  },
  methods: {
    initTiles: function() {
      this.state = State.initState(this.gridSize, this.initialTileLocations, this.playerLocation);
      this.loaded = true;
    },
    updateState: function() {
      this.tiles = [];
      for (var i=0; i<this.state.tiles.length; i++) {
        var grid_y = Math.floor(i / this.gridSize);
        var grid_x = i % this.gridSize;
        var y =  grid_y * this.tileWidth() + this.gridPadding;
        var x =  grid_x * this.tileWidth()
                  + (this.stageSize.width/2)
                  - (this.tileWidth() * (this.gridSize / 2));
        var tile = {
          x: x,
          y: y,
          fill: this.fillColor(this.state.tiles[i].type),
          text: ''
        };
        if (this.state.tiles[i].type == tileType.TILE) {
          tile.text = this.state.tiles[i].tileNumber;
        }
        this.tiles.push(tile);
      }
    },
    resizeStage: function() {
      const container = this.$refs.container;
      if (!container) return;

      const width = container.offsetWidth;
      this.stageSize.width = width;

      this.tileSize.width = this.tileWidth();
      this.tileSize.height = this.tileWidth();
      this.updateTileSize();
      this.updateState();
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
      this.state = this.state.movePlayer(dir);
      this.updateState();
      this.checkGoal();
    },
    checkGoal: function() {
      var completed = true;
      for (var i=0; i<this.state.tiles.length; i++) {
        if (this.state.tiles[i].type != tileType.TILE) continue;

        if (this.goalPositions[this.state.tiles[i].tileNumber - 1] != i) {
          completed = false;
          break;
        }
      }
      if (completed) {
        alert("Complete!");
      }
    },
    fillColor: function(type) {
      var tileColors = {
        [tileType.TILE]: "green",
        [tileType.PLAYER]: "red",
        [tileType.EMPTY]: "white"
      }
      return tileColors[type];
    }
  }
};
</script>

<style>
</style>