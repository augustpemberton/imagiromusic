<template>
  <div 
    class="main-container"
    :class="{hidden : !show}"
  >
    <div class="main foldable">
      <section class="splash">
        <div
          
          class="splash-text animated fadeInUp"
        >
          <h1 :class="{'flip-h' : flipLogo, 'hidden' : !unfolded}">
            imagiro
          </h1>
          <h3 class="animated bounce">
            scroll to continue
          </h3> 
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import OriDomi from 'oridomi'
export default {
  data: function () {
    return {
      ripple: true,
      show: true,
      flipLogo: false,
      fold: null,
      unfolded: true,
      unfoldSpeed: 1000
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll);
    });
    this.fold = new OriDomi(".foldable", {
      vPanels: 5,
      ripple: true
    });
    this.show = false;
    let vue = this;

    this.fold.setSpeed(1).foldUp(() => {setTimeout(function(){
      vue.show = true;
      vue.fold.setSpeed(vue.unfoldSpeed).reset(() => {
        vue.unfolded = true;
      });
    }, 500);
    });
  },
  methods: {
    handleScroll: function () {
      this.flipLogo = (document.documentElement.scrollTop > 100 ? true : false);
    }
  }
}
</script>

<style lang="scss">

.main-container {
  min-height: 150vh;
}
.foldable {
  max-height: 100%;
  overflow: hidden;
}
section {
  padding: 20px;
}
.splash {
  height: 100vh;
}
.main {
  background: $bg-image no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  text-align: center;
  h1 {
    line-height: 100vh;
    color: white;
    -webkit-transition: transform .0.2s ease-in-out;  
    -moz-transition: transform .2s ease-in-out;  
    -o-transition: transform .2s ease-in-out;  
    transition: transform .2s ease-in-out;
  }
}

.flip-h {
  transform: scale(-1, 1);
}

.hidden {
  opacity: 0
}
</style>
