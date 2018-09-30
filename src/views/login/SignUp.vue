<i18n>
{
  "zh": {
    "name": "真实姓名",
    "phone": "手机",
    "password": "密码（至少 6 个字符）",
    "confirmPassword": "确认密码",
    "type": "您的身份",
    "party": "甲方",
    "designer": "设计师",
    "signUpBtn": "立即加入",
    "term": "您同意遵守本网站的《用户协议》及《隐私政策》",
    "thirdParty": "其他注册方式",
    "loginBtn": "已有账号登录",
    "messages": {
      "name": "请输入真实姓名（中文名或英文名，2~50个字符）",
      "phone": "请输入合法手机号",
      "password": "密码长度为 6 到 25 个字符",
      "type": "请选择您的身份"
    }
  },
  "en": {
    "name": "Real name",
    "phone": "Phone",
    "password": "Password (at least 6 characters)",
    "confirmPassword": "Confirm password",
    "type": "Your identity",
    "party": "Party",
    "designer": "Designer",
    "signUpBtn": "Sign up",
    "term":
      "You agree to abide by the User Agreement and Privacy Policy of this website.",
    "thirdParty": "Third party",
    "loginBtn": "Sign in",
    "messages": {
      "name": "Please enter your real name (between 2 to 50 characters)",
      "phone": "Please enter a valid phone number",
      "password": "Password length is 6 to 25 characters",
      "type": "Please select your identity"
    },
    "同一个手机号可以注册两个不同身份的账号": "A same phone number can register two accounts with different user type",
    "使用邮箱注册": "Sign up with email"
  }
}
</i18n>

<template>
  <div class="container">
    <section>
      <h1>
        <!-- <icon name="app-logo"/> -->
        <img
          style="width:auto; height:30px;margin-right:8px;vertical-align:middle;cursor:pointer;"
          src="@/assets/logo.png"
          @click="$router.push('/')" >
        <span
          style="cursor:pointer;"
          @click="$router.push('/')">{{ $t('app.title') }}</span>
      </h1>
      <p>{{ $t('app.description') }}</p>
      <el-form
        ref="signUpForm"
        :rules="rules"
        :model="form"
        :show-message="false"
        size="small"
        label-position="top">
        <el-form-item
          :label="$t('name')"
          prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item
          :label="$t('phone')"
          prop="phone">
          <el-tooltip
            :content="$t('同一个手机号可以注册两个不同身份的账号')"
            placement="right">
            <el-input v-model="form.phone"/>
          </el-tooltip>
        </el-form-item>
        <el-form-item
          :label="$t('password')"
          prop="password">
          <el-input v-model="form.password"/>
        </el-form-item>
        <el-form-item
          :label="$t('type')"
          prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="party">{{ $t('party') }}</el-radio>
            <el-radio label="designer">{{ $t('designer') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="signUpBtnLoading"
            :disabled="signUpBtnDisabled"
            type="primary"
            @click="onSubmit">{{ $t('signUpBtn') }}</el-button>
        </el-form-item>
        <p class="term">{{ $t('term') }}</p>
        <div class="extra-action">
          <!-- <third-party form-type="signUp"/> -->
          <router-link to="/signup/email">{{ $t('使用邮箱注册') }}</router-link>
          <router-link to="signin">{{ $t('loginBtn') }}</router-link>
        </div>
      </el-form>
    </section>
    <app-footer class="footer"/>
    <send-code-dialog
      :visible.sync="dialogVisible"
      :user-info="form"
      @closed="onDialogClosed"/>
  </div>
</template>

<script>
import { AppFooter } from '../layout/components'
import ThirdParty from './components/ThirdParty'
import SendCodeDialog from './components/SendCodeDialog'
import { phonePattern, namePattern } from '@/utils/validate'
import { checkPhoneAvailable } from '@/api/user'
export default {
  components: {
    AppFooter, SendCodeDialog, ThirdParty
  },
  data () {
    return {
      form: {
        name: '',
        phone: '',
        password: '',
        type: ''
      },
      rules: {
        name: { required: true, pattern: namePattern, min: 1, max: 50, message: this.$t('messages.name') },
        phone: { required: true, pattern: phonePattern, message: this.$t('messages.phone') },
        password: { required: true, min: 6, max: 25, message: this.$t('messages.password') },
        type: { required: true, message: this.$t('messages.type') }
      },
      signUpBtnDisabled: false,
      signUpBtnLoading: false,
      dialogVisible: false
    }
  },
  created () {
    this.form.type = this.$route.query.type || ''
  },
  methods: {
    onSubmit () {
      this.$refs.signUpForm.validate((valid, resObj) => {
        if (!valid) {
          this.showErrMessage(resObj)
        } else {
          this.signUpBtnLoading = true
          checkPhoneAvailable(this.form.phone, this.form.type).then(() => {
            this.signUpBtnLoading = false
            this.dialogVisible = true
            this.signUpBtnDisabled = true
          }).catch(() => {
            this.signUpBtnLoading = false
          })
        }
      })
    },
    onDialogClosed () {
      this.signUpBtnDisabled = false
    },
    showErrMessage (resObj) {
      ['name', 'phone', 'password', 'type'].some(v => {
        if (resObj[v]) {
          this.$message.error(resObj[v][0].message)
          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100%;
  padding-top: 32px;
  background-image: linear-gradient(
    -225deg,
    #008891 0%,
    #0077b5 100%,
    #0077b5 100%
  );
}
h1 {
  margin: 0;
  color: #fff;
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
p {
  margin: 12px 0 24px;
  color: #fff;
  text-align: center;
}
.el-form {
  width: 400px;
  margin: 0 auto;
  padding: 24px 30px;
  /* 背景: */
  background: #eeeeee;
  /deep/ .el-form-item__label {
    padding-bottom: 8px;
    line-height: 16px;
    &:before {
      content: "";
    }
  }
}
.el-form-item {
  margin-bottom: 12px;
  .el-button {
    width: 100%;
  }
}
.term {
  margin: 0;
  font-size: 12px;
  color: #595c5f;
}
.extra-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
  font-size: 14px;
}
.footer {
  color: #fff;
  /deep/ .lang-select-button {
    color: #fff;
  }
}
</style>
