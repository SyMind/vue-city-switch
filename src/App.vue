<template>
  <div id="app">
    <search-bar></search-bar>
    <div class="app-content">
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
    </div>
  </div>
</template>

<script>
import BaseCard from './components/base/BaseCard'
import BaseButton from './components/base/BaseButton'

import SearchBar from './components/SearchBar'
import CurrentCity from './components/CurrentCity'

export default {
  name: 'App',
  data () {
    return {
      currentCity: '北京'
    }
  },
  components: {
    BaseCard,
    BaseButton,
    SearchBar,
    CurrentCity
  }
}
</script>

<style>
@import url('./assets/css/reset.css');

.app-content {
  background: rgba(225,227,229,.54);
}
</style>
