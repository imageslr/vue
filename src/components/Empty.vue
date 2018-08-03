<i18n>
{
  "zh": {
    "text": "暂无数据"
  },
  "en": {
    "text": "No data"
  }
}
</i18n>

<template>
  <div class="empty">
    <my-svg-icon
      class="empty__icon"
      icon-class="frown"/>
    <span v-t="text || $t('text')"/>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  padding: 40px 0;
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  font-size: 16px;
  &__icon {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
  & span {
    vertical-align: middle;
  }
}
</style>
