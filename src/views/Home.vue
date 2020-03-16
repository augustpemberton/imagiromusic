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
      tl.fromTo('.panel-1', 1.5, {x: '100%'}, {x: '0%', y: '0%', ease: 'Power1.easeOut'})      

      const scene = new this.$scrollmagic.Scene({
        triggerElement: '.pin-container',
        triggerHook: 'onLeave',
        duration: '400%'
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
