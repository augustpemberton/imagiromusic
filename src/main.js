import Vue from 'vue'
import router from './router'

// 3rd party
import BootstrapVue from 'bootstrap-vue'
import VueKonva from 'vue-konva'
import jQuery from 'jquery'
import KsVueScrollMagic from 'ks-vue-scrollmagic'
import Soundcloud from 'soundcloud'
import Feather from 'vue-icon'
import VueGtag from 'vue-gtag'

//icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlayCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// import views
import App from './App.vue'

// import components
import Navbar from './components/Navbar'
import Splash from './components/Splash'
import Player from './components/Player'

//import releases
import PebbleBeach from './components/PebbleBeach'
import UntilImHome from './components/UntilImHome'

// styles
import './scss/bootstrap.scss'

// use 3rd party
Vue.use(BootstrapVue)
Vue.use(VueKonva);
Vue.use(KsVueScrollMagic);
Vue.use(Feather, 'v-icon');
Vue.use(VueGtag, {
  config: { id: 'UA-160945605-1'}
}, router);

Vue.prototype.$sc = Soundcloud;

const $ = jQuery;
window.$ = $;

// create components
Vue.component('navbar', Navbar)
Vue.component('pebble-beach', PebbleBeach);
Vue.component('until-im-home', UntilImHome);
Vue.component('splash', Splash);
Vue.component('player', Player);


Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
