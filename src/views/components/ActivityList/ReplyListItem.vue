<i18n>
{
  "zh": {
    "reply": "回复",
    "post": "评论",
    "cancel": "取消",
    "delete": "删除",
    "notice": "提示",
    "noticeMessage": "此评论将被永久删除，是否确认？",
    "confirm": "确定",
    "successfulDeleted": "删除成功",
    "getReplies": "共 {count} 条回复",
    "getMoreReplies": "更多 {count} 条回复"
  },
  "en": {
    "reply": "Reply",
    "post": "Post",
    "cancel": "Cancel",
    "delete": "Delete",
    "notice": "Notice",
    "noticeMessage": "This reply will be deleted forever. Is it confirmed?",
    "confirm": "Confirm",
    "successfulDeleted": "Successful Deleted",
    "getReplies": "Total {count} replies",
    "getMoreReplies": "More {count} replies"
  }
}
</i18n>

<template>
  <div class="reply-list-item">
    <router-link :to="'/profile?uid=' + reply.user.id">
      <my-avatar
        :avatar-url="reply.user.avatar_url"
        class="reply-list-item__avatar"/>
    </router-link>
    <div class="reply-list-item__content">
      <p class="m0 f-14">
        <router-link :to="'/profile?uid=' + reply.user.id">
          <span class="bold black">{{ reply.user.name }}</span>
        </router-link>
        <span
          class="black-45"
          v-text="reply.user.title" />
        <template v-if="reply.reply_id">
          <span class="black-45"> {{ $t('reply') }}  </span>
          <router-link :to="'/profile?uid=' + reply.replyee.id">
            <span class="bold black">{{ reply.replyee.name }}</span>
          </router-link>
        </template>
      </p>
      <p
        class="m0 f-12 black-45"
        v-text="reply.created_at" />
      <p class="reply-list-item__content-text">{{ reply.content }}</p>
      <template v-if="showInput">
        <el-input
          ref="input"
          :maxlength="200"
          :placeholder="`${$t('reply')} ${reply.user.name}`"
          :autosize="{maxRows: 5}"
          v-model="content"
          size="small"
          type="textarea"
          rows="1"
          resize="none"
          class="reply-list-item__content-input"/>
        <div class="right-align">
          <el-button
            :loading="buttonLoading"
            :disabled="!content.length"
            size="small"
            type="primary"
            @click="onPost">{{ $t('post') }}</el-button>
          <el-button
            size="small"
            type="text"
            @click="showInput = false">{{ $t('cancel') }}</el-button>
        </div>
      </template>
      <div
        v-else
        class="reply-list-item__content-button-area right-align">
        <el-button
          type="text"
          size="mini"
          @click="onShowInput">{{ $t('reply') }}</el-button>
        <el-button
          v-if="isDeletable"
          size="mini"
          type="text"
          @click="onDelete">{{ $t('delete') }}</el-button>
      </div>
      <!-- 只有一级评论才显示子评论列表 -->
      <div
        v-if="!reply.reply_id && reply.reply_count"
        class="reply-list-item__reply-list">
        <reply-list-item
          v-for="(reply, index) in replies"
          :key="reply.id"
          :reply="reply"
          :activity="activity"
          @post="onPostInList"
          @delete="onDeleteInList(index)" />
        <el-button
          v-if="reply.reply_count > replies.length"
          :loading="listLoading"
          size="mini"
          type="text"
          @click="getReplies">{{ getRepliesText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postReplyByActivityId, deleteReply, getRepliesByReplyId } from '@/api/activity'
export default {
  name: 'ReplyListItem',
  props: {
    activity: {
      type: Object,
      default () {
        return {}
      }
    },
    reply: {
      type: Object,
      default () {
        return {
          id: 0,
          activity_id: 0,
          reply_id: null,
          content: '',
          created_at: '',
          replyee: {},
          user: {}
        }
      }
    }
  },
  data () {
    return {
      showInput: false,
      content: '',
      buttonLoading: false,
      replies: [],
      currentPage: 1,
      listLoading: false
    }
  },
  computed: {
    isDeletable () {
      const uid = this.$store.getters.uid
      return uid === this.reply.user_id || uid === this.activity.user_id
    },
    getRepliesText () {
      const count = this.reply.reply_count - this.replies.length
      if (this.replies.length) {
        return this.$t('getMoreReplies', { count })
      } else {
        return this.$t('getReplies', { count })
      }
    }
  },
  methods: {
    getReplies () {
      this.listLoading = true
      getRepliesByReplyId(this.reply.id, this.currentPage).then(({
        data: { data, meta: { pagination } }
      }) => {
        this.listLoading = false
        this.mergeReplies(data)
        this.reply.reply_count = pagination.total
        this.currentPage++
      }).catch(() => {
        this.listLoading = false
      })
    },
    onShowInput () {
      this.showInput = true
      this.$nextTick(() => this.$refs.input.focus())
    },
    // 回复当前评论
    onPost () {
      this.buttonLoading = true
      postReplyByActivityId(this.reply.activity_id, {
        content: this.content,
        reply_id: this.reply.id
      }).then(({ data }) => {
        // 如果当前评论是二级评论，那么重置data，将数据发给父组件
        if (this.reply.reply_id) {
          Object.assign(this.$data, this.$options.data())
          this.$emit('post', data)
        } else {
          // 如果当前评论是一级评论，将新评论添加到它收到的评论列表中
          this.content = ''
          this.reply.reply_count++
          this.mergeReplies(data, true)

          this.buttonLoading = false
          this.showInput = false
        }
      }).catch(() => {
        this.buttonLoading = false
      })
    },
    onDelete () {
      this.$confirm(this.$t('noticeMessage'), this.$t('notice'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        const { id, activity_id } = this.reply
        deleteReply(activity_id, id).then(() => {
          this.$emit('delete')
          this.$message.success(this.$t('successfulDeleted'))
        })
      }).catch(() => {})
    },
    onPostInList (reply) {
      this.mergeReplies(reply, true)
      this.reply.reply_count++
    },
    onDeleteInList (index) {
      this.replies.splice(index, 1)
      this.reply.reply_count--
    },
    /**
     * 将回复添加到数组当中，防止id重复
     * @param replies Array|Object
     * @param unshift Boolean
     */
    mergeReplies (replies, unshift = false) {
      if (Array.isArray(replies)) {
        replies = [ ...replies ] // 复制一下
      } else {
        replies = [ replies ]
      }
      if (unshift) {
        // 尽管merge方法本身就会修改原数组，但是必须要重新赋值一个新数组，否则vue不会检测到数组长度变化
        replies = this.filterReplies(replies)
        this.replies = [ ...replies, ...this.replies ]
      } else {
        replies = this.filterReplies(replies)
        this.replies = [ ...this.replies, ...replies ]
      }
    },
    // 过滤掉id重复的回复
    filterReplies (replies) {
      return replies.filter(v => !this.replies.some(vv => vv.id === v.id))
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #dddfe2;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  &__avatar {
    margin-right: 8px;
    width: 32px;
    height: 32px;
  }
  &__content {
    flex: 1;
    &-text {
      margin: 4px 0 0;
      font-size: 14px;
    }
    &-input {
      margin: 8px 0;
    }
    &-button-area > .el-button {
      padding: 0;
      margin-right: 0;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  &__reply-list {
    margin-top: 8px;
    background-color: rgba(0, 0, 0, 0.02);
    > .el-button--text {
      margin-left: 8px;
      color: #42a7cf;
    }
    > .reply-list-item {
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
