
<template>
  <div class="main-container">
    <div
      v-scroll-bottom="messages"
      class="card">
      <el-scrollbar wrap-style="height: 500px;">
        <ul class="message-box list-reset">
          <li
            v-for="item in messages"
            :key="item.id"
            class="message-item">
            <fieldset class="message-item__time">
              <legend>{{ item.created_at | time }}</legend>
            </fieldset>
            <message-item
              :message="item"
              :participant="participant" />
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import MessageItem from './components/MessageItem'
export default {
  components: { MessageItem },
  filters: {
    // 将日期过滤为 hour:minutes
    time (date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      return date.getHours() + ':' + date.getMinutes()
    }
  },
  directives: {
    // 发送消息后滚动到底部
    'scroll-bottom' (el, binding, vnode) {
      vnode.context.$nextTick(() => {
        el.scrollTop = el.scrollHeight - el.clientHeight
      })
    }
  },
  computed: {
    threadId () {
      return this.$route.params.id
    },
    messages () {
      return this.$store.getters.messages
    },
    participant () {
      return this.$store.getters.participant
    },
    currentUserAvatar () {
      return this.$store.getters.userInfo.avatar_url
    },
    participantAvatar () {
      return this.participant.avatar_url
    }
  },
  created () {
    this.$store.dispatch('getMessagesByThreadId', { id: this.threadId })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 700px;
  margin: 0 auto;
}
.message-box {
  height: 700px;
  padding: 10px 15px;
  .message-item {
    margin-bottom: 15px;
    &__time {
      position: relative;
      margin: 25px 82px 14px;
      border-width: 1px 0 0 0;
      border-style: dashed;
      border-color: #d9d9d9;
      > legend {
        position: absolute;
        top: -9px;
        left: 50%;
        width: 108px;
        margin-left: -54px;
        text-align: center;
        font-size: 12px;
        font-weight: normal;
        color: rgba($color: #000000, $alpha: 0.45);
        background-color: #fff;
      }
    }
  }
}
</style>
