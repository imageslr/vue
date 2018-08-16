<template>
  <div
    :class="{ 'is-self': isSelf }"
    class="message-item">
    <router-link
      :to="'/profile?uid=' + message.user_id">
      <my-avatar
        :avatar-url="isSelf ? currentUser.avatar_url : participant.avatar_url"
        class="message-item__avatar"/>
    </router-link>
    <div class="message-item__text">{{ message.body }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default () {
        return {}
      }
    },
    participant: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.userInfo
    },
    isSelf () {
      return this.message.user_id === this.currentUser.id
    }
  }
}
</script>

<style lang="scss" scoped>
.message-item {
  margin-bottom: 15px;
  &__avatar {
    float: left;
    width: 30px;
    height: 30px;
    margin: 0 12px 0 0;
    border: none;
  }
  &__text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: calc(100% - 40px);
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;
    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }
  &.is-self {
    text-align: right;
    .message-item__avatar {
      float: right;
      margin: 0 0 0 12px;
    }
    .message-item__text {
      background-color: #b2e281;
      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}
</style>
