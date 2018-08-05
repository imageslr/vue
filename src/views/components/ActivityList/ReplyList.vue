<i18n>
{
  "zh": {
    "post": "发表",
    "placeholder": "说点什么吧~",
    "noReply": "暂无评论"
  },
  "en": {
    "post": "Post",
    "placeholder": "Reply something",
    "noReply": "No replies"
  }
}
</i18n>

<template>
  <div>
    <div class="reply-input-area">
      <my-avatar
        :avatar-url="user.avatar_url"
        class="reply-input-area__avatar"/>
      <el-input
        :maxlength="200"
        :placeholder="$t('placeholder')"
        :autosize="{maxRows: 5}"
        v-model="content"
        size="small"
        type="textarea"
        rows="1"
        resize="none"
        class="reply-input-area__input"/>
      <el-button
        :loading="buttonLoading"
        size="small"
        type="primary"
        class="reply-input-area__button"
        @click="onPost">{{ $t('post') }}</el-button>
    </div>
    <div
      v-loading="listLoading"
      class="reply-list-area">
      <template v-if="replies.length">
        <reply-list-item
          v-for="(reply, index) in replies"
          :key="reply.id"
          :reply="reply"
          :activity="activity"
          @post="onPostInItem"
          @delete="onDelete(index)" />
        <el-pagination
          :current-page.sync="currentPage"
          :page-count="pageCount"
          style="text-align: center; padding: 16px 0;"
          background
          layout="prev, pager, next"
          @current-change="getReplies"/>
      </template>
      <div
        v-t="$t('noReply')"
        v-else
        class="p2 center black-25 f-14" />
    </div>
  </div>
</template>

<script>
import { getRepliesByActivityId, postReplyByActivityId } from '@/api/activity'
import ReplyListItem from './ReplyListItem'
export default {
  components: { ReplyListItem },
  props: {
    activity: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      buttonLoading: false,
      content: '',
      replies: [],
      currentPage: 1,
      pageCount: 0,
      listLoading: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.getReplies()
  },
  methods: {
    onPost () {
      if (!this.content) return
      this.buttonLoading = true
      postReplyByActivityId(this.activity.id, {
        content: this.content
      }).then(({ data }) => {
        this.buttonLoading = false
        this.content = ''
        this.replies.unshift(data)
      }).catch(() => {
        this.buttonLoading = false
      })
    },
    getReplies (page) {
      this.listLoading = true
      this.replies = []
      getRepliesByActivityId(this.activity.id, page).then(({
        data: { data, meta: { pagination } }
      }) => {
        this.listLoading = false
        this.replies = data
        this.pageCount = pagination.total_pages
      }).catch(() => {
        this.listLoading = false
      })
    },
    onPostInItem (reply) {
      this.replies.unshift(reply)
    },
    onDelete (index) {
      this.replies.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-input-area {
  display: flex;
  padding: 8px 12px;
  background: #f6f7f9;
  border: 1px solid #dddfe2;
  &__avatar {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  &__input {
    flex: 1;
    margin-right: 8px;
  }
}
</style>
