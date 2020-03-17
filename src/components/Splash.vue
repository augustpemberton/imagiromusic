<template>
  <section class="splash">
    <div id="foldable" />
    <div class="splash-text animated fadeInUp">
      <h1 
        :class="{'flip-h': flipLogo}"
        class="logo txt-primary"
      >
        imagiro
      </h1>
      <h2 
        class="txt-secondary subtitle"
      > 
        <span 
          v-for="index in 3" 
          :key="index"
        >
          new single
          "until i'm home" - March 18th<br>
        </span>
      </h2>
    </div>
  </section>
</template>
<script>
import fold from '@/scripts/fold.js';
export default {
  data: function () {
    return {
      show: true,
      flipLogo: false,
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll);
    });
    fold.init('foldable');
  },
  methods: {
    handleScroll: function () {
      this.flipLogo = (document.documentElement.scrollTop > 150 ? true : false);
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/fold.scss';
.splash {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-h {
  transform: scale(-1, 1);
}

.logo {
  color: white;
  -webkit-transition: all .0.2s ease-in-out;  
  -moz-transition: all .2s ease-in-out;  
  -o-transition: all .2s ease-in-out;  
  transition: all .2s ease-in-out;
}

.subtitle {
  height: 2.4em;
  overflow: hidden;
  line-height: 1.2em;
  transition: all 1s ease-out;
  position: absolute;
  @media (min-width: $sm) {
    top: -30%;
    left: 50%;
  }
  @media (max-width: $sm) {
    left: 0%;
    top: -100%;
  }
}

#foldable {
  width: 100vw;
  height: 1000px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>