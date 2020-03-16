<template>
  <section class="releases">
    <b-container fluid>
      <b-row style="height: 100%; padding: 0px">
        <b-col>
          <div class="release-type">
            single out now
          </div>
          <div class="release-info">
            <h1 class="release-title">
              pebble beach 
            </h1>
            <br>
            <player track-url="https://soundcloud.com/hipdozer/imagiro-pebble-beach" />
          </div>
        </b-col>
        <b-col style="padding: 0px">
          <div class="release-art">
            <!--<b-img 
              class="release-art-img"
              src="/img/releases/pebblebeach.jpg"
              alt="Pebble Beach album cover"
              fluid
            />-->
            <div class="release-art-imgb" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  methods: {
    releaseScene() {
      const scene = new this.$scrollmagic.Scene({
        triggerElement: '.release-info',
        triggerHook: 'onEnter',
        duration: '200%'
      })
      .on('enter', () => {
        console.log("enter!");
      })
      .setPin('.releases')

      this.$ksvuescr.$emit('addScene', 'releaseScene', scene)
    }
  }
}
</script>

<style lang="scss" scoped>
.releases {
  background-color: #828953;
}
.release-type {
  position:absolute;
  top: 2%;
  left: 10%;
  color: black;
  font-size: 5em;
}
.release-art {
  height: 100%;
  width: auto;
  /*border-style: dotted;
  border-width: 20px;
  border-color: #444444;*/
}
.release-art-img { 
  height: 100%;
  width: auto;
}
.release-art-imgb {
  background-image: url('/img/releases/pebblebeach.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
.release-info {
  margin: 150px 10px 10px 10px;
  color: white;
  .release-title {
    font-size: 19em;
    letter-spacing: -20px;
    line-height: 110%;
  }
}
</style>
