<template>
  <ul class="list-reset navbar-menu">
    <li :class="['navbar-menu-item', { 'is-active': isActive('feed')}]">
      <router-link
        to="/feed"
        class="navbar-menu-item__container">
        <svg-icon icon-class="home"/>
        <span>{{ $t('navbar.home') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('follow')}]">
      <router-link
        to="/follow"
        class="navbar-menu-item__container">
        <svg-icon icon-class="team"/>
        <span>{{ $t('navbar.follow') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('order')}]">
      <router-link
        to="/feed"
        class="navbar-menu-item__container">
        <svg-icon icon-class="snippets"/>
        <span>{{ $t('navbar.order') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('message')}]">
      <router-link
        to="/message"
        class="navbar-menu-item__container">
        <svg-icon icon-class="message"/>
        <span>{{ $t('navbar.message') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('notice')}]">
      <el-dropdown trigger="click">
        <div class="navbar-menu-item__container">
          <svg-icon icon-class="bell"/>
          <span>{{ $t('navbar.notice') }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">通知</el-dropdown-menu>
      </el-dropdown>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('me')}, 'border-right']">
      <el-dropdown trigger="click">
        <div class="navbar-menu-item__container">
          <avatar
            :avatar-url="avatarUrl"
            class="avatar"/>
          <span>{{ $t('navbar.me') }}<i class="el-icon-caret-bottom ml-4"/></span>
        </div>
        <el-dropdown-menu slot="dropdown">123</el-dropdown-menu>
      </el-dropdown>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('square')}]">
      <router-link
        to="/square"
        class="navbar-menu-item__container">
        <svg-icon icon-class="appstore"/>
        <span>{{ $t('navbar.square') }}</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    avatarUrl () {
      return this.$store.getters.userInfo.avatar_url
    }
  },
  methods: {
    isActive (itemName) {
      return this.$route.name === itemName
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-menu {
  height: 52px;
}
.navbar-menu-item {
  position: relative;
  display: inline-block;
  padding: 3px 24px;
  box-sizing: content-box;
  text-align: center;
  &.border-right:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 50px;
    border-right: 2px solid #5c6f7c;
  }
  &.is-active {
    border-bottom: 3px solid #fff;
    .navbar-menu-link {
      color: #fff;
    }
  }
  &__container {
    color: #bfcad1;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
    .svg-icon,
    .avatar {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin: 0;
    }
    span {
      display: block;
      font-size: 13px;
      line-height: 13px;
    }
  }
}
</style>
