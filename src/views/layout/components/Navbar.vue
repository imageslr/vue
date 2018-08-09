<i18n>
{
  "zh": {
    "searchPlaceholder": "搜索项目、设计师",
    "signIn": "登录",
    "signUp": "马上加入"
  },
  "en": {
    "searchPlaceholder": "Search projects or designers",
    "signIn": "Sign in",
    "signUp": "Sign up"
  }
}
</i18n>

<template>
  <el-menu
    class="navbar"
    mode="horizontal"
    background-color="#283E4A">
    <icon
      name="app-logo"
      @click.native="$router.push('/')"/>
    <el-input
      :placeholder="$t('searchPlaceholder')"
      class="search"/>
    <navbar-menu
      v-if="isSignIn"
      class="links"/>
    <div
      v-else
      class="links">
      <router-link to="/signin">
        <el-button
          class="signin-btn"
          type="text">{{ $t('signIn') }}</el-button>
      </router-link>
      <router-link to="/signup">
        <el-button
          class="signup-btn"
          plain>{{ $t('signUp') }}</el-button>
      </router-link>
    </div>
  </el-menu>
</template>

<script>
import NavbarMenu from './NavbarMenu'
export default {
  components: { NavbarMenu },
  computed: {
    isSignIn () {
      return this.$store.getters.isSignIn
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 52px;
  padding: 0 calc((100% - 1000px) / 2);
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
  .links {
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
