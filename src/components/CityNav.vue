<template>
  <ul class="city-nav">
    <li class="initial">
      <div class="text" :class="activeInitial === '#' ? 'active' : ''">#</div>
    </li>
    <li class="initial" v-for="group in cityGroup" :key="group.initials">
      <div class="text"
        :class="activeInitial === group.initials ? 'active' : ''"
        @touchstart="touchstartHandle(group.initials)">
        {{ group.initials }}
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityNaV',
  props: {
    cityGroup: {
      type: Array,
      required: true
    },
    activeInitial: {
      type: String,
      required: true
    }
  },
  methods: {
    touchstartHandle (initial) {
      this.$emit('touchInitialEvent', initial)
    }
  }
}
</script>

<style lang="scss">
.city-nav {
  padding-top: 64px;
  .initial {
    padding: 3px 0;
    position: relative;
    .text {
      width: 13px;
      height: 13px;
      text-align: center;
      line-height: 13px;
      font-size: 12px;
      font-weight: 700;
      &.active {
        color: red;
      }
    }
  }
}
</style>
