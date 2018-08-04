<i18n>
{
  "zh": {
    "text": "{order}等奖：{num} 人，每人 {bonus} 元"
  },
  "en": {
    "text": "The {order} Prize：{num} people，￥{bonus} each"
  }
}
</i18n>

<template>
  <div v-t="$t('text', {order: $t('ordinalNum')[order-1], num, bonus})" />
</template>

<script>
export default {
  props: {
    order: {
      type: Number | String,
      default: 1
    },
    num: {
      type: Number,
      default: 0
    },
    bonus: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style>
</style>
