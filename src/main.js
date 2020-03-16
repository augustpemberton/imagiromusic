import Vue from 'vue'
import router from './router'

// 3rd party
import BootstrapVue from 'bootstrap-vue'
import VueKonva from 'vue-konva'
import jQuery from 'jquery'
import KsVueScrollMagic from 'ks-vue-scrollmagic'
import Soundcloud from 'soundcloud'

// import views
import App from './App.vue'

// import components
import Navbar from './components/Navbar'
import Releases from './components/Releases'
import Splash from './components/Splash'
import Player from './components/Player'

// styles
import './scss/bootstrap.scss'

// use 3rd party
Vue.use(BootstrapVue)
Vue.use(VueKonva);
Vue.use(KsVueScrollMagic);
Vue.prototype.$sc = Soundcloud;

const $ = jQuery;
window.$ = $;

// create components
Vue.component('navbar', Navbar)
Vue.component('releases', Releases);
Vue.component('splash', Splash);
Vue.component('player', Player);


Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
