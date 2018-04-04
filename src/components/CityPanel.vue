<template>
  <ul class="city-panel">
    <li class="city-panel-group" v-for="group in cityGroup" :key="group.initials">
      <div class="initial"
        :style="{ height: initialHeight }">
        {{ group.initials }}
      </div>
      <ul>
        <li v-for="city in group.cityList" :key="city.cityId">
          <div class="name"
            :style="{ height: cityNameHeight }">
            {{ city.cityName }}
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityPanel',
  props: {
    cityGroup: {
      type: Array,
      required: true
    },
    initialHeight: {
      type: Number,
      default: 48
    },
    cityNameHeight: {
      type: Number,
      default: 48
    }
  }
}
</script>

<style lang="scss">
.city-panel-group {
  padding: 0 15px;
  .initial {
    height: 48px;
    line-height: 48px;
  }
  .name {
    position: relative;
    height: 48px;
    line-height: 48px;
  }
}
</style>
