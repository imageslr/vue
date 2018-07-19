<template>
  <ul class="list-reset navbar-menu">
    <li :class="['navbar-menu-item', { 'is-active': isActive('feed')}]">
      <router-link
        to="/feed"
        class="navbar-menu-link">
        <svg-icon icon-class="home"/>
        <span>{{ $t('navbar.home') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('follow')}]">
      <router-link
        to="/follow"
        class="navbar-menu-link">
        <svg-icon icon-class="team"/>
        <span>{{ $t('navbar.follow') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('order')}]">
      <router-link
        to="/feed"
        class="navbar-menu-link">
        <svg-icon icon-class="snippets"/>
        <span>{{ $t('navbar.order') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('message')}]">
      <router-link
        to="/message"
        class="navbar-menu-link">
        <svg-icon icon-class="message"/>
        <span>{{ $t('navbar.message') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('notice')}]">
      <router-link
        to="/notice"
        class="navbar-menu-link">
        <svg-icon icon-class="bell"/>
        <span>{{ $t('navbar.notice') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('me')}]">
      <router-link
        to="/me"
        class="navbar-menu-link">
        <avatar
          :avatar-url="avatarUrl"
          class="avatar"/>
        <span>{{ $t('navbar.me') }}<i class="el-icon-caret-bottom ml-4"/></span>
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
  padding-top: 5px;
}
.navbar-menu-item {
  display: inline-block;
  padding: 0 24px 2px;
  text-align: center;
}
.is-active {
  border-bottom: 3px solid #fff;
}
.is-active > .navbar-menu-link {
    color: #fff;
}
.navbar-menu-link {
  color: #BFCAD1;
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
}
span {
  display: block;
  font-size: 13px;
  line-height: 13px;
}
</style>
