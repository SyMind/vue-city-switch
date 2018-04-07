// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import CitySwitch from '../../src'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(CitySwitch, {
  searchBarIcon: '/static/icon/search.png'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
