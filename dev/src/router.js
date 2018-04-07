import Vue from 'vue'
import Router from 'vue-router'
import Index from './pages/Index'
import City from './pages/City'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/city',
      name: 'City',
      component: City
    }
  ]
})
