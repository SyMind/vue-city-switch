<template>
  <div id="app" class="app">
    <div class="app-head">
      <search-bar></search-bar>
    </div>
    <div class="app-body">
      <div class="app-wrapper">
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
        <div>
          <city-list :cityList="cityList"></city-list>
        </div>
      </div>
      <div class="app-nav">
        <city-nav :cityList="cityList"></city-nav>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from './components/base/BaseCard'
import BaseButton from './components/base/BaseButton'

import SearchBar from './components/SearchBar'
import CurrentCity from './components/CurrentCity'
import CityNav from './components/CityNav'
import CityList from './components/CityList'

export default {
  name: 'App',
  data () {
    return {
      currentCity: '北京',
      cityList: require('./assets/json/cityList.json')
    }
  },
  created () {
    this.cityList = this.handleCityList(this.cityList)
  },
  methods: {
    handleCityList (cityList) {
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
    CityList
  }
}
</script>

<style lang="scss">
@import url('./assets/css/reset.css');

.app {
  position: relative;
  height: 100%;
  .app-head {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
  }
  .app-body {
    display: flex;
    box-sizing: border-box;
    height: 100%;
    padding-top: 65px;
    background: #f2f4f7;
    .app-wrapper {
      flex: 1;
      overflow: scroll;
    }
    .app-nav {

    }
  }
}
// .content {
//   display: flex;
//   background: rgba(225,227,229,.54);
//   .wrapper {
//     flex: 1;
//     overflow: hidden;
//     height: 100%;
//   }
//   .nav {

//   }
// }
</style>
