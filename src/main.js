import Vue from 'vue'
import router from './router'

// 3rd party
import BootstrapVue from 'bootstrap-vue'
import VueKonva from 'vue-konva'

// import views
import App from './App.vue'

// import components
import Navbar from './components/Navbar'

// styles
import './scss/bootstrap.scss'

// use 3rd party
Vue.use(BootstrapVue)
Vue.use(VueKonva);

// create components
Vue.component('navbar', Navbar)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
