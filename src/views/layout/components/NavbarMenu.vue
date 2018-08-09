<i18n>
{
  "zh": {
    "home": "主页",
    "follow": "关注",
    "order": "订单",
    "message": "消息",
    "notice": "通知",
    "me": "我",
    "signOut": "退出登录",
    "square": "项目广场"
  },
  "en": {
    "home": "Home",
    "follow": "Follow",
    "order": "Order",
    "message": "Message",
    "notice": "Notice",
    "me": "Me",
    "signOut": "Sign out",
    "square": "Square"
  }
}
</i18n>

<template>
  <ul class="list-reset navbar-menu">
    <li :class="['navbar-menu-item', { 'is-active': isActive('feed')}]">
      <router-link
        to="/feed"
        class="navbar-menu-item__container">
        <my-svg-icon icon-class="home"/>
        <span>{{ $t('home') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('follow')}]">
      <router-link
        to="/follow"
        class="navbar-menu-item__container">
        <my-svg-icon icon-class="team"/>
        <span>{{ $t('follow') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('order')}]">
      <router-link
        to="/order"
        class="navbar-menu-item__container">
        <my-svg-icon icon-class="snippets"/>
        <span>{{ $t('order') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('message')}]">
      <router-link
        to="/message"
        class="navbar-menu-item__container">
        <my-svg-icon icon-class="message"/>
        <span>{{ $t('message') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('notice')}]">
      <el-dropdown trigger="click">
        <div class="navbar-menu-item__container">
          <my-svg-icon icon-class="bell"/>
          <span>{{ $t('notice') }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">通知</el-dropdown-menu>
      </el-dropdown>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('me')}, 'border-right']">
      <el-dropdown
        trigger="click"
        @command="onClickDropdownItem">
        <div class="navbar-menu-item__container">
          <my-avatar
            :avatar-url="avatarUrl"
            class="avatar"/>
          <span>{{ $t('me') }}<i class="el-icon-caret-bottom ml-4"/></span>
        </div>
        <el-dropdown-menu
          slot="dropdown">
          <el-dropdown-item command="me">个人中心</el-dropdown-item>
          <el-dropdown-item
            command="signout"
            divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('square')}]">
      <router-link
        to="/search"
        class="navbar-menu-item__container">
        <my-svg-icon icon-class="appstore"/>
        <span>{{ $t('square') }}</span>
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
    },
    onClickDropdownItem (command) {
      if (command === 'signout') {
        this.$store.dispatch('SIGN_OUT').then(() => {
          this.$router.replace({ path: '/' })
        })
      }
      if (command === 'me') {
        this.$router.push({ path: '/me' })
      }
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
  text-align: center;
  &:last-child {
    padding-right: 0;
  }
  &.border-right:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 51px;
    border-right: 2px solid #5c6f7c;
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
  &.is-active {
    .navbar-menu-item__container {
      color: #fff;
    }
  }
}
</style>
