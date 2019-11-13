<template>
  <div>
    <div 
      id="fold-container"
      class="main foldable" 
    />
  
    <section class="splash">
      <div class="splash-text animated fadeInUp">
        <h1 :class="{'flip-h' : flipLogo}">
          imagiro
        </h1>
      </div>
    </section>
  </div>
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
.main {
  background: $bg-image no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  h1 {
    color: white;
    -webkit-transition: transform .0.2s ease-in-out;  
    -moz-transition: transform .2s ease-in-out;  
    -o-transition: transform .2s ease-in-out;  
    transition: transform .2s ease-in-out;
  }
}

.splash {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-h {
  transform: scale(-1, 1);
}

.hidden {
  opacity: 0
}
</style>
