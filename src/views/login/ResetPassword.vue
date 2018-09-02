<i18n>
{
  "zh": {
    "countdown": "重新获取验证码({count})"
  },
  "en": {
    "重置密码": "Reset Password",
    "手机号": "Phone number",
    "用户类型": "User type",
    "设计师": "Designer",
    "甲方": "Party",
    "获取验证码": "Send verification code",
    "验证码": "Verification code",
    "新密码": "New password",
    "确 定": "Submit",
    "请输入合法手机号": "Please enter a valid phone number",
    "请输入6位验证码": "Please enter 6 characters verification code",
    "请输入原密码": "Please enter the original password",
    "密码长度为 6 到 25 个字符": "Password length is 6 to 25 characters",
    "重置密码成功": "Successfully reset password",
    "请选择用户类型": "Please select user type",
    "countdown": "Resend verification code ({count})"
  }
}
</i18n>

<template>
  <section class="container both-center">
    <h1 v-t="'重置密码'" />
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      size="small">
      <el-form-item
        :label="$t('用户类型')"
        prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="party">{{ $t('甲方') }}</el-radio>
          <el-radio label="designer">{{ $t('设计师') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label="$t('手机号')"
        prop="phone">
        <el-input v-model="form.phone">
          <el-button
            slot="append"
            :loading="sending"
            :disabled="!!count"
            @click="onSend">{{ sendButtonText }} </el-button>
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('验证码')"
        prop="code">
        <el-input v-model="form.code"/>
      </el-form-item>
      <el-form-item
        :label="$t('新密码')"
        prop="password">
        <el-input
          v-model="form.password"
          type="text"/>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click="onSubmit">{{ $t('确 定') }}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { phonePattern, validatePhone } from '@/utils/validate'
import { sendCode, resetPassword } from '@/api/user'
export default {
  data () {
    return {
      form: {
        code: '',
        phone: '',
        password: '',
        type: null
      },
      rules: {
        phone: { required: true, pattern: phonePattern, message: this.$t('请输入合法手机号'), trigger: 'blur' },
        code: { required: true, len: 6, message: this.$t('请输入6位验证码'), trigger: 'blur' },
        password: [
          { required: true, trigger: 'blur', message: this.$t('请输入新密码') },
          { min: 6, max: 25, trigger: 'blur', message: '密码长度为 6 到 25 个字符' }
        ],
        type: { required: true, message: this.$t('请选择用户类型') }
      },
      loading: false,
      sending: false, // 是否正在发送验证码
      count: 0, // 倒计时
      timer: null // 计时器
    }
  },
  computed: {
    sendButtonText () {
      const { count } = this
      if (count) {
        return this.$t('countdown', { count })
      } else {
        return this.$t('获取验证码')
      }
    }
  },
  methods: {
    onSend () {
      if (validatePhone(this.form.phone)) {
        this.sending = true
        const { phone, type } = this.form
        sendCode(phone, type, 'resetPassword').then(() => {
          this.sending = false
          this.count = 60
          this.countDown()
        }).catch(() => {
          this.sending = false
        })
      } else {
        this.$message.warning(this.$t('请输入合法手机号'))
      }
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          resetPassword(this.form).then(() => {
            this.loading = false
            this.$message.success(this.$t('重置密码成功'))
            this.$router.push({
              path: '/signin',
              replace: true
            })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    countDown () {
      if (this.count > 0) {
        this.count--
        this.timer = setTimeout(() => {
          this.countDown()
        }, 1000)
      } else {
        clearTimeout(this.timer)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
  padding: 30px;
  background: #ffffff;
  border: 1px solid #d0d3d6;
  border-radius: 4px;
}
h1 {
  margin: 0 0 24px 0;
  color: #000;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
}
.el-button {
  width: 100%;
}
</style>
