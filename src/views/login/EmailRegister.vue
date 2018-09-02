<i18n>
{
  "zh": {
    "countdown": "重新获取验证码({count})"
  },
  "en": {
    "使用邮箱注册": "Sign up with email",
    "邮箱": "Email",
    "用户类型": "User type",
    "设计师": "Designer",
    "甲方": "Party",
    "真实姓名": "Real name",
    "获取验证码": "Send verification code",
    "验证码": "Verification code",
    "密码": "Password",
    "确 定": "Submit",
    "请选择用户类型": "Please select user type",
    "请输入真实姓名（中文名或英文名，2~50个字符）": "Please enter your real name (between 2 to 50 characters)",
    "请输入合法邮箱地址": "Please enter a valid email address",
    "请输入6位验证码": "Please enter 6 characters verification code",
    "请输入密码": "Please enter a password",
    "密码长度为 6 到 25 个字符": "Password length is 6 to 25 characters",
    "注册成功": "Successfully sign up",
    "已有账号登录": "Sign in",
    "countdown": "Resend verification code ({count})"
  }
}
</i18n>

<template>
  <section class="container">
    <h1 v-t="'使用邮箱注册'" />
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
        :label="$t('真实姓名')"
        prop="name">
        <el-input
          v-model="form.name"
          type="text"/>
      </el-form-item>
      <el-form-item
        :label="$t('邮箱')"
        prop="email">
        <el-input v-model="form.email">
          <el-button
            slot="append"
            :loading="sending"
            :disabled="!!count"
            @click="onSend">{{ sendButtonText }} </el-button>
        </el-input>
      </el-form-item>
      <el-form-item
        :label="$t('验证码')"
        prop="verification_code">
        <el-input v-model="form.verification_code"/>
      </el-form-item>
      <el-form-item
        :label="$t('密码')"
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
        <router-link
          to="/signin"
          class="center"
          style="display:block;">{{ $t('已有账号登录') }}</router-link>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { namePattern, validateEmail } from '@/utils/validate'
import { sendEmailCode } from '@/api/user'
export default {
  data () {
    return {
      form: {
        type: null,
        name: '',
        email: '',
        password: '',
        verification_code: ''
      },
      rules: {
        type: { required: true, message: this.$t('请选择用户类型') },
        name: { required: true, pattern: namePattern, min: 1, max: 50, message: this.$t('请输入真实姓名（中文名或英文名，2~50个字符）') },
        email: { required: true, type: 'email', message: this.$t('请输入合法邮箱'), trigger: 'blur' },
        verification_code: { required: true, len: 6, message: this.$t('请输入6位验证码'), trigger: 'blur' },
        password: [
          { required: true, trigger: 'blur', message: this.$t('请输入密码') },
          { min: 6, max: 25, trigger: 'blur', message: '密码长度为 6 到 25 个字符' }
        ]
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
      if (validateEmail(this.form.email)) {
        this.sending = true
        const { email } = this.form
        sendEmailCode(email, 'register').then(() => {
          this.sending = false
          this.count = 60
          this.countDown()
        }).catch(() => {
          this.sending = false
        })
      } else {
        this.$message.warning(this.$t('请输入合法邮箱地址'))
      }
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          return this.$store.dispatch('signUp', this.form).then(() => {
            this.loading = false
            this.$message.success(this.$t('注册成功'))
            this.$router.push({ path: '/feed' })
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
  padding: 30px 30px 0;
  margin: 24px auto 0;
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
