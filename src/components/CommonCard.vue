<template>
  <base-card :title="title">
    <div v-for="city in cities" :key="city.name" class="common-card-cityement">
      <div class="common-card-text" @click="clickHandle(city)">
        {{ city.name }}
      </div>
    </div>
  </base-card>
</template>

<script>
import BaseCard from './base/BaseCard'

export default {
  name: 'CommonCard',
  props: {
    title: {
      type: String,
      required: true
    },
    cities: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    clickHandle (city) {
      this.$emit('selectCityEvent', Object.assign({}, city))
    }
  },
  components: {
    BaseCard
  }
}
</script>

<style lang="scss">
.common-card-cityement {
  display: inline-block;
  box-sizing: border-box;
  width: 33.33%;
  padding: 0 11px 11px 0;
  .common-card-text {
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    padding: 0 10px;
    border-radius: 4px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    color: #5C5C5C;
    background-color: #fff;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
</style>
