<template>
  <div class="designer-card">
    <router-link :to="'profile?uid=' + designer.id">
      <my-avatar
        :avatar-url="designer.avatar_url"
        class="designer-card__avatar"/>
    </router-link>
    <div>
      <router-link :to="'profile?uid=' + designer.id">
        <h3
          style="font-size: 18px;"
          class="m0 mt1 mb1 ellipsis-1 black">{{ designer.name }}</h3>
      </router-link>
      <p class="m0 mb1 f-14 black-45 ellipsis-1">{{ designer.title || $t('设计师') }}</p>
      <div class="f-12">
        <span class="black-65">{{ $t('g.following') }}</span>
        <span
          class="black-45"
          v-text="designer.following_count" />
        <span class="black-65">{{ $t('g.fans') }}</span>
        <span
          class="black-45"
          v-text="designer.follower_count" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    designer: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.designer-card {
  min-width: 240px;
  padding: 32px 24px 40px;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 1px 1px 10px rgba(204, 204, 204, 0.4);
  &__avatar {
    width: 72px;
    height: 72px;
    margin-right: 16px;
  }
}
</style>
