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
    "successfulDeleted": "删除成功"
  },
  "en": {
    "reply": "Reply",
    "post": "Post",
    "cancel": "Cancel",
    "delete": "Delete",
    "notice": "Notice",
    "noticeMessage": "This reply will be deleted forever. Is it confirmed?",
    "confirm": "Confirm",
    "successfulDeleted": "Successful Deleted"
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
          v-t="reply.user.title"
          class="black-45" />
        <template v-if="reply.replyee_id">
          <span class="black-45"> {{ $t('reply') }}  </span>
          <router-link :to="'/profile?uid=' + reply.replyee_id">
            <span class="bold black">{{ reply.replyee_name }}</span>
          </router-link>
        </template>
      </p>
      <p
        v-t="reply.created_at"
        class="m0 f-12 black-45" />
      <p class="reply-list-item__content-text">{{ reply.content }}</p>
      <template v-if="showInput">
        <el-input
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
          @click="showInput = true">{{ $t('reply') }}</el-button>
        <el-button
          v-if="isDeletable"
          size="mini"
          type="text"
          @click="onDelete">{{ $t('delete') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { postReplyByActivityId, deleteReply } from '@/api/activity'
export default {
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
          content: '',
          created_at: '',
          replyee_id: null,
          replyee_name: '',
          user: {
            name: ''
          }
        }
      }
    }
  },
  data () {
    return {
      showInput: false,
      content: '',
      buttonLoading: false
    }
  },
  computed: {
    isDeletable () {
      const uid = this.$store.getters.uid
      return uid === this.reply.user_id || uid === this.activity.user_id
    }
  },
  methods: {
    onPost () {
      this.buttonLoading = true
      postReplyByActivityId(this.reply.activity_id, {
        content: this.content,
        replyee_id: this.reply.user.id,
        reply_id: this.reply.id
      }).then(({ data }) => {
        Object.assign(this.$data, this.$options.data()) // 重置data
        this.$emit('post', data)
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
}
</style>
