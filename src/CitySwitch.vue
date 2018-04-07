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
          <current-city-card :currentCity="currentCity"
            @selectCityEvent="selectCityEventHandle"></current-city-card>
          <common-card title="常用城市"
            @selectCityEvent="selectCityEventHandle"
            v-if="commonCities.length > 0"
            :cities="commonCities"></common-card>
        </div>
        <city-panel :cityGroup="cityGroup"
          @selectCityEvent="selectCityEventHandle"></city-panel>
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
import { findCitiesByInitial, getCommonCities, addCommonCities } from './common'
import { getCity } from './utils'
import options from './options'

export default {
  name: 'CitySwitch',
  data () {
    return {
      isSearch: false,
      searchValue: '',
      currentCity: {
        name: '大连市',
        loaded: false,
        state: 0
      },
      commonCities: [],
      cityGroup: [],
      activeInitial: '#'
    }
  },
  created () {
    this.cityGroup = this.parseCityGroup(require('./assets/json/cities.json'))
    getCity().then((cityName) => {
      this.currentCity.loaded = true
      this.currentCity.name = cityName
      this.currentCity.state = 1
    }).catch(() => {
      this.currentCity.loaded = true
      this.currentCity.state = 0
    })

    this.commonCities = getCommonCities()
  },
  mounted () {
    let extraHeight = this.$refs.cards.offsetHeight
    let scrollTop = extraHeight
    for (let i = 0; i < this.cityGroup.length; i++) {
      this.cityGroup[i].scrollTop = scrollTop
      scrollTop += 48
      for (let j = 0; j < this.cityGroup[i].cities.length; j++) {
        scrollTop += 48
      }
    }
  },
  methods: {
    selectCityEventHandle (city) {
      // this.commonCities.push(city)
      addCommonCities(city)

      this.$emit('selectCityEvent', city)
    },
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
      let group = findCitiesByInitial(this.cityGroup, initial)
      this.$refs.scroll.scrollTo(0, Math.ceil(group.scrollTop))
    },
    scrollHandle (e) {
      let scrollTop = Math.ceil(e.target.scrollTop)
      if (scrollTop < this.cityGroup[0].scrollTop) {
        this.activeInitial = '#'
      }
      for (let i = 0; i < this.cityGroup.length; i++) {
        if (scrollTop >= this.cityGroup[i].scrollTop && scrollTop < this.cityGroup[i + 1].scrollTop) {
          this.activeInitial = this.cityGroup[i].initial
        }
      }
    },
    parseCityGroup (cities) {
      let map = {}
      cities.forEach((item) => {
        item.initial = item.pinyin[0].toUpperCase()
        if (typeof map[item.initial] === 'undefined') {
          map[item.initial] = []
        }
        map[item.initial].push(item)
      })
      let result = []
      for (let key in map) {
        result.push({
          initial: key,
          cities: map[key]
        })
      }
      return result.sort((item1, item2) => {
        return item1.initial > item2.initial ? 1 : -1
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
    background: #f2f2f2;
    .city-switch-scroll {
      flex: 1;
      overflow: scroll;
    }
  }
}
</style>
