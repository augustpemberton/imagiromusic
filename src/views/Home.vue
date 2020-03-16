<template>
  <div 
    ref="pin" 
    class="pin-container" 
  >
    <splash class="panel panel-0" />
    <releases class="panel panel-1" />
  </div>
</template>

<script>
export default {
  mounted() {
   this.$nextTick(this.pinContainerScene)
  },
  destroyed() {
    this.$ksvuescr.$emit('destroy')
  },
  methods: {
    pinContainerScene() {
      const tl = new this.$gsap.TimelineMax()
      tl.fromTo('.panel-1', 1.5, {y: '200%'}, {x: '0%', y: '0%', ease: 'Power1.easeOut'}, 0)
      tl.to('.release-info', 0.5, {opacity: 1, ease:'Power2.easeOIn'}, 1)

      const scene = new this.$scrollmagic.Scene({
        triggerElement: '.pin-container',
        triggerHook: 'onLeave',
        duration: '200%'
      })
      .setPin('.pin-container')
      .setTween(tl)

      this.$ksvuescr.$emit('addScene', 'pinContainerScene', scene)
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
