<template>
  <ul class="city-nav">
    <li class="letter">
      <div class="text">#</div>
    </li>
    <li class="letter" v-for="city in cityList" :key="city.initials"
      @touchstart="touchstartHandle(city)">
      <div class="text">{{ city.initials }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityNaV',
  props: {
    cityList: {
      type: Array,
      required: true
    }
  },
  methods: {
    touchstartHandle (city) {
      this.$emit('touchLetterEvent', city)
    }
  }
}
</script>

<style lang="scss">
.city-nav {
  padding-top: 64px;
  .letter {
    padding: 3px 0;
    position: relative;
    .text {
      width: 13px;
      height: 13px;
      text-align: center;
      line-height: 13px;
      font-size: 12px;
      font-weight: 700;
    }
  }
}
</style>
