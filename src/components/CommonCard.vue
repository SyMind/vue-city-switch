<template>
  <base-card :title="title">
    <div v-for="el in elements" :key="el.name" class="common-card-element">
      <div class="common-card-text">
        {{ el.name }}
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
    elements: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    BaseCard
  }
}
</script>

<style lang="scss">
.common-card-element {
  display: inline-block;
  box-sizing: border-box;
  width: 33.33%;
  padding: 0 11px 11px 0;
  .common-card-text {
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
