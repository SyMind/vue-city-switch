<template>
  <div class="selector">
    <div class="input"
      @click="clickHandle">
      <div class="title">{{ currentCity.name }}</div>
    </div>
  </div>
</template>

<script>
import { getCookie } from '../cookie'

export default {
  name: 'Index',
  data () {
    let currentCity = JSON.parse(getCookie('current_city'))
    if (!currentCity) {
      currentCity = {}
      currentCity.name = '请选择城市'
    }
    return {
      currentCity
    }
  },
  methods: {
    clickHandle () {
      this.$router.push('city')
    }
  }
}
</script>

<style lang="scss">
.input {
  position: relative;
  font-size: 12px;
  padding: 4px 8px;
  outline: 0;
  cursor: pointer;
  border: 1px solid #ccc;
  .title {
    margin-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ccc;
  }
}
.panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
