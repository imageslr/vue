<i18n>
{
  "zh": {
    "tips": "如果您代表一家企业，您可以在姓名或职位处填写您的公司名，在简介处填写您的公司简介。",
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

    "编辑个人资料": "Edit Personal Information",
    "头像": "Avatar",
    "设置头像": "Set avatar",
    "姓名": "Name",
    "职位/公司": "Title/Company",
    "简介": "Introduction",
    "专业领域": "Professional Fields",
    "手机号": "Phone",
    "邮箱": "Email",
    "银行卡号": "Bank Card Number",
    "开户行": "Bank Name",
    "开户名": "Account Name",
    "请准确填写银行卡相关信息，以保证顺利接收设计费": "Please fill in the relevant information of the bank card accurately to ensure the smooth reception of design fees.",
    "还未绑定邮箱": "Have not bound email yet",
    "应用修改": "Update",
    "申请重新审核": "Re-apply for review",

    "中文名或英文名，2~50个字符": "2 to 50 characters",
    "最多50个字符": "50 characters at most",
    "最多200个字符": "200 characters at most",
    "请输入你的真实姓名": "Please enter your real name (between 2 to 50 characters)",

    "tips": "If you represent a company, you can enter your company name in Name or Title field, and enter your company introduction in Introduction field.",

    "建筑设计": "Architectural Design",
    "室内设计": "Interior Design",
    "景观设计": "Landscape Design",
    "城市设计": "Urban Design",
    "城市规划": "Urban Planning",
    "概念规划": "Conceptual Planning",

    "修改成功": "Successful Operation",
    "上传文件大小不能超过2MB！": "File max size is 2 MB",
    "正在上传附件，请稍后": "File uploading, please wait",
    "申请重新审核成功": "Successfully re-apply for review"
  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="'编辑个人资料'"
      class="mt0" />
    <!-- <my-alert
      v-if="!loading"
      :title="reviewStatusMessage"
      :type="reviewStatusStyle"
      class="mb1"
      style="width: 600px"/> -->
    <el-form
      v-loading="loading"
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top">
      <el-form-item :label="$t('头像')">
        <img
          v-if="form.avatar_url"
          :src="form.avatar_url"
          class="avatar"
          @click="showCropper">
        <el-button
          v-else
          @click="showCropper">{{ $t('设置头像') }}</el-button>
        <my-upload
          v-model="isCropperShowing"
          :width="300"
          :height="300"
          :headers="header"
          :params="{type: 'avatar'}"
          :url="uploadUrl"
          :lang-type="language"
          field="file"
          img-format="png"
          @crop-upload-success="onCropUploadSuccess"/>
      </el-form-item>
      <el-form-item
        :label="$t('姓名')"
        prop="name">
        <el-input
          v-model="form.name"
          :placeholder="$t('中文名或英文名，2~50个字符')"
          maxlength="50"/>
        <el-card class="tips-card">{{ $t('tips') }}</el-card>
      </el-form-item>
      <el-form-item :label="$t('职位/公司')" >
        <el-input
          v-model="form.title"
          :placeholder="$t('最多50个字符')"
          maxlength="50"/>
      </el-form-item>
      <el-form-item :label="$t('简介')" >
        <el-input
          v-model="form.introduction"
          :placeholder="$t('最多200个字符')"
          autosize
          type="textarea"
          rows="1"
          resize="none"
          maxlength="200"/>
      </el-form-item>
      <el-form-item
        v-if="$isDesigner()"
        :label="$t('专业领域')">
        <el-checkbox-group v-model="form.professional_fields">
          <el-checkbox
            v-for="field in fields"
            :key="field"
            :label="$t(`${field}`)"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('邮箱')" >
        <el-input
          :value="$store.getters.userInfo.email || $t('还未绑定邮箱')"
          disabled/>
      </el-form-item>
      <el-form-item
        :label="$t('手机号')"
        prop="phone">
        <el-input
          :value="$store.getters.userInfo.phone"
          disabled/>
      </el-form-item>
      <template v-if="$isDesigner()">
        <el-form-item :label="$t('银行卡号')" >
          <el-input
            v-model="form.bank_card_number"
            maxlength="100"/>
          <el-card class="tips-card">
            <span v-t="'请准确填写银行卡相关信息，以保证顺利接收设计费'" />
          </el-card>
        </el-form-item>
        <el-form-item :label="$t('开户行')" >
          <el-input
            v-model="form.bank_name"
            maxlength="100"/>
        </el-form-item>
        <el-form-item :label="$t('开户名')" >
          <el-input
            v-model="form.account_name"
            maxlength="100"/>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button
          :loading="submitting"
          @click="onSubmit">{{ $t('应用修改') }}</el-button>
          <!-- <el-button
          v-if="isReviewFailed"
          :loading="applying"
          @click="onApplyReview">{{ $t('申请重新审核') }}</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { namePattern } from '@/utils/validate'
import { updateCurrentUserInfo, applyReview } from '@/api/user'
import { BASE_API } from '@/utils/request'
import myUpload from 'vue-image-crop-upload'
export default {
  components: { myUpload },
  data () {
    return {
      uploadUrl: BASE_API + '/uploads',
      header: {
        Authorization: `Bearer ${this.$store.getters.token}`
      },
      fields: ['建筑设计', '室内设计', '景观设计', '城市设计', '城市规划', '概念规划'],
      form: {
        name: '',
        title: '',
        introduction: '',
        avatar_url: '',

        // 这四个只有设计师有
        professional_fields: [],
        account_name: '',
        bank_name: '',
        bank_card_number: ''
      },
      rules: {
        name: [
          { required: true, message: this.$t('请输入你的真实姓名') },
          { pattern: namePattern, min: 1, max: 50, message: this.$t('中文名或英文名，2~50个字符') }
        ]
      },
      isCropperShowing: false, // 是否显示图片裁切
      submitting: false, // 是否正在提交表单中
      loading: true, // 是否正在加载用户个人信息
      applying: false // 是否正在申请重新审核
    }
  },
  computed: {
    language () {
      return this.$store.getters.language
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
  watch: {
    language () {
      this.form.professional_fields = []
    }
  },
  created () {
    this.$store.dispatch('GET_USER_INFO').then(() => {
      this.loading = false
      const user = this.$store.getters.userInfo
      Object.keys(this.form).forEach(key => {
        this.form[key] = user[key]
      })
    }).catch(() => {
      this.loading = false
    })
  },
  methods: {
    showCropper () {
      this.isCropperShowing = true
    },
    onSubmit () {
      if (this.avatarUploading) {
        return this.$message.warning(this.$t('正在上传附件，请稍后'))
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitting = true
          updateCurrentUserInfo(this.form).then(({ data }) => {
            this.submitting = false
            this.$store.commit('SET_USERINFO', data)
            this.$message.success(this.$t('修改成功'))
          }).catch(() => {
            this.submitting = false
          })
        }
      })
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
    onCropUploadSuccess (data, field) {
      this.form.avatar_url = data.path
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
}
.tips-card {
  position: absolute;
  top: 0px;
  left: 660px;
  width: 260px;
  font-size: 14px;
  line-height: 1.8em;
  color: rgba($color: #000000, $alpha: 0.65);
}
.avatar {
  display: block;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    border-color: #29b2fe;
  }
}
</style>
