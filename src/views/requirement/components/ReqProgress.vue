<i18n>
{
  "zh": {
    "unlimited": "无限制"
  },
  "en": {
    "unlimited": "Unlimited"
  }
}
</i18n>

<template>
  <my-progress
    :percentage="progressPercentage"
    :text="progressText"/>
</template>

<script>
import Requirement from '@/models/requirement'
export default {
  props: {
    reqDetail: {
      type: Object,
      default () {
        return Requirement.parse()
      }
    }
  },
  computed: {
    progressPercentage () {
      // 申请人数无限制的时候，进度条显示在0%或50%
      if (this.reqDetail.max_apply_num == 0) { // eslint-disable-line eqeqeq
        if (this.reqDetail.current_apply_num) {
          return 50
        } else {
          return 0
        }
      } else {
        return 100 * this.reqDetail.current_apply_num / this.reqDetail.max_apply_num
      }
    },
    progressText () {
      let current = this.reqDetail.current_apply_num
      let max
      if (this.reqDetail.max_apply_num == 0) { // eslint-disable-line eqeqeq
        max = this.$t('unlimited')
      } else {
        max = this.reqDetail.max_apply_num
      }
      return current + '/' + max
    }
  }
}
</script>

<style>
</style>
