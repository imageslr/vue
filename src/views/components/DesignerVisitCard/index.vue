<template>
  <div class="container">
    <router-link
      :to="'/profile?uid=' + user.id"
      class="avatar-container">
      <avatar
        :avatar-url="user.avatar_url"
        class="avatar"/>
    </router-link>
    <div class="info">
      <p class="m0 bold f-14">
        <router-link
          :to="'/profile?uid=' + user.id"
          class="black-85">{{ user.real_name }}</router-link>
        <span
          v-t="user.title"
          class="ml1 black-45" />
      </p>
      <p
        v-t="user.introduction"
        class="m0 f-14 black-45 ellipsis-1" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  .avatar-container,
  .avatar {
    width: 48px;
    height: 48px;
    margin-right: 12px;
  }
  .info {
    flex: 1;
    overflow: hidden;
  }
}
</style>
