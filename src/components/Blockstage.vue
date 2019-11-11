<template>
  <div ref="container">
    <v-stage :config="stageSize">
      <v-layer>
        <v-rect 
          :config="{
            x: tilePos(0).x,
            y: tilePos(0).y,
            width: tileSize.width,
            height: tileSize.height,
          }" 
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
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
      gridSize: 3,
      stageSize: {
        width: this.width,
        height: this.height
      },
      tileSize: {
        width: 0,
        height: 0
      },
      tiles: []
    }
  },
  mounted: function() {
    this.initTiles();
    window.addEventListener('resize', this.resizeStage)
    this.resizeStage();
  },
  methods: {
    initTiles: function () {
      this.tiles.clear();
      var tiles = this.gridSize * this.gridSize;
      for (var i=0; i<tiles; i++) {
        var y = 0
        var x = 0
        this.tiles.push({
          x: x * this.tileWidth(),
          y: y * this.tileWidth()
        })
      }
    },
    updateTilePos: function () {
      this.tiles.forEach((tile, index) => {
          
      })
    },
    tilePos : function (tile) {
      var y = Math.floor(tile / this.gridSize);
      var x = tile % this.gridSize;
      return {
        x: x,
        y: y
      };
    },
    resizeStage: function () {
      const container = this.$refs.container;
      if (!container) return;

      const width = container.offsetWidth;
      this.stageSize.width = width;
      this.updateSquare();
    },
    updateSquare: function () {
      this.tileSize.width = this.tileWidth();
      this.tileSize.height = this.tileWidth();
    },
    tileWidth: function() {
      if (this.stageSize.width < this.stageSize.height) {
        return this.stageSize.width / this.gridSize;
      } else {
        return this.stageSize.height / this.gridSize;
      }
    }
  }
}
</script>

<style>

</style>