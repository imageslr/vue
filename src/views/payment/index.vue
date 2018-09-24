<i18n>
{
  "zh": {
    "alert": "到目前为止，我一共赚到了设计费 {total} 元"
  },
  "en": {
    "alert": "Until now, I has gained design fee {total} ",
    "操作": "Action",
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
  <div
    class="main-container card"
    style="margin: 24px auto; padding: 24px;">
    <my-alert
      :title="$t('alert', {total: totalPayment})"
      class="mb2"/>
    <el-table
      v-loading="loading"
      :data="payments"
      stripe>
      <el-table-column
        v-for="item in tableColumns"
        :key="item.id"
        :prop="item.prop"
        :label="item.label" />
      <el-table-column
        :label="$t('操作')">
        <template slot-scope="scope">
          <router-link
            :to="`/project/${scope.row.project_id}`">
            <el-button
              type="text">{{ $t('查看项目详情') }}</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-count="pageCount"
      background
      layout="prev, pager, next"
      class="mt2 center"
      @current-change="onChangePage"/>
  </div>
</template>

<script>
import { getPayments } from '@/api/payment'
export default {
  data () {
    return {
      payments: [],
      pageCount: 1,
      currentPage: 1,
      loading: false,
      error: false
    }
  },
  computed: {
    totalPayment () {
      return this.$store.getters.userInfo.total_payment.toFixed(2)
    },
    tableColumns () {
      return [{
        label: 'ID',
        prop: 'id'
      }, {
        label: this.$t('汇款单号'),
        prop: 'number'
      }, {
        label: this.$t('收款行'),
        prop: 'bank'
      }, {
        label: this.$t('收款人姓名'),
        prop: 'name'
      }, {
        label: this.$t('汇款金额'),
        prop: 'amount'
      }, {
        label: this.$t('汇款日期'),
        prop: 'remitted_at'
      }, {
        label: this.$t('信息录入于'),
        prop: 'created_at'
      }]
    }
  },
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    this.getPayments()
  },
  methods: {
    getPayments () {
      this.loading = true
      this.error = false
      const { currentPage } = this
      getPayments(currentPage)
        .then(({ data: { data: payments, meta: { pagination } } }) => {
          this.loading = false
          this.payments = payments
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
          this.error = true
        })
    },
    onChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          p: page
        }
      })
    }
  }
}
</script>

<style>
</style>
