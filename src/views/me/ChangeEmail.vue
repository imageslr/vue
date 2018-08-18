<i18n>
{
  "en": {
    "修改绑定邮箱": "Change Email Address",
    "已绑定邮箱": "Current email address",
    "还未绑定邮箱": "Have not bound email yet",
    "绑定并激活邮箱后，您将可以使用邮箱接收通知": "You can receive notifications via email after binding and activation",
    "新邮箱不能与原邮箱相同": "New and original email address cannot be same",
    "您的邮箱还未激活，请前往邮箱查看您的激活邮件。如果未收到邮件或邮件已过期，您可以": "Your email has not been activated. Please go to the email to view your activation email. If you have not received the message or the message has expired, you can",
    "重新发送激活邮件": "Resend activation email",
    "已发送": "Sended",
    "已激活": "Activated",
    "更换邮箱": "New email address",
    "确 定": "Submit",
    "请输入正确的邮箱地址": "Please enter a valid email address",
    "系统已向该邮箱发送了一封激活邮件，请注意查收": "The system has sent an activation email to the address. Please check it.",
    "修改绑定邮箱成功，系统已向该邮箱发送了一封激活邮件，请注意查收": "The binding email is successfully modified. The system has sent an activation email to the address. Please check it."
  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="'修改绑定邮箱'"
      class="mt0" />
    <el-form
      ref="form"
      label-position="top">
      <el-form-item :label="$t('已绑定邮箱')">
        <el-input
          :value="$store.getters.userInfo.email || $t('还未绑定邮箱')"
          disabled/>
        <template v-if="$store.getters.userInfo.email">
          <my-alert
            v-if="isEmailNotActivated"
            class="alert">
            <div>
              {{ $t('您的邮箱还未激活，请前往邮箱查看您的激活邮件。如果未收到邮件或邮件已过期，您可以') }}
              <el-button
                v-if="!sended"
                :loading="sending"
                type="text"
                @click="onSend">{{ $t('重新发送激活邮件') }} </el-button>
              <el-button
                v-else
                disabled
                type="text">{{ $t('已发送') }} </el-button>
            </div>
          </my-alert>
          <my-alert
            v-else
            :title="$t('已激活')"
            class="alert"/>
        </template>
        <el-card class="tips-card">{{ $t('绑定并激活邮箱后，您将可以使用邮箱接收通知') }}</el-card>
      </el-form-item>
      <el-form-item :label="$t('更换邮箱')">
        <el-input v-model="email" />
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click="onSubmit">{{ $t('确 定') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate'
import { updateCurrentUserInfo, sendActiveMail } from '@/api/user'
export default {
  data () {
    return {
      email: '',
      loading: false,
      sending: false,
      sended: false
    }
  },
  computed: {
    isEmailNotActivated () {
      return this.$store.getters.userInfo.email && !this.$store.getters.userInfo.email_activated
    }
  },
  methods: {
    onSubmit () {
      const { email } = this
      if (!validateEmail(email)) {
        return this.$message.warning(this.$t('请输入正确的邮箱地址'))
      }
      if (email === this.$store.getters.userInfo.email) {
        return this.$message.warning(this.$t('新邮箱不能与原邮箱相同'))
      }
      this.loading = true
      updateCurrentUserInfo({ email }).then(({ data }) => {
        this.loading = false
        this.email = ''
        this.$store.commit('SET_USERINFO', data)
        this.$message.success(this.$t('修改绑定邮箱成功，系统已向该邮箱发送了一封激活邮件，请注意查收'))
      }).catch(() => {
        this.loading = false
      })
    },
    onSend () {
      this.sending = true
      sendActiveMail().then(() => {
        this.sending = false
        this.sended = true
        this.$message.success(this.$t('系统已向该邮箱发送了一封激活邮件，请注意查收'))
      }).catch(() => {
        this.sending = false
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
    .alert {
      margin-top: 12px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.85);
      .el-button {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
}
.tips-card {
  position: absolute;
  top: 0px;
  left: 660px;
  width: 250px;
  font-size: 14px;
  line-height: 1.8em;
  color: rgba($color: #000000, $alpha: 0.65);
}
</style>
