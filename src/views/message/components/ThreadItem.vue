<i18n>
{
  "zh": {

  },
  "en": {

  }
}
</i18n>

<template>
  <router-link
    :to="`/message/${thread.id}`"
    tag="div"
    class="flex">
    <my-avatar
      :avatar-url="participant.avatar_url"
      class="flex-none"/>
    <div class="flex-auto ml1">
      <div class="flex mb1">
        <p
          class="flex-1 m0 f-15 bold black ellipsis-1"
          v-text="participant.name" />
        <p
          class="m0 f-13 black-65"
          v-text="thread.updated_at" />
      </div>
      <div class="flex">
        <p
          class="flex-1 m0 f-13 black-65 ellipsis-1"
          v-text="latestMessage.body" />
        <el-badge
          :value="unreadCount"
          :hidden="!unreadCount"
          :max="99" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    thread: {
      type: Object,
      default () {
        return {
          id: null,
          unread_count: 0,
          latest_message: {
            id: null,
            body: '',
            created_at: ''
          },
          participant: {
            id: null,
            name: '',
            type: '',
            avatar_url: '',
            introduction: '',
            follower_count: 0,
            following_count: 0,
            following: false
          },
          created_at: '',
          updated_at: ''
        }
      }
    }
  },
  computed: {
    unreadCount () {
      return this.thread.unread_count
    },
    latestMessage () {
      return this.thread.latest_message
    },
    participant () {
      return this.thread.participant
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 48px;
  height: 48px;
}
.el-badge {
  /deep/ .el-badge__content {
    background-color: #f56c6c;
  }
}
</style>
