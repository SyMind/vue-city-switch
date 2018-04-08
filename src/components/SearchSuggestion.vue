<template>
  <div class="search-suggest">
    <ul class="search-suggest-wrapper">
      <li class="search-suggest-item"
        v-for="suggest of suggestArray"
        :key="suggest.citycode"
        @click="clickHandle(suggest)">
        {{ suggest.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { findCitiesByInitial, findCitiesByName } from '../common'
import { isChinese } from '../utils'

export default {
  props: {
    cityGroup: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    clickHandle (city) {
      this.$emit('selectCityEvent', Object.assign({}, city))
    }
  },
  computed: {
    suggestArray () {
      let result = []
      if (this.value.length > 0) {
        let initail = this.value[0]
        if (isChinese(initail)) {
          result = findCitiesByName(this.cityGroup, this.value)
        } else {
          let group = findCitiesByInitial(this.cityGroup, initail)
          for (let city of group.cities) {
            if (city.pinyin.replace('-', '').indexOf(this.value) === 0) {
              result.push(city)
            }
          }
        }
      }
      return result
    }
  }
}
</script>

<style lang="scss">
.search-suggest {
  width: 100%;
  padding: 0 15px;
  .search-suggest-wrapper {
    .search-suggest-item {
      display: block;
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
}
</style>
