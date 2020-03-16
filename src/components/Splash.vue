<template>
  <section class="splash">
    <div id="foldable" />
    <div class="splash-text animated fadeInUp">
      <h1 
        :class="{'flip-h': flipLogo}"
        class="logo"
      >
        imagiro
      </h1>
    </div>
  </section>
</template>
<script>
import '@/scripts/fold.js';
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
  },
  methods: {
    handleScroll: function () {
      this.flipLogo = (document.documentElement.scrollTop > 100 ? true : false);
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

#foldable {
  width: 100vw;
  height: 1000px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>