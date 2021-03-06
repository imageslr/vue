<i18n>
{
  "en": {
    "查看更多": "Load more",
    "发送": "Send",
    "按下Enter键发送，最多300字": "Type Enter to send, 300 characters at most"
  }
}
</i18n>
<template>
  <div
    v-loading="initing"
    class="card">
    <div
      ref="messageBox"
      class="message-box">
      <div
        v-if="!initing && !nomore"
        class="center pt1">
        <i
          v-if="loading"
          class="el-icon-loading" />
        <el-button
          v-else
          type="text"
          size="mini"
          @click="onLoadMore">{{ $t('查看更多') }}</el-button>
      </div>
      <ul class="list-reset">
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
    </div>
    <el-input
      ref="input"
      v-model="textarea"
      :placeholder="$t('按下Enter键发送，最多300字')"
      maxlength="300"
      size="small"
      class="chat-input"
      @keyup.native.enter="onSend">
      <el-button
        slot="append"
        :loading="sending"
        type="primary"
        @click="onSend">{{ $t('发送') }}</el-button>
    </el-input>
  </div>
</template>

<script>
import MessageItem from './components/MessageItem'
import Dayjs from 'dayjs'
import { getToday } from '@/utils'
export default {
  components: { MessageItem },
  filters: {
    // 将日期过滤为 hour:minutes
    time (date) {
      let dayjs = Dayjs(date)
      let today = Dayjs(getToday())
      if (today.isBefore(dayjs)) {
        return dayjs.format('HH:mm:ss')
      } else {
        return dayjs.format('M-D HH:mm:ss')
      }
    }
  },
  props: {
    threadId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      textarea: '',
      currentPage: 0,
      initing: true, // 是否正在初始化
      loading: false, // 是否正在加载
      nomore: false,
      sending: false // 是否正在发送消息
    }
  },
  computed: {
    messages () {
      return this.$store.getters.messages
    },
    participant () {
      return this.$store.getters.participant
    }
  },
  watch: {
    threadId () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      Object.assign(this.$data, this.$options.data())
      this.getMessages().then(() => {
        this.initing = false
        this.scrollToBottom()
      }).catch(() => {
        this.initing = false
      })
    },
    onSend () {
      const { textarea: body, threadId: id } = this
      if (this.sending || !body.trim()) return
      this.sending = true
      this.$store.dispatch('postMessageByThreadId', { id, body }).then(() => {
        this.textarea = ''
        // this.$refs.input.blur()
        this.sending = false
        this.scrollToBottom()
      }).catch(() => {
        this.sending = false
      })
    },
    getMessages () {
      return this.$store.dispatch('getMessagesByThreadId', {
        id: this.threadId,
        page: this.currentPage + 1
      }).then((pagination) => {
        this.currentPage = pagination.current_page
        this.nomore = pagination.total_pages <= pagination.current_page
      })
    },
    onLoadMore () {
      this.loading = true
      this.getMessages().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    scrollToBottom () {
      let el = this.$refs.messageBox
      el.scrollTop = el.scrollHeight - el.clientHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  .chat-input {
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0px;
    /deep/ .el-input__inner {
      border-radius: 0px;
    }
    /deep/ .el-input-group__append {
      border-radius: 0px;
    }
  }
}
.message-box {
  height: 100%;
  padding: 0 15px 42px;
  margin: 0;
  overflow-y: scroll;
  .message-item {
    margin-bottom: 15px;
    &__time {
      position: relative;
      margin: 25px 43px 14px;
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
