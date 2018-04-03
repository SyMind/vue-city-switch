<template>
  <ul class="city-list">
    <li class="city-list-group" v-for="cities in cityList" :key="cities.initials">
      <div class="initial">{{ cities.initials }}</div>
      <ul class="city-list-inner">
        <li v-for="city in cities.cityList" :key="city.cityId">
          <div class="city-name">{{ city.cityName }}</div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityList',
  props: {
    cityList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.city-list-group {
  padding: 0 15px;
  .initial {
    height: 48px;
    line-height: 48px;
  }
  .city-name {
    position: relative;
    height: 48px;
    line-height: 48px;
  }
}
</style>
