<i18n>
{
  "zh": {
    "placeholder": "请输入你的评价内容，最多300字。如：张是一个很负责任的设计师，工作效率高，设计风格简约大气。"
  },
  "en": {
    "placeholder": "Please enter your review content, up to 300 words. For example, Zhang is a very responsible designer with high work efficiency and simple design style.",
    "评价用户": "Post your review",
    "写下你对该用户的评价，供其他人参考": "Write down your review of this user for others to refer to",
    "提交": "Submit",
    "请填写评价": "Please enter your review",
    "您已经评价过该用户": "You have already review this user",
    "您未收到该用户的邀请，无法发表评价": "You have not received an invitation from this user to post a review",
    "无权评价该用户": "Cannot review the user"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card form-card">
      <div class="border-bottom center p-24">
        <h1
          v-t="'评价用户'"
          class="m0 color-primary"/>
        <p
          v-t="'写下你对该用户的评价，供其他人参考'"
          class="m0 pt1 black-65 f-13"/>
      </div>
      <el-form
        v-loading="loading"
        :disabled="disabled"
        label-width="0"
        class="form"
        size="small">
        <el-form-item>
          <el-input
            v-model="content"
            :placeholder="$t('placeholder')"
            :rows="7"
            maxlength="300"
            type="textarea"/>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submitting"
            class="w-100"
            type="primary"
            @click="onSubmit">{{ $t('提交') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reviewUserByUID, canReviewUser } from '@/api/review'
export default {
  data () {
    return {
      content: '',
      loading: true, // 是否正在加载用户评价状态
      disabled: true, // 表单是否全部禁用
      submitting: false
    }
  },
  computed: {
    pageUID () {
      return this.$route.query.uid
    }
  },
  created () {
    if (!this.pageUID) {
      this.$router.replace('/404')
    }
    canReviewUser(this.pageUID).then(({ data }) => {
      this.loading = false
      if (data.can) {
        this.disabled = false
      } else {
        return this.$alert(this.$t('无权评价该用户'))
      }
    }).catch(() => {
      this.loading = false
    })
  },
  methods: {
    onSubmit () {
      const { content, pageUID } = this
      if (!content) {
        return this.$message.warning(this.$t('请填写评价'))
      }
      this.submitting = true
      reviewUserByUID(pageUID, content).then(() => {
        this.submitting = true
        this.$router.push('/review/result')
      }).catch(() => {
        this.submitting = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-card {
  padding: 0 32px 16px;
}
.form {
  width: 800px;
  position: relative;
  left: 50%;
  margin-left: -400px;
  padding-top: 32px;
}
</style>
