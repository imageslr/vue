<i18n>
{
  "zh": {
    "tips": "如果您代表一家企业，您可以在姓名或职位处填写您的公司名，在简介处填写您的公司简介。"
  },
  "en": {
    "编辑个人资料": "Edit Personal Information",
    "头像": "Avatar",
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
    "修改成功": "Successful Operation",
    "中文名或英文名，2~50个字符": "2 to 50 characters",
    "最多50个字符": "50 characters at most",
    "最多200个字符": "200 characters at most",
    "请输入你的真实姓名": "Please enter your real name (between 2 to 50 characters)",
    "上传文件大小不能超过2MB！": "File max size is 2 MB",
    "正在上传附件，请稍后": "File uploading, please wait",
    "tips": "If you represent a company, you can enter your company name in Name or Title field, and enter your company introduction in Introduction field.",
    "建筑设计": "Architectural Design",
    "室内设计": "Interior Design",
    "景观设计": "Landscape Design",
    "城市设计": "Urban Design",
    "城市规划": "Urban Planning",
    "概念规划": "Concept Planning"
  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="'编辑个人资料'"
      class="mt0" />
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="top">
      <el-form-item :label="$t('头像')">
        <el-upload
          v-loading="avatarUploading"
          :show-file-list="false"
          :http-request="onUpload"
          :before-upload="beforeFileUpload"
          class="avatar-uploader"
          accept="image/jpeg, image/jpg, image/png, image/bmp"
          action="">
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            class="avatar">
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
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
      <el-form-item :label="$t('专业领域')">
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
      <el-form-item>
        <el-button
          :loading="loading"
          @click="onSubmit">{{ $t('应用修改') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { namePattern } from '@/utils/validate'
import { updateCurrentUserInfo } from '@/api/user'
import { upload } from '@/api/upload'
export default {
  data () {
    return {
      fields: ['建筑设计', '室内设计', '景观设计', '城市设计', '城市规划', '概念规划'],
      form: {
        name: '',
        title: '',
        introduction: '',
        // avatar_id: null, 这个属性一开始是没有的，只有上传了图片才有
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
      loading: false, // 是否正在提交表单中
      avatarUploading: false,
      avatarUrl: ''
    }
  },
  computed: {
    language () {
      return this.$store.getters.language
    }
  },
  watch: {
    language () {
      this.form.professional_fields = []
    }
  },
  created () {
    const user = this.$store.getters.userInfo
    Object.keys(this.form).forEach(key => {
      this.form[key] = user[key]
    })
    this.avatarUrl = user.avatar_url
  },
  methods: {
    onSubmit () {
      if (this.avatarUploading) {
        return this.$message.warning(this.$t('正在上传附件，请稍后'))
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          updateCurrentUserInfo(this.form).then(({ data }) => {
            this.loading = false
            this.$store.commit('SET_USERINFO', data)
            this.$message.success(this.$t('修改成功'))
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    beforeFileUpload (file) {
      const isLessThan = file.size / 1024 / 1024 < 2
      if (!isLessThan) {
        this.$message.error(this.$t('上传文件大小不能超过2MB！'))
      }
      return isLessThan
    },
    onUpload (file) {
      this.avatarUploading = true
      upload('avatar', file.file)
        .then(({ data }) => {
          this.avatarUploading = false
          this.form.avatar_id = data.id
          this.avatarUrl = URL.createObjectURL(file.file)
          file.onSuccess()
        }).catch(error => {
          console.error(error)
          this.avatarUploading = false
          file.onError()
        })
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
  width: 250px;
  font-size: 14px;
  line-height: 1.8em;
  color: rgba($color: #000000, $alpha: 0.65);
}
.avatar-uploader {
  width: 102px;
  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #0077b5;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
