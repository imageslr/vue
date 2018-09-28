<i18n>
{
  "zh": {
    "reviewStatusMessages": [
      "您的个人信息正在审核中",
      "您的个人信息已通过审核",
      "您的个人信息未通过审核，您可以修改后重新申请审核"
    ]
  },
  "en": {
    "reviewStatusMessages": [
      "Your personal information is under review",
      "Your personal information has passed the review",
      "Your personal information has not been reviewed. You can edit it and re-apply for review."
    ],

    "上传认证信息": "Upload Authentication Information",
    "资质证书": "Qualification certificates",
    "您可以上传最多 20 张资历证书，如设计证书、学位证书等": "You can upload up to 20 qualification certificates, such as design certificates, degree certificates, etc.",
    "身份证号": "ID Number",
    "身份证照片": "ID Card",
    "上传图片": "Upload photo",

    "申请重新审核": "Re-apply for review",

    "已提交，点击下载文件": "Has already committed, click to download",

    "注意": "Notice",
    "身份证信息通过审核后无法修改！": "Once the id card information passes the review, it cannot be modified!",
    "身份证照片请上传人像面！": "Please upload a portrait of the ID card!",

    "提交成功": "Successful Operation",
    "最多50个字符": "50 characters at most",
    "正在上传文件，请稍后": "File uploading, please wait",
    "身份证信息通过审核后将无法修改，确定上传吗？": "Once the id card information passes the review, it cannot be modified. Is it confirmed?",
    "申请重新审核成功": "Successfully re-apply for review"

  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="'上传认证信息'"
      class="mt0" />
    <my-alert
      v-if="!loading"
      :title="reviewStatusMessage"
      :type="reviewStatusStyle"
      class="mb1"
      style="width: 600px"/>
    <el-form
      v-loading="loading"
      ref="form"
      label-position="top">
      <el-form-item :label="$t('资质证书')">
        <my-multi-upload
          ref="upload"
          :limit="20"
          :image-urls="user.qualification_urls"
          type="work_photo" />
        <el-card class="tips-card">
          <span v-t="'您可以上传最多 20 张资历证书，如设计证书、学位证书等'" />
        </el-card>
      </el-form-item>
      <el-form-item :label="$t('身份证号')" >
        <el-input
          :disabled="isReviewPassed"
          v-model="form.id_number"
          maxlength="100"/>
        <el-card class="tips-card">
          <h4
            v-t="'注意'"
            class="m0 mb1 f-16" />
          <div v-t="'身份证信息通过审核后无法修改！'" />
          <div v-t="'身份证照片请上传人像面！'" />
        </el-card>
      </el-form-item>
      <el-form-item :label="$t('身份证照片')" >
        <my-alert
          v-if="user.id_card_url"
          class="mb1"><a
            :href="user.id_card_url"
            target="_blank">{{ $t('已提交，点击下载文件') }}</a></my-alert>
        <my-upload
          v-if="!isReviewPassed"
          :button-text="$t('上传图片')"
          :max-size="2"
          type="id_card"
          accept="image/jpeg, image/jpg, image/png, image/bmp"
          @start="onUploadStart"
          @success="onUploadSuccess"
          @error="onUploadError"
          @remove="onUploadRemove"/>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="submitting"
          type="primary"
          @click="onSubmit">{{ $t('g.submitBtn') }}</el-button>
        <el-button
          v-if="isReviewFailed"
          :loading="applying"
          @click="onApplyReview">{{ $t('申请重新审核') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateCurrentUserInfo, applyReview } from '@/api/user'
export default {
  data () {
    return {
      form: {
        id_number: '',
        id_card_id: null
      },
      uploadingIdCard: false, // 是否正在上传身份证照片
      submitting: false, // 是否正在提交表单中
      loading: true, // 是否正在加载用户个人信息
      applying: false // 是否正在申请重新审核
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo
    },
    isReviewPassed () {
      const { review_status } = this.$store.getters.userInfo
      return review_status === 1
    },
    isReviewFailed () {
      const { review_status } = this.$store.getters.userInfo
      return review_status === 2
    },
    reviewStatusStyle () {
      const { review_status } = this.$store.getters.userInfo
      const styles = ['warning', 'success', 'warning']
      return styles[review_status]
    },
    reviewStatusMessage () {
      const { review_status } = this.$store.getters.userInfo
      return this.$t(`reviewStatusMessages[${review_status}]`)
    }
  },
  created () {
    this.$store.dispatch('GET_USER_INFO').then(() => {
      this.loading = false
      const user = this.$store.getters.userInfo
      this.form.id_number = user.id_number
    }).catch(() => {
      this.loading = false
    })
  },
  beforeDestroy () {
    this.$refs.upload.clear() // 取消所有上传请求
  },
  methods: {
    onSubmit () {
      let qualificationUrls = this.$refs.upload.getImageUrls()
      if (qualificationUrls === false || this.uploadingIdCard) {
        return this.$message.warning(this.$t('正在上传文件，请稍后'))
      }

      this.$confirm(this.$t('身份证信息通过审核后将无法修改，确定上传吗？'), this.$t('g.notice'), {
        confirmButtonText: this.$t('g.confirmBtn'),
        cancelButtonText: this.$t('g.cancelBtn'),
        type: 'warning'
      }).then(() => {
        this.submitting = true

        // 要上传的数据
        let dirtyForm = {}
        const { form, user } = this
        if (form.id_number !== user.id_number) dirtyForm.id_number = form.id_number
        if (form.id_card_id) dirtyForm.id_card_id = form.id_card_id
        dirtyForm.qualification_urls = qualificationUrls

        updateCurrentUserInfo(dirtyForm).then(({ data }) => {
          this.submitting = false
          this.$store.commit('SET_USERINFO', data)
          this.$message.success(this.$t('提交成功'))
        }).catch(() => {
          this.submitting = false
        })
      }).catch(() => {})
    },
    onApplyReview () {
      this.applying = true
      applyReview().then(({ data }) => {
        this.applying = false
        this.$store.commit('SET_USERINFO', data)
        this.$message.success(this.$t('申请重新审核成功'))
      }).catch(() => {
        this.applying = false
      })
    },
    onUploadStart () {
      this.uploadingIdCard = true
    },
    onUploadSuccess (event) {
      this.uploadingIdCard = false
      this.form['id_card_id'] = event.id
    },
    onUploadError () {
      this.uploadingIdCard = false
    },
    onUploadRemove () {
      this.form['id_card_id'] = null
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 24px 32px;
  .el-form {
    width: 600px;
  }
  .alert > a {
    line-height: 20px;
  }
}
.tips-card {
  position: absolute;
  top: 0px;
  left: 660px;
  width: 250px;
  font-size: 14px;
  line-height: 1.8em;
  color: rgba($color: #000000, $alpha: 0.65);
}
</style>
