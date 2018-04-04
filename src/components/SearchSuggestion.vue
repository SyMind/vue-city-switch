<template>
  <div class="search-suggest">
    <ul>
      <div class="">搜索列表 {{ suggestList }}</div>
    </ul>
  </div>
</template>

<script>
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
  computed: {
    suggestList () {
      return this.value
    }
  }
}
</script>

<style lang="scss">
.search-suggest {
  margin-top: 60px;
  padding: 5px 0 0 0;
}

  .empty {
    text-align:center;
    img{
      width: 160px;
      height: 160px;
      margin-top:132px;
    }
    p{
      text-align: center;
      font-family: "PingFang-Regular", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Heiti SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      font-size: 17px;
      color: #292D33;
      margin-top:20px;
    }
  }
</style>
