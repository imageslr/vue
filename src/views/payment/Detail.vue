<i18n>
{
  "en": {
    "设计费汇款详情": "Design fee remittance detail",
    "查看项目详情": "View project detail",
    "汇款信息": "Remittance information",
    "汇款单号": "Remittance slip number",
    "收款行": "Receive bank name",
    "收款人姓名": "Receiver name",
    "汇款金额": "Remittance amount",
    "汇款日期": "Remittance date",
    "信息录入于": "Information recorded in"
  }
}
</i18n>

<template>
  <el-card class="container">
    <div slot="header">
      <span v-t="'设计费汇款详情'" />
      <el-button
        :disabled="loading"
        style="float: right; padding: 3px 0"
        type="text"
        @click="$router.push(`/project/${payment.project_id}`)">{{ $t('查看项目详情') }}</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :show-header="false"
      border
      stripe>
      <el-table-column
        prop="label"
        label="" />
      <el-table-column
        prop="value"
        label=" " />
    </el-table>
  </el-card>
</template>

<script>
import { getPaymentById } from '@/api/payment'
export default {
  data () {
    return {
      loading: true,
      payment: {}
    }
  },
  computed: {
    tableData () {
      const { number, bank, name, amount, remitted_at, created_at } = this.payment

      return [{
        label: this.$t('汇款单号'),
        value: number
      }, {
        label: this.$t('收款行'),
        value: bank
      }, {
        label: this.$t('收款人姓名'),
        value: name
      }, {
        label: this.$t('汇款金额'),
        value: amount
      }, {
        label: this.$t('汇款日期'),
        value: remitted_at
      }, {
        label: this.$t('信息录入于'),
        value: created_at
      }]
    }
  },
  created () {
    this.getPayment()
  },
  methods: {
    getPayment () {
      getPaymentById(this.$route.params.id).then(({ data }) => {
        this.payment = data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 600px;
  margin: 48px auto;
}
</style>
