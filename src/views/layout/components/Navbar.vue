<template>
  <el-menu
    class="navbar"
    mode="horizontal"
    background-color="#283E4A">
    <img
      class="logo"
      src="@/assets/logo.png">
    <el-input
      :placeholder="$t('navbar.searchPlaceholder')"
      class="search"/>
    <div class="btns">
      <el-button
        class="signin-btn"
        type="text">{{ $t('navbar.signIn') }}</el-button>
      <el-button
        class="signup-btn"
        plain>{{ $t('navbar.signUp') }}</el-button>
    </div>
  </el-menu>
</template>

<script>
export default {
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 52px;
  padding: 0 64px;
  .logo {
    width: 34px;
    height: 34px;
    margin-right: 16px;
  }
  .search {
    width: 280px;
  }
  .btns {
    flex: 1;
    text-align: right;
    .signin-btn {
      color: #fff;
    }
    .signup-btn {
      margin-left: 24px;
      background: none;
      color: #fff;
      &:hover,
      &:focus,
      &:active {
        border-color: #aaa;
      }
    }
  }
}
</style>
