<template>
  <div 
    ref="pin" 
    class="pin-container" 
  >
    <splash class="panel panel-0" />
    <until-im-home 
      class="panel panel-2" 
      title="until i'm home"
      soundcloud="https://soundcloud.com/wearestereofox/imagiro-until-im-home"
      url="https://fanlink.to/imagiro-home"
      artwork="img/releases/untilimhome.jpg"
    />
    <pebble-beach 
      class="panel panel-1" 
      title="pebble beach"
      soundcloud="https://soundcloud.com/hipdozer/imagiro-pebble-beach"
      url="https://imagiro.fanlink.to/pebblebeach"
      artwork="img/releases/pebblebeach.jpg"
    />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(this.pinContainerScene)
    this.promptScroll()
    //tl.fromTo('.subtitle', 0.5, {height: '1.2em'}, {height: '7em', ease: 'Power3.easeOut'}, 0);
    window.$('.subtitle').css('display', 'hidden');
    setTimeout(function() {
      window.$('.subtitle').css('display', 'block');
      window.$('.subtitle').css('height', '7em');
    }, 3000);
  },
  destroyed() {
    this.$ksvuescr.$emit('destroy')
  },
  methods: {
    pinContainerScene() {
      const tl = new this.$gsap.TimelineMax()
      tl.fromTo('.panel-2', 0.8, {y: '100%'}, {x: '0%', y: '0%', ease: 'Power1.easeOut'}, 0)
      tl.fromTo('.release-art-img-2', 1, {width: '0%', height: '0%'}, {width: '100%', height: '100%', ease: 'Power2.easeOut'}, 0.6);
      tl.fromTo('.play-icon-2', 0.2, {color: '#828953;'}, {color: '#FFFFFF', ease: 'Power3.easeOut'}, 0.9);

      tl.fromTo('.panel-1', 0.8, {y: '100%'}, {x: '0%', y: '0%', ease: 'Power1.easeInOut'}, 1.3)
      tl.fromTo('.release-art-img-1', 1, {width: '0%', height: '0%'}, {width: '100%', height: '100%', ease: 'Power2.easeOut'}, 1.9);
      tl.fromTo('.play-icon-1', 0.2, {color: '#C2CCEF;'}, {color: '#FFFFFF', ease: 'Power3.easeOut'}, 2.8);

      const scene = new this.$scrollmagic.Scene({
        triggerElement: '.pin-container',
        triggerHook: 'onLeave',
        duration: '300%'
      })
      .setPin('.pin-container')
      .setTween(tl)

      this.$ksvuescr.$emit('addScene', 'pinContainerScene', scene)
    },
    promptScroll() {
      setTimeout(function(){
        if (window.$('html, body').scrollTop() == 0){
          window.$('html, body').animate({
            scrollTop: 70
          }, 1000)
        }
      }, 5000)
    }
  },
}
</script>

<style lang="scss">

.pin-container {
  width: 100%;
  height: 100vh;
  overflow: hidden; 
  position: relative;
}

.panel {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
}
</style>
