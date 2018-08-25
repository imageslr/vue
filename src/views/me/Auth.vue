<i18n>
{
  "en": {
    "上传认证信息": "Upload Authentication Information",
    "公司名": "Company Name",
    "注册号": "Registration Number",
    "营业执照": "Business License",
    "身份证号": "ID Number",
    "身份证照片": "ID Card",
    "上传图片": "Upload photo",
    "确定上传": "Confirm",
    "上传成功": "Successful Operation",
    "最多50个字符": "50 characters at most",
    "正在上传文件，请稍后": "File uploading, please wait",
    "已提交，点击下载文件": "Has already committed, click to download",
    "注意": "Notice",
    "认证信息一经上传将无法修改！": "Once the certification information is uploaded, it cannot be modified!",
    "身份证照片请上传人像面！": "Please upload a portrait of the ID card!",
    "认证信息一经上传将无法修改，确定上传吗？": "Once the certification information is uploaded, it cannot be modified. Is it confirmed?"
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
      <el-form-item :label="$t('公司名')">
        <el-input
          :disabled="!!user.company_name"
          v-model="form.company_name"
          :placeholder="$t('最多50个字符')"
          maxlength="50"/>
        <el-card class="tips-card">
          <h4
            v-t="'注意'"
            class="m0 f-16" />
          <p v-t="'认证信息一经上传将无法修改！'" />
          <p
            v-t="'身份证照片请上传人像面！'"
            class="mb0" />
        </el-card>
      </el-form-item>
      <el-form-item :label="$t('注册号')" >
        <el-input
          :disabled="!!user.registration_number"
          v-model="form.registration_number"
          maxlength="100"/>
      </el-form-item>
      <el-form-item :label="$t('营业执照')" >
        <my-alert v-if="user.business_license_url" ><a
          :href="user.business_license_url"
          target="_blank">{{ $t('已提交，点击下载文件') }}</a></my-alert>
        <my-upload
          v-else
          :button-text="$t('上传图片')"
          :max-size="2"
          accept="image/jpeg, image/jpg, image/png, image/bmp"
          type="business_license"
          @start="onUploadStart(0)"
          @success="onUploadSuccess(0, $event)"
          @error="onUploadError(0)"
          @remove="onUploadRemove(0)"/>
      </el-form-item>
      <el-form-item :label="$t('身份证号')" >
        <el-input
          :disabled="!!user.id_number"
          v-model="form.id_number"
          maxlength="100"/>
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
          @start="onUploadStart(1)"
          @success="onUploadSuccess(1, $event)"
          @error="onUploadError(1)"
          @remove="onUploadRemove(1)"/>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="!hiddenButton"
          :disabled="disabled"
          :loading="loading"
          type="primary"
          @click="onSubmit">{{ $t('确定上传') }}</el-button>
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
        company_name: '',
        registration_number: '',
        id_number: '',
        business_license_id: null,
        id_card_id: null
      },
      loading: false, // 是否正在提交表单中
      uploadings: [
        false, // 营业执照
        false // 身份证照片
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo
    },
    // 只上传脏数据
    dirtyForm () {
      const { form, user } = this
      let dirtyForm = {}
      if (form.company_name !== user.company_name) dirtyForm['company_name'] = form.company_name
      if (form.registration_number !== user.registration_number) dirtyForm['registration_number'] = form.registration_number
      if (form.id_number !== user.id_number) dirtyForm['id_number'] = form.id_number
      if (form.business_license_id) dirtyForm['business_license_id'] = form.business_license_id
      if (form.id_card_id) dirtyForm['id_card_id'] = form.id_card_id
      return dirtyForm
    },
    disabled () {
      return JSON.stringify(this.dirtyForm) === '{}' // 没有数据修改过的话就禁用按钮
    },
    // 所有数据都已设置时，无法修改
    hiddenButton () {
      const user = this.$store.getters.userInfo
      return user.company_name && user.registration_number &&
      user.id_number && user.business_license_url && user.id_card_url
    }
  },
  created () {
    const user = this.$store.getters.userInfo
    this.form = {
      ...this.form,
      company_name: user.company_name,
      registration_number: user.registration_number,
      id_number: user.id_number
    }
  },
  methods: {
    onSubmit () {
      if (this.uploadings[0] || this.uploadings[1]) {
        return this.$message.warning(this.$t('正在上传文件，请稍后'))
      }
      this.$confirm(this.$t('认证信息一经上传将无法修改，确定上传吗？'), this.$t('g.notice'), {
        confirmButtonText: this.$t('g.confirmBtn'),
        cancelButtonText: this.$t('g.cancelBtn'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        updateCurrentUserInfo(this.dirtyForm).then(({ data }) => {
          this.loading = false
          this.$store.commit('SET_USERINFO', data)
          this.$message.success(this.$t('上传成功'))
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {})
    },
    onUploadStart (index) {
      this.uploadings[index] = true
    },
    onUploadSuccess (index, data) {
      this.uploadings[index] = false
      this.form[index ? 'id_card_id' : 'business_license_id'] = data.id
    },
    onUploadError (index) {
      this.uploadings[index] = false
    },
    onUploadRemove (index) {
      this.form[index ? 'id_card_id' : 'business_license_id'] = null
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
