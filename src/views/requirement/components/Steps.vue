<i18n>
{
  "zh": {
    "steps": [
      "发布需求",
      "设计师参与",
      "甲方托管赏金并签单",
      "设计师工作",
      "甲方验收并付款",
      "评价"
    ],
    "deadline": "截止日期"
  },
  "en": {
    "steps": [
      "Publish requirement",
      "Designers participate",
      "Payty hosts money and sign",
      "Designers work",
      "Party evaluates and pays",
      "Review"
    ],
    "deadline": "Deadline"
  }
}
</i18n>

<template>
  <el-steps
    :active="active"
    process-status="finish"
    finish-status="success">
    <el-step
      v-for="(step, index) in $t('steps')"
      :key="index"
      :title="step"
      :description="descriptions[index]"
    />
  </el-steps>
</template>

<script>
export default {
  props: {
    reqDetail: {
      type: Object,
      default () {
        return {
          status: 1000,
          review_status: 0,
          created_at: '',
          apply_due_date: '',
          sign_due_date: '',
          tender_date: ''
        }
      }
    }
  },
  computed: {
    active () {
      const statusIndex = {
        1000: 1,
        1010: 2,
        1100: 3,
        1110: 4,
        1120: 4,
        1130: 4,
        1200: 4,
        1210: 5,
        1211: 5,
        1212: 5,
        1213: 5
      }
      return statusIndex[this.reqDetail.status]
    },
    descriptions () {
      return [
        this.reqDetail.created_at,
        this.$t('deadline') + '：' + this.reqDetail.apply_due_date,
        this.$t('deadline') + '：' + this.reqDetail.sign_due_date,
        this.$t('deadline') + '：' + this.reqDetail.tender_date,
        '',
        ''
      ]
    }
  }
}
</script>

<style>
</style>
