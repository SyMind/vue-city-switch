import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityGroup: [],
    extraHeight: 0,
    scrollY: 0,
    letter: '#'
  },
  mutations: {
    setCityGroup (state, cityGroup) {
      state.cityGroup = cityGroup
    },
    setExtraHeight (state, extraHeight) {
      state.extraHeight = extraHeight
    },
    setScrollY (state, scrollY) {
      console.log(scrollY)
      state.scrollY = scrollY
    }
  }
})
