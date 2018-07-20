<i18n>
{
  "zh": {
      "title": "安全验证",
      "bodyTitle": "请验证电话号码",
      "description": "我们将向下方输入的手机号码发送短信验证码。",
      "phone": "电话号码",
      "send": "发送验证码",
      "cancel": "返回",
      "enterCode": "请输入验证码完成登录，接收验证码可能需要几分钟。",
      "code": "验证码",
      "confirm": "通过验证",
      "notReceived": "没有收到？",
      "sendAgain": "再发一次",
      "success": "发送成功",
      "signUpSuccess": "注册成功",
      "requireCode": "请输入验证码"
    },
  "en": {
      "title": "Security Verification",
      "bodyTitle": "Please verify the phone number",
      "description":
        "We will send a SMS verification code to the mobile number entered below.",
      "phone": "Phone Number",
      "send": "Send verification code",
      "cancel": "Cancel",
      "enterCode":
        "Please enter the verification code to complete the login. It may take a few minutes to receive the verification code.",
      "code": "Verification code",
      "confirm": "Approved and sign up",
      "notReceived": "Did not receive?",
      "sendAgain": "Send again",
      "success": "Send succeed",
      "signUpSuccess": "Sign up succeed",
      "requireCode": "Please enter the verification code"
    }
}
</i18n>

<template>
  <el-dialog
    :title="$t('title')"
    :visible="visible"
    :close-on-click-modal="false"
    width="600px"
    class="send-code-dialog"
    @update:visible="$emit('update:visible', $event)"
    @closed="onClosed">
    <section
      v-loading="loading"
      class="dialog-body">
      <template v-if="step ==='confirming'">
        <h1>{{ $t('bodyTitle') }}</h1>
        <h2>{{ $t('description') }}</h2>
        <div class="input-container">
          <label>{{ $t('phone') }}</label>
          <div class="input">{{ splittedPhone }}</div>
        </div>
        <el-button
          class="w-100 primary-btn"
          size="large"
          type="primary"
          @click="onSend">{{ $t('send') }}</el-button>
        <el-button
          class="w-100 cancel-btn"
          size="large"
          type="info"
          @click="$emit('update:visible', false)">{{ $t('cancel') }}</el-button>
      </template>
      <template v-else-if="step==='sended'">
        <h1>{{ $t('bodyTitle') }}</h1>
        <h2>{{ $t('enterCode') }}</h2>
        <div class="input-container">
          <label>{{ $t('code') }}</label>
          <el-input v-model="code"/>
        </div>
        <p>{{ $t('notReceived') }}
          <span
            class="send-again-btn"
            @click="onSend">{{ $t('sendAgain') }}</span>
        </p>
        <el-button
          class="w-100 primary-btn"
          size="large"
          type="primary"
          @click="onApprove">{{ $t('confirm') }}</el-button>
      </template>
    </section>
  </el-dialog>
</template>

<script>
import { splitPhone } from '@/utils'
import { sendCode, checkCode } from '@/api/code'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: function () {
        return {
          phone: '',
          real_name: '',
          password: '',
          type: ''
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      code: '',
      step: 'confirming' // 'sended'
    }
  },
  computed: {
    phone () {
      return this.userInfo.phone
    },
    splittedPhone () {
      return splitPhone(this.phone)
    }
  },
  methods: {
    onSend () {
      this.loading = true
      sendCode(this.phone).then(res => {
        this.loading = false
        this.step = 'sended'
        this.$message.success(this.$t('success'))
      }).catch(() => {
        this.loading = false
      })
    },
    onApprove () {
      if (!this.code) return this.$message.error(this.$t('requireCode'))
      this.loading = true
      const { phone, code, userInfo } = this
      checkCode(phone, code).then(() => {
        return this.$store.dispatch('SIGN_UP', userInfo).then(() => {
          this.loading = false
          this.$message.success(this.$t('signUpSuccess'))
          this.$router.push({ path: '/feed' })
        })
      }).catch(() => {
        this.loading = false
      })
    },
    onClosed () {
      Object.assign(this.$data, this.$options.data()) // 重置data
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss">
.send-code-dialog {
  .el-dialog__header {
    background-color: #333;
    padding: 8px 12px;
  }
  .el-dialog__title {
    color: #cccfd3;
    font-size: 14px;
    line-height: 16px;
  }
  .el-dialog__headerbtn {
    top: 10px;
  }
  .el-dialog__body {
    padding: 0;
    background-image: linear-gradient(45deg, #0077b5, #008891);
  }
}
</style>

<style lang="scss" scoped>
h1 {
  font-size: 18px;
  font-weight: normal;
  line-height: 22px;
  color: #66696a;
  margin-top: 0px;
  margin-bottom: 10px;
  text-align: center;
  color: #fff;
}
h2,
p {
  font-size: 13px;
  line-height: 17px;
  font-weight: 300;
  margin-top: 0px;
  margin-bottom: 20px;
  display: block;
  text-align: center;
  color: #fff;
}
.dialog-body {
  padding: 30px 20px;
}
.input-container {
  background-color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  label {
    display: block;
    margin-top: 0px;
    margin-bottom: 10px;
    font-size: 15px;
    line-height: 20px;
    color: #999;
    font-weight: 300;
  }
  .input {
    background-color: #fdfdfd;
    border-radius: 2px;
    padding: 8px 8px 5px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1) inset;
    border: 1px solid #c1c1c1;
    color: #333;
    line-height: 20px;
    font-size: 16px;
    font-weight: 300;
  }
}
.el-button {
  margin: 0 0 12px;
  &.primary-btn {
    background-color: #00a0dc;
  }
  &.cancel-btn {
    background-color: #96999c;
  }
}
.send-again-btn {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
