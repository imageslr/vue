<template>
  <div class="flex p-12">
    <my-avatar
      :avatar-url="participant.avatar_url"
      class="flex-none"/>
    <div class="flex-auto ml1">
      <p
        class="flex-1 m0 f-15 bold black"
        v-text="participant.name" />
      <p
        class="mt-4 m0 f-13 black-65 ellipsis-1"
        v-text="latestMessage.body" />
      <p
        class="mt-4 m0 f-12 black-65"
        v-text="thread.updated_at" />
    </div>
    <el-badge
      :value="unreadCount"
      :hidden="!unreadCount"
      :max="99" />
  </div>
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
  width: 24px;
  height: 24px;
}
.el-badge {
  /deep/ .el-badge__content {
    background-color: #f56c6c;
  }
}
</style>
