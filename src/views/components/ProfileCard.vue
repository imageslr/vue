<template>
  <aside class="card profile-card">
    <img
      src="@/assets/profile-bg.png"
      class="profile-card__bg">
    <div class="profile-card__info">
      <avatar
        :avatar-url="userInfo.avatar_url"
        class="profile-card__info-avatar"/>
      <h1 class="m0 mb1">{{ userInfo.real_name }}</h1>
      <p class="m0 f-12 black-60">{{ userInfo.title }}</p>
      <p class="m0 f-12 black-60 mb-12">{{ userInfo.introduction }}</p>
    </div>
    <div class="profile-card__follow">
      <div class="p-12">
        <router-link
          class="f-20"
          to="follow">{{ userInfo.following_num }}</router-link>
        <span class="block f-12 black-60">{{ $t('profile.following') }}</span>
      </div>
      <divider margin="12"/>
      <div class="p-12">
        <router-link
          class="f-20"
          to="follow">{{ userInfo.follower_num }}</router-link>
        <span class="block f-12 black-60">{{ $t('profile.follower') }}</span>
      </div>
    </div>
    <div class="profile-card__action">
      <el-button
        plain
        @click="$router.push('/profile')">{{ $t('profile.viewHomePage') }}</el-button>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-card {
  width: 220px;
  text-align: center;
  &__info {
    padding: 0 12px;
  }
  &__info-avatar {
    margin: -40px auto 16px;
  }
  &__follow {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  &__action {
    padding: 12px;
    background-color: #f5f5f5;
  }
}
</style>
