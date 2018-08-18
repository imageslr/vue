<i18n>
{
  "en": {
    "关注": "Following",
    "粉丝": "Follower"
  }
}
</i18n>

<template>
  <div class="user-list-item">
    <router-link :to="'/profile?uid=' + user.id">
      <my-avatar
        :avatar-url="user.avatar_url"
        class="user-list-item__avatar"/>
    </router-link>
    <div class="user-list-item__info">
      <router-link
        :to="'/profile?uid=' + user.id"
        class="bold black-85">{{ user.name }}</router-link>
      <p>
        <span class="color-primary">{{ $t('关注') }}</span>
        <span v-text="user.following_count" />
        <span class="color-primary">{{ $t('粉丝') }}</span>
        <span v-text="user.follower_count" />
      </p>
      <p
        class="user-list-item__info-title"
        v-text="user.title" />
      <slot name="content">
        <p
          class="user-list-item__info-content"
          v-text="content || user.introduction" />
      </slot>
    </div>
    <slot name="action" />
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
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.user-list-item {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  font-size: 14px;
  &__avatar {
    width: 48px;
    height: 48px;
    margin-right: 24px;
  }
  &__info {
    flex: 1;
    overflow: hidden;
    margin-right: 24px;
    p {
      margin: 4px 0 0;
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }
  }
}
</style>
