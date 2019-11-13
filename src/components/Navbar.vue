<template>
  <transition name="fade">
    <b-navbar 
      v-show="navbarVisible"
      id="nav" 
      ref="navbar" 
      fixed="top" 
      type="light"
      variant="light"
    >
      <b-navbar-brand href="#">
        imagiro
      </b-navbar-brand>
    </b-navbar>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      navbarVisible: false
    };
  },
  mounted() {
    var vue = this;
    this.$nextTick(function() {
      window.addEventListener("scroll", function() {
        if (document.documentElement.scrollTop >= 300) {
          if (!vue.navbarVisible) vue.toggleNavbar(true);
        }
        if (document.documentElement.scrollTop < 300) {
          if (vue.navbarVisible) vue.toggleNavbar(false);
        }
      });
    });
  },
  methods: {
    toggleNavbar: function (visible) {
      this.navbarVisible = visible;
    }
  }
};
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
