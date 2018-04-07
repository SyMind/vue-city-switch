<template>
  <city-switch @selectCityEvent="selectCityEventHandle"></city-switch>
</template>

<script>
import { setCookie } from '../cookie'

export default {
  methods: {
    selectCityEventHandle (city) {
      let now = new Date()
      let end = now.getFullYear(now.getFullYear() + 1)
      setCookie('current_city', JSON.stringify(city), end)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
