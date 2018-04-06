<template>
  <ul class="city-panel">
    <li class="city-panel-group" v-for="group in cityGroup" :key="group.initial">
      <div class="initial">
        {{ group.initial }}
      </div>
      <ul>
        <li v-for="city in group.cities" :key="city.citycode">
          <div class="name" @click="clickHandle(city)">
            {{ city.name }}
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
    }
  },
  methods: {
    clickHandle (city) {
      this.$emit('selectCityEvent', city)
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
