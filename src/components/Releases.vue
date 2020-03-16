<template>
  <section class="releases">
    <div class="release-art">
      <img 
        class="release-art-img"
        src="/img/releases/pebblebeach.jpg"
        alt="Pebble Beach album cover"
      >
    </div>
    <div class="release-info">
      <h1 class="release-title">
        pebble beach 
      </h1>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.releases {
  background-color: #828953;
}
.release-art {
  height: 100%;
  width: auto;
  border-style: dotted;
  border-width: 20px;
  border-color: #444444;
}
.release-art-img { 
  height: 100%;
  width: auto;
}
.release-info {
  margin: 50px;
  color: white;
  .release-title {
    font-size: 7em;
  }
}
</style>
