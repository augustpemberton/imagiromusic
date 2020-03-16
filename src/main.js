import Vue from 'vue'
import router from './router'

// 3rd party
import BootstrapVue from 'bootstrap-vue'
import VueKonva from 'vue-konva'
import jQuery from 'jquery'
import KsVueScrollMagic from 'ks-vue-scrollmagic'

// import views
import App from './App.vue'

// import components
import Navbar from './components/Navbar'
import Releases from './components/Releases'
import Splash from './components/Splash'

// styles
import './scss/bootstrap.scss'

// use 3rd party
Vue.use(BootstrapVue)
Vue.use(VueKonva);
Vue.use(KsVueScrollMagic);

const $ = jQuery;
window.$ = $;

// create components
Vue.component('navbar', Navbar)
Vue.component('releases', Releases);
Vue.component('splash', Splash);


Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
