<i18n>
{
  "zh": {
      "signIn": "其他登录方式",
      "signUp": "其他注册方式"
    },
  "en": {
      "signIn": "Third party",
      "signUp": "Third party"
    }
}
</i18n>

<template>
  <div class="third-party">
    <span>{{ $t(formType) }}：</span>
    <icon
      name="brands/weixin"
      @click.native="onClickIcon"/>
    <icon
      name="brands/google"
      @click.native="onClickIcon"/>
    <icon
      name="brands/facebook"
      @click.native="onClickIcon"/>
  </div>
</template>

<script>
import 'vue-awesome/icons/brands/weixin'
import 'vue-awesome/icons/brands/google'
import 'vue-awesome/icons/brands/facebook'
export default {
  props: {
    formType: {
      type: String,
      default: 'signUp' // signIn
    }
  },
  methods: {
    onClickIcon () {
      this.$message.error('TODO')
    }
  }
}
</script>

<style lang="scss">
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
      color: #1a85bc;
    }
  }
}
</style>
