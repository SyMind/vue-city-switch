<template>
  <base-card title="当前定位">
    <div class="current-city-card-element">
      <div v-if="!currentCity.loaded" class="current-city-card-text">定位中...</div>
      <div v-else-if="currentCity.state === 0" class="current-city-card-text">定位失败</div>
      <div v-else class="current-city-card-text">
        {{ currentCity.name }}
      </div>
    </div>
  </base-card>
</template>

<script>
import BaseCard from './base/BaseCard'

export default {
  name: 'CurrentCityCard',
  props: {
    currentCity: {
      type: Object,
      default: () => {
        return {
          name: '大连市',
          loaded: false,
          state: 0
        }
      }
    }
  },
  components: {
    BaseCard
  }
}
</script>

<style lang="scss">
.current-city-card-element {
  display: inline-block;
  box-sizing: border-box;
  width: 33.33%;
  padding: 0 11px 11px 0;
  .current-city-card-text {
    height: 40px;
    width: 100%;
    border-radius: 4px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    background-color: #fff;
  }
}
</style>
