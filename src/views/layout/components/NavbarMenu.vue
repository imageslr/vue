<i18n>
{
  "zh": {
    "home": "主页",
    "follow": "关注",
    "order": "订单",
    "message": "消息",
    "notification": "通知",
    "me": "我",
    "square": "项目广场"
  },
  "en": {
    "home": "Home",
    "follow": "Follow",
    "order": "Order",
    "message": "Message",
    "notification": "Notice",
    "me": "Me",
    "square": "Square",
    "个人中心": "Personal center",
    "退出登录": "Sign out"
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
        <el-badge
          :hidden="!hasUnreadMessages"
          is-dot>
          <my-svg-icon icon-class="message"/>
        </el-badge>
        <span>{{ $t('message') }}</span>
      </router-link>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('notification')}]">
      <router-link
        to="/notification"
        class="navbar-menu-item__container">
        <el-badge
          :hidden="!hasUnreadNotifications"
          is-dot>
          <my-svg-icon icon-class="bell"/>
        </el-badge>
        <span>{{ $t('notification') }}</span>
      </router-link>
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
          <el-dropdown-item command="me">{{ $t('个人中心') }}</el-dropdown-item>
          <el-dropdown-item
            command="signout"
            divided>{{ $t('退出登录') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
    <li :class="['navbar-menu-item', { 'is-active': isActive('search')}]">
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
    },
    hasUnreadNotifications () {
      return !!this.$store.getters.userInfo.notification_count
    },
    hasUnreadMessages () {
      return !!this.$store.getters.userInfo.unread_message_count
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
  height: 70px;
}
.navbar-menu-item {
  position: relative;
  display: inline-block;
  padding: 13px 20px;
  text-align: center;
  &:last-child {
    padding-right: 0;
  }
  &.border-right:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 70px;
  }
  &__container {
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    &:hover {
      color: #29b2fe;
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
      color: #29b2fe;
    }
  }
}
</style>
<style>
.navbar-menu-item .el-badge__content.is-fixed.is-dot {
  top: 2px;
}
</style>
