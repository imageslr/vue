<i18n>
{
  "zh": {
    "following": "关注",
    "follower": "粉丝",
    "viewHomePage": "查看个人主页"
  },
  "en": {
    "following": "Following",
    "follower": "Follower",
    "viewHomePage": "View Home Page"
  }
}
</i18n>

<template>
  <aside class="card profile-card">
    <img
      src="@/assets/profile-bg.png"
      class="profile-card__bg">
    <div class="profile-card__info">
      <my-avatar
        :avatar-url="userInfo.avatar_url"
        class="profile-card__info-avatar"/>
      <h1 class="m0 mb1">{{ userInfo.name }}</h1>
      <p v-text="userInfo.title" />
      <p
        v-t="$t(`g.${userInfo.type}`)"
        v-if="userInfo.type"/>
      <p v-text="userInfo.introduction" />
    </div>
    <div class="profile-card__follow">
      <div class="p-12">
        <router-link
          :to="'/follow?uid=' + userInfo.id"
          class="f-20">{{ userInfo.following_count }}</router-link>
        <span class="block f-12 black-65">{{ $t('following') }}</span>
      </div>
      <template v-if="userInfo.type === 'designer'">
        <my-divider margin="12"/>
        <div class="p-12">
          <router-link
            :to="'/follow?type=follower&uid=' + userInfo.id"
            class="f-20">{{ userInfo.follower_count }}</router-link>
          <span class="block f-12 black-65">{{ $t('follower') }}</span>
        </div>
      </template>
    </div>
    <div class="profile-card__action">
      <slot>
        <el-button
          plain
          @click="$router.push('/profile')">{{ $t('viewHomePage') }}</el-button>
      </slot>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default () {
        return {
          id: null,
          avatar_url: '',
          name: this.$t('g.loading'),
          title: '',
          introduction: '',
          following_num: 0,
          follower_num: 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-card {
  width: 220px;
  text-align: center;
  &__info {
    padding: 0 12px 12px;
    &-avatar {
      margin: -40px auto 16px;
      width: 80px;
      height: 80px;
    }
    p {
      margin: 0 0 4px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      &:last-child {
        margin: 0;
      }
    }
  }
  &__follow {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  &__action {
    padding: 12px;
    background-color: #f5f5f5;
    & .el-button {
      width: 100%;
      margin-left: 0;
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
