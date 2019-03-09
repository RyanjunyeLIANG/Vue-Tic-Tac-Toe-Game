import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
window.Event = new Vue()

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
