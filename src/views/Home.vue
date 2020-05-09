<template>
  <div 
    ref="pin" 
    class="pin-container" 
  >
    <splash class="panel panel-0" />
    <release 
      v-for="(release, index) in releases"
      :key="release.title"
      :class="'panel panel-'+(index+1)" 
      :release="release"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      releases: [
        {
          title: "until i'm home",
          artwork: "img/releases/untilimhome.jpg",
          url: "https://fanlink.to/imagiro-home",
          readLink: "https://label.stereofox.com/release/imagiro-until-im-home/",
          label: "stereofox",
          released: "true",
          backgroundColor: "#C2CCEF",
          dark: false,
          txtSmall: true
        },
        {
          title: "places i remember",
          artwork: "img/releases/starrynight.jpg",
          url: "https://imagiro.fanlink.to/places",
          readLink: null,
          label: "HIP DOZER",
          released: "true",
          backgroundColor: "#828953",
          dark: false,
          txtSmall: true,
        },
        {
          title: "red echoes",
          artwork: "img/releases/redechoes.jpg",
          url: "https://open.spotify.com/album/2ofuvE3jNeRSUJ3O1Xe1Le?si=Qx4HW1KFQISFwG6_XIyJ0g",
          readLink: null,
          label: "arbour & imagiro",
          released: "true",
          backgroundColor: "#1C2D61",
          dark: true,
          txtSmall: false
        }
      ].reverse()
    }
  },
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

      for (var i=0; i<this.releases.length; i++) {
        var p = i+1;
        var t = 1.5 * i;
        tl.fromTo('.panel-'+p, 0.8, {y: '100%'}, {x: '0%', y: '0%', ease: 'Power1.easeInOut'}, t+0)
        tl.fromTo('.panel-'+p+' .release-art-img', 1, {width: '0%', height: '0%'}, {width: '100%', height: '100%', ease: 'Power2.easeOut'}, t+0.6);
        tl.fromTo('.panel-'+p+' .play-icon', 0.2, {color: this.releases[i].backgroundColor}, {color: '#FFFFFF', ease: 'Power3.easeOut'}, t+1);
      }

      const scene = new this.$scrollmagic.Scene({
        triggerElement: '.pin-container',
        triggerHook: 'onLeave',
        duration: '350%'
      })
      .setPin('.pin-container')
      .setTween(tl)

      this.$ksvuescr.$emit('addScene', 'pinContainerScene', scene)
    },
    promptScroll() {
      setTimeout(function(){
        if (window.$('html, body').scrollTop() == 0){
          window.$('html, body').animate({
            scrollTop: 170
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

.top-left {
  position: absolute;
  top: 0;
  left: 0;
  right: 50%;
  bottom: 50%;
}

.bottom-left {
  position: absolute;
  top: 50%;
  bottom: 0%;
  right: 50%;
  left: 0%;
}

.bottom-right {
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0%;
  bottom: 0%;
}

.read-prompt {
  margin: 50px 5px 50px 200px;
}
</style>
