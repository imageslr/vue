<template>
  <el-menu
    class="navbar"
    mode="horizontal"
    background-color="#283E4A">
    <icon
      name="app-logo"
      @click.native="$router.push('/')"/>
    <el-input
      :placeholder="$t('navbar.searchPlaceholder')"
      class="search"/>
    <div class="btns">
      <router-link to="/signin">
        <el-button
          class="signin-btn"
          type="text">{{ $t('navbar.signIn') }}</el-button>
      </router-link>
      <router-link to="/signup">
        <el-button
          class="signup-btn"
          plain>{{ $t('navbar.signUp') }}</el-button>
      </router-link>
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
  .fa-icon {
    width: 34px;
    height: 34px;
    margin-right: 16px;
    color: #fff;
    outline: none;
    cursor: pointer;
  }
  .search {
    width: 280px;
  }
  .btns {
    flex: 1;
    text-align: right;
    outline: none;
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
