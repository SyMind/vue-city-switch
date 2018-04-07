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
      this.$emit('selectCityEvent', Object.assign({}, city))
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
    font-size: 14px;
    color: #8C8C8C;
  }
  .name {
    position: relative;
    height: 48px;
    line-height: 48px;
    font-size: 15px;
    color: #5C5C5C;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1px;
      width: 100%;
      transform: scaleY(.5);
      transform-origin: 0 1px;
      background: #aaa;
    }
  }
}
</style>
