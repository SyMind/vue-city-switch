<template>
  <div class="card">
    <div class="card-title">{{ title }}</div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.card {
  padding: 0 15px;
}
.card-title {
  padding: 15px 0;
  font-size: 14px;
  color: #8C8C8C;
}
.card-content {
  font-size: 0;
}
</style>
