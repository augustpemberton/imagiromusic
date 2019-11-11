<template>
  <div class="main">
    <section class="splash">
      <div class="splash-text animated fadeInUp">
        <h1>Blocksworld Tile Puzzle</h1>
        <h3>An AI Coursework Assignment</h3>
      </div>
    </section>

    <section class="depth-first light">
      <b-container fluid>
        <h3>Blockstage</h3>

        <b-btn
          @click="DFS()"
        >
          DFS
        </b-btn>

        <blockstage 
          ref="blockstage"
          :height="600" 
          class="animated slideInLeft"
        /> 
      </b-container>
    </section>
  </div>
</template>

<script>
import DFS from '@/components/algorithms/DFS.js';
export default {
  data: function () {
    return {
      show: true
    }
  },
  methods: {
    DFS: function () {
      var a = new DFS();
      var moveSet = a.generateMoveSet();
      this.moveAlongSet(moveSet, 0);
    },
    moveAlongSet(moveSet, i) {
      if (i >= moveSet.length) return;
      this.$refs.blockstage.movePlayer(moveSet[i]);
      var vue = this;
      setTimeout(function () {vue.moveAlongSet(moveSet, i+1)}, 500);
    }
  }
}
</script>

<style lang="scss">
section {
  padding: 20px;
}
section.splash {
  padding: 20vh 10vw;
  color: white;
  background-color: $primary;
  h1 { font-size: 3.2vw; }
  h3 { font-size: 1.5vw; }
}
</style>
