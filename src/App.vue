<template>
  <div id="app" class="city-switch">
    <div class="city-switch-head">
      <search-bar></search-bar>
    </div>
    <div class="city-switch-body">
      <div class="city-switch-wrapper" @scroll="scrollHandle" ref="wrapper">
        <base-card title="当前定位">
          <div>
            <base-button :text="currentCity"></base-button>
          </div>
        </base-card>
        <base-card title="热门城市">
          <div>
            <base-button :text="currentCity"></base-button>
            <base-button :text="currentCity"></base-button>
            <base-button :text="currentCity"></base-button>
            <base-button :text="currentCity"></base-button>
            <base-button :text="currentCity"></base-button>
            <base-button :text="currentCity"></base-button>
            <base-button :text="currentCity"></base-button>
            <base-button :text="currentCity"></base-button>
          </div>
        </base-card>
        <city-panel :cityGroup="cityGroup"></city-panel>
      </div>
      <city-nav :activeInitial="activeInitial"
        :cityGroup="cityGroup"
        @touchInitialEvent="touchInitialEventHandle"></city-nav>
    </div>
  </div>
</template>

<script>
import BaseCard from './components/base/BaseCard'
import BaseButton from './components/base/BaseButton'

import SearchBar from './components/SearchBar'
import CurrentCity from './components/CurrentCity'
import CityNav from './components/CityNav'
import CityPanel from './components/CityPanel'

export default {
  name: 'App',
  data () {
    return {
      currentCity: '北京',
      cityGroup: [],
      activeInitial: '#'
    }
  },
  created () {
    this.cityGroup = this.parseCityGroup(require('./assets/json/cityList.json'))
  },
  mounted () {
    let extraHeight = 0
    let wrapper = this.$refs.wrapper
    for (let el of wrapper.children) {
      if (el.className.indexOf('card') > -1) {
        extraHeight += el.offsetHeight
      }
    }
    this.$store.commit('setExtraHeight', extraHeight)
    let scrollTop = extraHeight
    for (let i = 0; i < this.cityGroup.length; i++) {
      this.cityGroup[i].scrollTop = scrollTop
      scrollTop += 48
      for (let j = 0; j < this.cityGroup[i].cityList.length; j++) {
        scrollTop += 48
      }
    }
  },
  methods: {
    touchInitialEventHandle (initial) {
      for (let i = 0; i < this.cityGroup.length; i++) {
        if (this.cityGroup[i].initials === initial) {
          this.$refs.wrapper.scrollTo(0, Math.ceil(this.cityGroup[i].scrollTop))
        }
      }
    },
    scrollHandle (e) {
      let scrollTop = Math.ceil(e.target.scrollTop)
      for (let i = 0; i < this.cityGroup.length; i++) {
        if (scrollTop >= this.cityGroup[i].scrollTop && scrollTop < this.cityGroup[i + 1].scrollTop) {
          this.activeInitial = this.cityGroup[i].initials
        }
      }
    },
    parseCityGroup (cityList) {
      let map = {}
      cityList.forEach((item) => {
        if (item.initials) {
          item.initials = item.initials.toUpperCase()
          if (typeof map[item.initials] === 'undefined') {
            map[item.initials] = []
          }
          map[item.initials].push(item)
        }
      })
      let result = []
      for (let key in map) {
        result.push({
          initials: key,
          cityList: map[key]
        })
      }
      return result.sort((item1, item2) => {
        return item1.initials > item2.initials ? 1 : -1
      })
    }
  },
  components: {
    BaseCard,
    BaseButton,
    SearchBar,
    CurrentCity,
    CityNav,
    CityPanel
  }
}
</script>

<style lang="scss">
@import url('./assets/css/reset.css');
.city-switch {
  position: relative;
  height: 100%;
  .city-switch-head {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
  .city-switch-body {
    display: flex;
    box-sizing: border-box;
    height: 100%;
    padding-top: 65px;
    background: #f2f4f7;
    .city-switch-wrapper {
      flex: 1;
      overflow: scroll;
    }
  }
}
</style>
