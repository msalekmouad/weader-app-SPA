import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueResource from 'vue-resource'
import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import 'animate.css/animate.min.css'


Vue.config.productionTip = false

Vue.use(vueResource)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
