<template>
  <div class="container">
    <section>
      <h1><icon name="app-logo"/><span>{{ $t('app.title') }}</span></h1>
      <p>{{ $t('app.description') }}</p>
      <el-form
        ref="signUpForm"
        :rules="rules"
        :model="form"
        :show-message="false"
        size="small"
        label-position="top">
        <el-form-item
          :label="$t('forms.signUp.realName')"
          prop="realName">
          <el-input v-model="form.realName"/>
        </el-form-item>
        <el-form-item
          :label="$t('forms.signUp.phone')"
          prop="phone">
          <el-input v-model="form.phone"/>
        </el-form-item>
        <el-form-item
          :label="$t('forms.signUp.password')"
          prop="password">
          <el-input v-model="form.password"/>
        </el-form-item>
        <!-- <el-form-item
          :label="$t('form.signUp.confirmPassword')"
          prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            size="small"/>
        </el-form-item> -->
        <el-form-item
          :label="$t('forms.signUp.type')"
          prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="party">{{ $t('forms.signUp.party') }}</el-radio>
            <el-radio label="designer">{{ $t('forms.signUp.designer') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="signUpBtnLoading"
            :disabled="signUpBtnDisabled"
            type="primary"
            @click="onSubmit">{{ $t('forms.signUp.signUpBtn') }}</el-button>
        </el-form-item>
        <p class="term">{{ $t('forms.signUp.term') }}</p>
        <div class="extra-action">
          <third-party form-type="signUp"/>
          <router-link to="signin">{{ $t('forms.signUp.loginBtn') }}</router-link>
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
import { phonePattern } from '@/utils/validate'
import { checkPhoneAvailable } from '@/api/user'
export default {
  components: {
    AppFooter, SendCodeDialog, ThirdParty
  },
  data () {
    return {
      form: {
        realName: '',
        phone: '',
        password: '',
        type: ''
      },
      rules: {
        realName: { required: true, message: this.$t('forms.signUp.messages.realName') },
        phone: { required: true, pattern: phonePattern, message: this.$t('forms.signUp.messages.phone') },
        password: { required: true, min: 6, max: 25, message: this.$t('forms.signUp.messages.password') },
        type: { required: true, message: this.$t('forms.signUp.messages.type') }
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
          checkPhoneAvailable(this.form.phone).then(({ data: { available } }) => {
            this.signUpBtnLoading = false
            if (available) {
              this.dialogVisible = true
              this.signUpBtnDisabled = true
            } else {
              this.$message.error(this.$t('forms.signUp.messages.phoneIsRegistered'))
            }
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
      ['realName', 'phone', 'password', 'type'].some(v => {
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
