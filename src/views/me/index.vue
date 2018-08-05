<i18n>
{
  "zh": {
    "name": "姓名",
    "title": "职位",
    "introduction": "简介",
    "phone": "绑定手机号",
    "email": "绑定邮箱",
    "edit": "编辑个人资料",
    "submit": "应用修改",
    "success": "修改成功",
    "messages": {
      "name": "请输入真实姓名（中文名或英文名，2~50个字符）",
      "phone": "请输入合法手机号"
    },
    "placeholders": {
      "name": "中文名或英文名，2~50个字符",
      "title": "最多50个字符",
      "introduction": "最多200个字符"
    }
  },
  "en": {
    "name": "Name",
    "title": "Title",
    "introduction": "Introduction",
    "phone": "Phone",
    "email": "Email",
    "edit": "Edit Personal Information",
    "submit": "Update",
    "success": "Successful Operation",
    "messages": {
      "name": "Please enter your real name (between 2 to 50 characters)",
      "phone": "Please enter a valid phone number"
    },
    "placeholders": {
      "name": "2 to 50 characters",
      "title": "50 characters at most",
      "introduction": "200 characters at most"
    }
  }
}
</i18n>

<template>
  <div class="container">
    <h2 class="mt0">{{ $t('edit') }}</h2>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120"
      label-position="left">
      <el-form-item
        :label="$t('name')"
        prop="name">
        <el-input
          v-model="form.name"
          :placeholder="$t('placeholders.name')"
          maxlength="50"/>
      </el-form-item>
      <el-form-item :label="$t('title')" >
        <el-input
          v-model="form.title"
          :placeholder="$t('placeholders.title')"
          maxlength="50"/>
      </el-form-item>
      <el-form-item :label="$t('introduction')" >
        <el-input
          v-model="form.introduction"
          :placeholder="$t('placeholders.introduction')"
          autosize
          type="textarea"
          rows="1"
          resize="none"
          maxlength="200"/>
      </el-form-item>
      <el-form-item :label="$t('email')" >
        <el-input
          :value="$store.getters.userInfo.email"
          disabled/>
      </el-form-item>
      <el-form-item
        :label="$t('phone')"
        prop="phone">
        <el-input
          :value="$store.getters.userInfo.phone"
          disabled/>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          @click="onSubmit">{{ $t('submit') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { namePattern } from '@/utils/validate'
import { updateCurrentUserInfo } from '@/api/user'
export default {
  data () {
    return {
      form: {
        name: '',
        title: '',
        introduction: ''
      },
      rules: {
        name: { required: true, pattern: namePattern, min: 1, max: 50, message: this.$t('messages.name') }
      },
      loading: false
    }
  },
  created () {
    const user = this.$store.getters.userInfo
    Object.keys(this.form).forEach(key => {
      this.form[key] = user[key]
    })
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          updateCurrentUserInfo(this.form).then(({ data }) => {
            this.loading = false
            this.$store.commit('SET_USERINFO', data)
            this.$message.success(this.$t('success'))
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 24px 30px;
  .el-form {
    width: 600px;
  }
}
</style>
