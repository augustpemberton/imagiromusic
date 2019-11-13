<template>
  <div 
    v-if="show" 
    class="main"
  >
    <section class="splash">
      <p>suh</p>
    </section>
    <div class="splash-text animated fadeInUp">
      <h1 :class="{'flip-h' : flipLogo}">
        imagiro
      </h1>
    </div>
  </div>
</template>

<script>
//import OriDomi from 'oridomi'
export default {
  data: function () {
    return {
      show: true,
      flipLogo: false,
      fold: null
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll);
    });
    //this.fold = new OriDomi(".main");
    /*this.fold.foldUp(() => {
      this.show = true;
      this.fold.unfold();
    });*/
  },
  methods: {
    handleScroll: function () {
      this.flipLogo = (document.documentElement.scrollTop > 100 ? true : false);
    }
  }
}
</script>

<style lang="scss">
section {
  padding: 20px;
}
.main {

  min-height: 150vh;
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
</style>
