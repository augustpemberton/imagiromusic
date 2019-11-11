<template>
  <section class="splash">
    <div class="splash-text animated fadeInUp">
      <h1>Blocksworld Tile Puzzle</h1>
      <h3>An AI Coursework Assignment</h3>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      show: true
    }
  }
}
</script>

<style lang="scss">
section.splash {
  padding: 20vh 10vw;
  color: white;
  background-color: $primary;
  h1 { font-size: 3.2vw; }
  h3 { font-size: 1.5vw; }
}
</style>
