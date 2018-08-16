<i18n>
{
  "en": {
    "查看更多": "Load more",
    "发送": "Send"
  }
}
</i18n>
<template>
  <div class="main-container">
    <div
      v-loading="initing"
      class="card">
      <h1
        v-if="!initing"
        class="m0 p2 f-16 bold border-bottom center">
        <router-link
          tag="i"
          to="/message"
          class="el-icon-back" />
        {{ participant.name }}
      </h1>
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
        :placeholder="$t('按下Enter键发送')"
        size="small"
        @keyup.native.enter="onSend">
        <el-button
          slot="append"
          :loading="sending"
          type="primary"
          @click="onSend">{{ $t('发送') }}</el-button>
      </el-input>
    </div>
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
    threadId () {
      return this.$route.params.id
    },
    messages () {
      return this.$store.getters.messages
    },
    participant () {
      return this.$store.getters.participant
    }
  },
  created () {
    this.getMessages().then(() => {
      this.initing = false
      this.scrollToBottom()
    }).catch(() => {
      this.initing = false
    })
  },
  methods: {
    onSend () {
      const { textarea: body, threadId: id } = this
      if (this.sending || !body.trim()) return
      this.sending = true
      this.$store.dispatch('postMessageByThreadId', { id, body }).then(() => {
        this.textarea = ''
        this.$refs.input.blur()
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
  width: 700px;
  margin: 0 auto;
}
.el-icon-back {
  float: left;
  position: relative;
  top: 3px;
  cursor: pointer;
}
.message-box {
  height: 500px;
  padding: 0 15px 10px;
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
.el-input {
  border-radius: 0px;
  /deep/ .el-input__inner {
    border-radius: 0px;
  }
  /deep/ .el-input-group__append {
    border-radius: 0px;
  }
}
</style>
