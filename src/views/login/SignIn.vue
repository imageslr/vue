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
          :placeholder="$t('forms.signIn.phone')"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          :placeholder="$t('forms.signIn.password')"
          type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="signInBtnLoading"
          type="primary"
          @click="onSubmit">{{ $t('forms.signIn.signInBtn') }}</el-button>
      </el-form-item>
      <el-form-item class="forget-password">
        <a @click="onForget">{{ $t('forms.signIn.forgetPassword') }}</a>
      </el-form-item>
      <div class="extra-action">
        <third-party form-type="signIn"/>
        <router-link to="signup">{{ $t('forms.signIn.signUpBtn') }}</router-link>
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
        phone: { required: true, pattern: phonePattern, message: this.$t('forms.signIn.phoneMessage'), trigger: 'blur' },
        password: { required: true, min: 6, max: 25, message: this.$t('forms.signIn.passwordMessage'), trigger: 'blur' }
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
          this.$store.dispatch('SIGN_IN', phone, password).then(() => {
            this.signInBtnLoading = false
            this.$message.success(this.$t('forms.signIn.signInSuccess'))
            this.$router.push({ path: '/feed' })
          }).catch(() => {
            this.signInBtnLoading = false
          })
        }
      })
    },
    onForget () {
      this.$message.error('TODO')
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
