<i18n>
{
  "en": {
    "手机号 / 邮箱": "Phone Number / Email",
    "密码": "Password",
    "请输入合法手机号或邮箱": "Please enter a valid phone number or email",
    "请输入密码，长度 6 到 25 个字符": "Please enter password of which length is 6 to 25",
    "忘记密码？": "Forget password?",
    "立即注册": "Sign up",
    "登录成功": "Sign in succeed",
    "甲方": "party",
    "设计师": "designer",
    "请选择用户类型": "Please select user type",
    "登录": "Sign in"
  }
}
</i18n>

<template>
  <section class="container both-center">
    <h1>
      <!-- <icon name="app-logo"/> -->
      <img
        style="width:auto; height:30px;margin-right:8px;vertical-align:middle;"
        src="@/assets/logo_primary.png" >
      <span>{{ $t('app.title') }}</span>
    </h1>
    <el-form
      ref="signInForm"
      :rules="rules"
      :model="form"
      size="small">
      <el-form-item prop="identifier">
        <el-input
          v-model="form.identifier"
          :placeholder="$t('手机号 / 邮箱')"
          @keyup.native.enter="onSubmit"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          :placeholder="$t('密码')"
          :type="passwordType"
          @keyup.native.enter="onSubmit">
          <i
            slot="suffix"
            class="el-input__icon el-icon-view"
            style="cursor: pointer;"
            @click="onTogglePasswordType"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="party">{{ $t('甲方') }}</el-radio>
          <el-radio label="designer">{{ $t('设计师') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="signInBtnLoading"
          type="primary"
          @click="onSubmit">{{ $t('登录') }}</el-button>
      </el-form-item>
      <div class="extra-action">
        <router-link to="/reset">{{ $t('忘记密码？') }}</router-link>
        <router-link to="signup">{{ $t('立即注册') }}</router-link>
      </div>
    </el-form>
  </section>
</template>

<script>
import { validatePhone, validateEmail } from '@/utils/validate'
import ThirdParty from './components/ThirdParty'
export default {
  components: { ThirdParty },
  data () {
    return {
      form: {
        identifier: '',
        password: '',
        type: ''
      },
      rules: {
        identifier: {
          validator: (rule, value, callback) => {
            if (!validatePhone(value) && !validateEmail(value)) {
              callback(this.$t('请输入合法手机号或邮箱'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        },
        password: { required: true, min: 6, max: 25, message: this.$t('请输入密码，长度 6 到 25 个字符'), trigger: 'blur' },
        type: { required: true, type: 'enum', enum: ['designer', 'party'], message: this.$t('请选择用户类型') }
      },
      signInBtnLoading: false,
      passwordType: 'password' // text
    }
  },
  created () {
    this.form.type = this.$route.query.type || 'party'
  },
  methods: {
    onTogglePasswordType () {
      if (this.passwordType === 'password') this.passwordType = 'text'
      else this.passwordType = 'password'
    },
    onSubmit () {
      this.$refs.signInForm.validate((valid, resObj) => {
        if (valid) {
          this.signInBtnLoading = true
          this.$store.dispatch('signIn', this.form).then(() => {
            this.signInBtnLoading = false
            this.$message.success(this.$t('登录成功'))
            this.$router.replace({
              path: this.$route.query.returnUrl || '/feed' // 判断是否需要返回到进入登录页之前的页面
            })
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
.extra-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
  font-size: 14px;
}
</style>
