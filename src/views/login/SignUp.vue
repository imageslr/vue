<template>
  <div class="container">
    <section>
      <h1><icon name="app-logo"/><span>{{ $t('app.title') }}</span></h1>
      <p>{{ $t('app.description') }}</p>
      <el-form
        label-position="top">
        <el-form-item :label="$t('form.signUp.realName')">
          <el-input
            v-model="form.realName"
            size="small"/>
        </el-form-item>
        <el-form-item :label="$t('form.signUp.phone')">
          <el-input
            v-model="form.phone"
            size="small"/>
        </el-form-item>
        <el-form-item :label="$t('form.signUp.password')">
          <el-input
            v-model="form.password"
            size="small"/>
        </el-form-item>
        <!-- <el-form-item
          :label="$t('form.signUp.confirmPassword')"
          prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            size="small"/>
        </el-form-item> -->
        <el-form-item :label="$t('form.signUp.type')">
          <el-radio-group v-model="form.type">
            <el-radio :label="$t('form.signUp.party')"/>
            <el-radio :label="$t('form.signUp.designer')"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit">{{ $t('form.signUp.signUpBtn') }}</el-button>
        </el-form-item>
        <p class="term">{{ $t('form.signUp.term') }}</p>
        <div class="extra-action">
          <div class="third-party">
            <span>{{ $t('form.signUp.thirdParty') }}：</span>
            <icon name="brands/weixin"/>
            <icon name="brands/google"/>
            <icon name="brands/facebook"/>
          </div>
          <router-link to="signin">{{ $t('form.signUp.loginBtn') }}</router-link>
        </div>
      </el-form>
    </section>
    <app-footer/>
  </div>
</template>

<script>
import { AppFooter } from '../layout/components'
import 'vue-awesome/icons/brands/weixin'
import 'vue-awesome/icons/brands/google'
import 'vue-awesome/icons/brands/facebook'
import { validatePhone } from '@/utils/validate'
export default {
  components: {
    AppFooter
  },
  data () {
    return {
      form: {
        realName: '',
        phone: '',
        password: '',
        type: ''
      },
      messages: {
        realName: this.$t('form.signUp.requireRealName'),
        phone: this.$t('form.signUp.requireValidPhone'),
        password: this.$t('form.signUp.passwordLength'),
        type: this.$t('form.signUp.requireType')
      }
    }
  },
  created () {
    this.form.type = this.$t('form.signUp.' + this.$route.query.type) || ''
  },
  methods: {
    onSubmit () {
      if (this.validateSignUpForm() === true) {
        alert('submit!')
      } else {
        console.log('error submit!!')
        return false
      }
    },
    validateSignUpForm () {
      const msg = (message) => this.$message.error(message)
      const { form } = this
      if (!form.realName) return msg(this.$t('form.signUp.requireRealName'))
      if (!validatePhone(form.phone)) return msg(this.$t('form.signUp.requireValidPhone'))
      if (form.password.length < 6 || form.password.length > 25) return msg(this.$t('form.signUp.passwordLength'))
      if (!form.type) return msg(this.$t('form.signUp.requireType'))
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
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
.third-party {
  color: #595c5f;
  span {
    vertical-align: middle;
  }
  .fa-icon {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      color: $--color-primary-light-1;
    }
  }
}
footer {
  color: #fff;
  /deep/ .lang-select-button {
    color: #fff;
  }
}
</style>
