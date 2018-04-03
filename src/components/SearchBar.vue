<template>
  <div class="search-bar">
    <div class="search-bar-box">
      <div class="content">
        <form class="form" action="">
          <input class="input" type="search" placeholder="请输入城市名称和首字母查询">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar'
}
</script>

<style lang="scss">
  .search-bar {
    padding: 15px 8px;
    .search-bar-box {
      height: 35px;
      border-radius: 25px;
      color: #848c99;
      background: rgba(225,227,229,.54);
      .content {
        height: 100%;
        padding: 0 24px 0 29px;
        background-image: url(../assets/icon/search.png);
        background-size: 16px 16px;
        background-repeat: no-repeat;
        background-position: 10px 10px;
        .form {
          height: 100%;
          .input {
            margin: 0;
            padding: 0;
            border: 0;
            outline: 0;
            -webkit-appearance: none;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            background: transparent;
            line-height: 35px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #292D33;
          }
        }
      }
    }
  }
</style>
