<i18n>
{
  "zh": {
    "countdown": "重新获取验证码({count})"
  },
  "en": {
    "修改绑定手机号": "Change Phone Number",
    "已绑定手机号": "Current phone number",
    "更换手机号": "New phone number",
    "获取验证码": "Send verification code",
    "验证码": "Verification code",
    "确 定": "Submit",
    "请输入合法手机号": "Please enter a valid phone number",
    "新手机号不能与原手机号相同": "New and original phone number cannot be same",
    "请输入6位验证码": "Please enter 6 characters verification code",
    "修改绑定手机号成功": "Successfully change phone number",
    "countdown": "Resend verification code ({count})"
  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="'修改绑定手机号'"
      class="mt0" />
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-position="top">
      <el-form-item :label="$t('已绑定手机号')">
        <el-input
          :value="$store.getters.userInfo.phone"
          disabled/>
      </el-form-item>
      <el-form-item
        :label="$t('更换手机号')"
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
import { phonePattern, validatePhone } from '@/utils/validate'
import { changePhone, sendCode, checkPhoneAvailable } from '@/api/user'
export default {
  data () {
    return {
      form: {
        code: '',
        phone: ''
      },
      rules: {
        phone: [
          { required: true, pattern: phonePattern, message: this.$t('请输入合法手机号'), trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.form.phone === this.$store.getters.userInfo.phone) {
                callback(new Error(this.$t('新手机号不能与原手机号相同')))
              }
              callback()
            }
          }
        ],
        code: { required: true, len: 6, message: this.$t('请输入6位验证码'), trigger: 'blur' }
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
        checkPhoneAvailable(this.form.phone).then(() => {
          return sendCode(this.form.phone, 'changePhone').then(() => {
            this.sending = false
            this.count = 60
            this.countDown()
          })
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
          const { code, phone } = this.form
          changePhone(code, phone).then(() => {
            this.loading = false
            this.form = {
              phone: '',
              code: ''
            }
            this.$store.commit('SET_PHONE', phone)
            this.$message.success(this.$t('修改绑定手机号成功'))
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
  position: relative;
  padding: 24px 30px;
  .el-form {
    width: 600px;
  }
}
</style>
