<i18n>
{
  "zh": {
    "title": "没有找到你感兴趣的设计师？邀请他们注册成为平台的一员吧！",
    "success": "平台链接已成功复制到您的剪贴板，快去发送给你的设计师好友吧",
    "error": "请手动复制网址：{link}，发送给你的设计师好友"
  },
  "en": {
    "title": "Didn't find the designer you are interested in? Invite them to register as a member of the platform!",
    "success": "The platform link has been successfully copied to your clipboard. Sent to your designer friends now.",
    "error": "Please manually copy the address: {link} and send it to your designer friends."
  }
}
</i18n>

<template>
  <div class="invite-alert info">
    <i class="el-icon-info invite-alert__icon"/>
    <p
      v-t="'title'"
      class="invite-alert__title"/>
    <button
      ref="copyBtn"
      :data-clipboard-text="$t('app.link')"
      type="text"
      class="invite-alert__button">{{ $t('立即邀请') }}</button>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      clipboard: null // 复制按钮的引用
    }
  },
  mounted () {
    this.clipboard = new Clipboard(this.$refs.copyBtn)
    this.clipboard.on('success', () => {
      this.$message({
        message: this.$t('success'),
        type: 'success',
        showClose: true
      })
    })
    this.clipboard.on('error', () => {
      this.$message({
        message: this.$t('error', { link: this.$t('app.link') }),
        type: 'info',
        duration: 0,
        showClose: true
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.invite-alert {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  &__icon {
    margin-right: 8px;
    color: #0077b5;
  }
  &__title {
    flex: 1;
    margin: 0;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  &__button {
    padding: 0;
    border-color: transparent;
    background: transparent;
    color: rgba(0, 119, 181, 0.9);
    font-size: 14px;
    line-height: 1;
    cursor: pointer;
  }
  &.info {
    background: rgba(0, 160, 220, 0.1);
    border: 1px solid #bae7ff;
    border-radius: 4px;
  }
}
</style>
