<i18n>
{
  "zh": {
    "phone": "手机号",
    "password": "密码",
    "signIn": "登录",
    "phoneMessage": "请输入合法手机号",
    "passwordMessage": "请输入密码，长度 6 到 25 个字符",
    "forgetPassword": "忘记密码？",
    "thirdParty": "其他登录方式",
    "signUp": "立即注册",
    "signInSuccess": "登录成功"
  },
  "en": {
    "phone": "Phone Number",
    "password": "Password",
    "signInBtn": "Sign in",
    "phoneMessage": "Please enter a valid phone number",
    "passwordMessage": "Please enter password of which length is 6 to 25",
    "forgetPassword": "Forget password?",
    "thirdParty": "Third party",
    "signUpBtn": "Sign up",
    "signInSuccess": "Sign in succeed"
  }
}
</i18n>

<template>
  <section class="container both-center">
    <h1><icon name="app-logo"/><span>{{ $t('app.title') }}</span></h1>
    <el-form
      ref="signInForm"
      :rules="rules"
      :model="form"
      size="small">
      <el-form-item prop="phone">
        <el-input
          v-model="form.phone"
          :placeholder="$t('phone')"
          @keyup.native.enter="onSubmit"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          :placeholder="$t('password')"
          type="password"
          @keyup.native.enter="onSubmit"/>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="signInBtnLoading"
          type="primary"
          @click="onSubmit">{{ $t('signIn') }}</el-button>
      </el-form-item>
      <el-form-item class="forget-password">
        <router-link to="/reset">{{ $t('forgetPassword') }}</router-link>
      </el-form-item>
      <div class="extra-action">
        <third-party form-type="signIn"/>
        <router-link to="signup">{{ $t('signUp') }}</router-link>
      </div>
    </el-form>
  </section>
</template>

<script>
import { phonePattern } from '@/utils/validate'
import ThirdParty from './components/ThirdParty'
export default {
  components: { ThirdParty },
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      rules: {
        phone: { required: true, pattern: phonePattern, message: this.$t('phoneMessage'), trigger: 'blur' },
        password: { required: true, min: 6, max: 25, message: this.$t('passwordMessage'), trigger: 'blur' }
      },
      signInBtnLoading: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.signInForm.validate((valid, resObj) => {
        if (valid) {
          this.signInBtnLoading = true
          const { phone, password } = this.form
          this.$store.dispatch('SIGN_IN', { phone, password }).then(() => {
            this.signInBtnLoading = false
            this.$message.success(this.$t('signInSuccess'))
            this.$router.push({ path: '/feed' })
          }).catch(() => {
            this.signInBtnLoading = false
          })
        }
      })
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
  .fa-icon {
    width: 33px;
    height: 30px;
    margin-right: 16px;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
}
.el-button {
  width: 100%;
}
.forget-password {
  margin: 0;
  text-align: center;
  /deep/ .el-form-item__content {
    line-height: 14px;
  }
}
.extra-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
  font-size: 14px;
}
</style>
