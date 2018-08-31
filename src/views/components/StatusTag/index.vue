<i18n>
{
  "zh": {
    "status": {
      "500": "已取消",
      "600": "审核未通过",
      "900": "审核中",
      "1000": "报名中",
      "1100": "工作中",
      "1200": "已完成"
    }
  },
  "en": {
    "status": {
      "500": "Canceled",
      "600": "Review Failed",
      "900": "Reviewing",
      "1000": "Applying",
      "1100": "Working",
      "1200": "Completed"
    }
  }
}
</i18n>

<template>
  <el-tag :type="status | statusToType">{{ $t(`status.${status}`) }}</el-tag>
</template>

<script>
export default {
  filters: {
    statusToType (status) {
      const t = {
        500: 'info',
        600: 'danger',
        900: 'warning',
        1000: null,
        1100: null,
        1200: 'info'
      }
      return t[status]
    }
  },
  props: {
    status: {
      type: String | Number,
      required: true
    }
  }
}
</script>

<style>
</style>
