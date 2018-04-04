<template>
  <div id="app" class="city-switch">
    <div class="city-switch-head">
      <search-bar @searchEvent="searchEventHandle"></search-bar>
    </div>
    <div class="city-switch-body">
      <search-suggestion v-show="isSearch"
        :cityGroup="cityGroup"
        :value="searchValue"></search-suggestion>
      <div v-show="!isSearch" class="city-switch-scroll" @scroll="scrollHandle" ref="scroll">
        <div ref="cards">
          <current-city-card :currentCity="currentCity"></current-city-card>
          <common-card title="热门城市"></common-card>
        </div>
        <city-panel :cityGroup="cityGroup"></city-panel>
      </div>
      <city-nav v-show="!isSearch" :activeInitial="activeInitial"
        :cityGroup="cityGroup"
        @touchInitialEvent="touchInitialEventHandle"></city-nav>
    </div>
  </div>
</template>

<script>
import CurrentCityCard from './components/CurrentCityCard'
import CommonCard from './components/CommonCard'
import SearchBar from './components/SearchBar'
import SearchSuggestion from './components/SearchSuggestion'
import CityNav from './components/CityNav'
import CityPanel from './components/CityPanel'
import { getCity } from './util'

export default {
  name: 'App',
  data () {
    return {
      isSearch: false,
      searchValue: '',
      currentCity: {
        name: '大连市',
        loaded: false,
        state: 0
      },
      cityGroup: [],
      activeInitial: '#'
    }
  },
  created () {
    this.cityGroup = this.parseCityGroup(require('./assets/json/cityList.json'))
    getCity().then((cityName) => {
      this.currentCity.loaded = true
      this.currentCity.name = cityName
      this.currentCity.state = 1
    }).catch(() => {
      this.currentCity.loaded = true
      this.currentCity.state = 0
    })
  },
  mounted () {
    let extraHeight = this.$refs.cards.offsetHeight
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
    searchEventHandle (value) {
      if (value !== '') {
        this.searchValue = value
        this.isSearch = true
      } else {
        this.searchValue = ''
        this.isSearch = false
      }
    },
    touchInitialEventHandle (initial) {
      if (initial === '#') {
        this.$refs.scroll.scrollTo(0, 0)
        return
      }
      let start = 0
      let end = this.cityGroup.length - 1
      let mid = parseInt(end / 2)
      while (start <= end) {
        if (this.cityGroup[mid].initials > initial) end = mid - 1
        if (this.cityGroup[mid].initials < initial) start = mid + 1
        if (this.cityGroup[mid].initials === initial) break
        mid = parseInt((end + start) / 2)
      }
      this.$refs.scroll.scrollTo(0, Math.ceil(this.cityGroup[mid].scrollTop))
      // for (let i = 0; i < this.cityGroup.length; i++) {
      //   if (this.cityGroup[i].initials === initial) {
      //     this.$refs.scroll.scrollTo(0, Math.ceil(this.cityGroup[i].scrollTop))
      //   }
      // }
    },
    scrollHandle (e) {
      let scrollTop = Math.ceil(e.target.scrollTop)
      if (scrollTop < this.cityGroup[0].scrollTop) {
        this.activeInitial = '#'
      }
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
    CurrentCityCard,
    CommonCard,
    SearchBar,
    SearchSuggestion,
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
    .city-switch-scroll {
      flex: 1;
      overflow: scroll;
    }
  }
}
</style>
