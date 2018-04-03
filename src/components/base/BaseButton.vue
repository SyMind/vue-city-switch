<template>
  <div class="button">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.button {
  display: inline-block;
  padding: 7px 12px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 13px;
  background-color: #fff;
}
</style>
