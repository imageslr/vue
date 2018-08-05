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
        @click="onSend">{{ $t('post') }}</el-button>
    </div>
    <div
      v-loading="listLoading"
      class="reply-list-area">
      <template v-if="replies.length">
        <div
          v-for="reply in replies"
          :key="reply.id"
          class="reply-list-item">
          <router-link :to="'/profile?uid=' + reply.user.id">
            <my-avatar
              :avatar-url="reply.user.avatar_url"
              class="reply-list-item__avatar"/>
          </router-link>
          <div>
            <p class="m0 f-14">
              <router-link :to="'/profile?uid=' + reply.user.id">
                <span class="bold black">{{ reply.user.name }}</span>
              </router-link>
              <span
                v-t="reply.user.title"
                class="ml-4 f-13 black-45" />
            </p>
            <p
              v-t="reply.created_at"
              class="m0 f-12 black-45" />
            <p class="reply-list-item__content">{{ reply.content }}</p>
          </div>
        </div>
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
import { getRepliesByActivityId, postReplyByActivityId, deleteReply } from '@/api/activity'
export default {
  props: {
    activityId: {
      type: Number,
      required: true
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
    onSend () {
      if (!this.content) return
      this.buttonLoading = true
      postReplyByActivityId(this.activityId, {
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
      getRepliesByActivityId(this.activityId, page).then(({
        data: { data, meta: { pagination } }
      }) => {
        this.listLoading = false
        this.replies = data
        this.pageCount = pagination.total_pages
      }).catch(() => {
        this.listLoading = false
      })
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
    margin: 4px 0 0;
    font-size: 14px;
  }
}
</style>
