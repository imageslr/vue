<i18n>
{
  "en": {
    "上传认证信息": "Upload Authentication Information",
    "资质证书": "Qualification certificates",
    "您可以上传最多 20 张资历证书，如设计证书、学位证书等": "You can upload up to 20 qualification certificates, such as design certificates, degree certificates, etc.",
    "身份证号": "ID Number",
    "身份证照片": "ID Card",
    "上传图片": "Upload photo",
    "提交成功": "Successful Operation",
    "最多50个字符": "50 characters at most",
    "正在上传文件，请稍后": "File uploading, please wait",
    "已提交，点击下载文件": "Has already committed, click to download",
    "注意": "Notice",
    "身份证信息上传后无法修改！": "Once the id card information is uploaded, it cannot be modified!",
    "身份证照片请上传人像面！": "Please upload a portrait of the ID card!",
    "身份证信息一经上传将无法修改，确定上传吗？": "Once the id card information is uploaded, it cannot be modified. Is it confirmed?"
  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="'上传认证信息'"
      class="mt0" />
    <el-form
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
          :disabled="!!user.id_number"
          v-model="form.id_number"
          maxlength="100"/>
        <el-card class="tips-card">
          <h4
            v-t="'注意'"
            class="m0 mb1 f-16" />
          <div v-t="'身份证信息上传后无法修改！'" />
          <div v-t="'身份证照片请上传人像面！'" />
        </el-card>
      </el-form-item>
      <el-form-item :label="$t('身份证照片')" >
        <my-alert v-if="user.id_card_url"><a
          :href="user.id_card_url"
          target="_blank">{{ $t('已提交，点击下载文件') }}</a></my-alert>
        <my-upload
          v-else
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
          :loading="loading"
          type="primary"
          @click="onSubmit">{{ $t('g.submitBtn') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateCurrentUserInfo } from '@/api/user'
export default {
  data () {
    return {
      form: {
        id_number: '',
        id_card_id: null
      },
      uploadingIdCard: false, // 是否正在上传身份证照片
      loading: false // 是否正在提交表单中
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    const user = this.$store.getters.userInfo
    this.form.id_number = user.id_number
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

      this.$confirm(this.$t('身份证信息一经上传将无法修改，确定上传吗？'), this.$t('g.notice'), {
        confirmButtonText: this.$t('g.confirmBtn'),
        cancelButtonText: this.$t('g.cancelBtn'),
        type: 'warning'
      }).then(() => {
        this.loading = true

        // 要上传的数据
        let dirtyForm = {}
        const { form, user } = this
        if (form.id_number !== user.id_number) dirtyForm.id_number = form.id_number
        if (form.id_card_id) dirtyForm.id_card_id = form.id_card_id
        dirtyForm.qualification_urls = qualificationUrls

        updateCurrentUserInfo(dirtyForm).then(({ data }) => {
          this.loading = false
          this.$store.commit('SET_USERINFO', data)
          this.$message.success(this.$t('提交成功'))
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {})
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
