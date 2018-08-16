<i18n>
{
  "en": {
    "修改密码": "Change Password",
    "原密码": "Original password",
    "新密码": "New password",
    "重复输入新密码": "Confirm new password",
    "密码长度为 6 到 25 个字符": "Password length is 6 to 25 characters",
    "重 置": "Reset",
    "确 定": "Submit",
    "请输入原密码": "Please enter the original password",
    "请输入新密码": "Please enter the new password",
    "请再次输入新密码": "Please confirm the new password",
    "两次输入密码不一致": "Inconsistent new password",
    "修改密码成功": "Successfully change password"
  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="'修改密码'"
      class="mt0" />
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-position="top">
      <el-form-item
        :label="$t('原密码')"
        prop="password">
        <el-input
          v-model="form.password"
          auto-complete="off"
          type="password"/>
      </el-form-item>
      <el-form-item
        :label="$t('新密码')"
        prop="newPassword">
        <el-input
          v-model="form.newPassword"
          :placeholder="$t('密码长度为 6 到 25 个字符')"
          auto-complete="off"
          type="password"/>
      </el-form-item>
      <el-form-item
        :label="$t('重复输入新密码')"
        prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          auto-complete="off"
          type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset()">{{ $t('重 置') }}</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="onSubmit">{{ $t('确 定') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { resetPassword } from '@/api/user'
export default {
  data () {
    return {
      form: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        password: {
          required: true, message: this.$t('请输入原密码'), trigger: 'blur'
        },
        newPassword: [
          { required: true, trigger: 'blur', message: this.$t('请输入新密码') },
          { min: 6, max: 25, trigger: 'blur', message: '密码长度为 6 到 25 个字符' },
          {
            validator: (rule, value, callback) => {
              if (this.form.confirmPassword) {
                this.$refs.form.validateField('confirmPassword')
              }
              callback()
            }
          }],
        confirmPassword: [
          { required: true, message: this.$t('请再次输入新密码'), trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.newPassword) {
                callback(new Error(this.$t('两次输入密码不一致')))
              } else {
                callback()
              }
            }
          }]
      },
      loading: false
    }
  },
  methods: {
    onReset () {
      this.$refs.form.resetFields()
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const { password, newPassword } = this.form
          resetPassword(password, newPassword).then(() => {
            this.loading = false
            this.$message.success(this.$t('修改密码成功'))
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 24px 30px;
  .el-form {
    width: 600px;
  }
}
</style>
