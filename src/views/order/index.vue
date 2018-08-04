<i18n>
{
  "zh": {
    "placeholder": "输入项目标题或订单号进行搜索",
    "search": "搜索订单",
    "captions": {
      "title": "需求名称",
      "budget": "需求预算",
      "type": "类型",
      "actualPayment": "实付金额",
      "status": "订单状态",
      "action": "订单操作"
    }
  },
  "en": {
    "search": "Search order"
  }
}
</i18n>

<template>
  <div>
    <order-menu :order-nums="orderNums"/>
    <div class="order-list-container">
      <el-input
        v-model="keywordTemp"
        :placeholder="$t('placeholder')"
        size="small">
        <el-button
          slot="append"
          type="primary"
          @click="onSearch">{{ $t('search') }}</el-button>
      </el-input>
      <div class="order-list">
        <div class="order-list__caption">
          <div
            v-t="$t('captions.title')"
            class="order-list__caption-item"
            style="width:35%" />
          <div
            v-t="$t('captions.type')"
            class="order-list__caption-item"
            style="width:10%" />
          <div
            v-t="$t('captions.budget')"
            class="order-list__caption-item"
            style="width:10%" />
          <div
            v-t="$t('captions.actualPayment')"
            class="order-list__caption-item"
            style="width:10%" />
          <div
            v-t="$t('captions.status')"
            class="order-list__caption-item"
            style="width:25%" />
          <div
            v-t="$t('captions.action')"
            class="order-list__caption-item"
            style="width:10%" />
        </div>
        <order-list-item
          v-for="order in orders"
          :key="order.id"
          :order="order"
          class="order-list__item" />
        <el-pagination
          :current-page.sync="currentPage"
          :total="total"
          :page-size="20"
          background
          layout="prev, pager, next"
          @current-change="onNavigate"/>
      </div>
    </div>
  </div>
</template>

<script>
import OrderMenu from './components/OrderMenu'
import OrderListItem from './components/OrderListItem'
import { getOrdersByUID } from '@/api/order'
export default {
  components: {
    OrderMenu,
    OrderListItem
  },
  data () {
    return {
      orderNums: {},
      orders: [],
      currentPage: 1,
      total: 0,
      type: 'all',
      keywordTemp: '', // 输入框中的关键字
      keyword: '' // query 中的关键字
    }
  },
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    if (this.$route.query.type) this.type = this.$route.query.type
    if (this.$route.query.keyword) this.keywordTemp = this.keyword = this.$route.query.keyword
    this.getOrders()
  },
  methods: {
    getOrders () {
      const { currentPage, type, keyword } = this
      const params = {
        start: currentPage * 20,
        type,
        keyword
      }
      getOrdersByUID(this.$store.getters.uid, params).then(({ data }) => {
        this.orderNums = data.order_nums
        this.orders = data.orders
        this.total = data.total
      })
    },
    onSearch () {
      if (!this.keywordTemp) return
      this.$router.push({
        path: this.$route.path,
        query: {
          type: this.type,
          keyword: this.keywordTemp
        }
      })
    },
    onNavigate (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: this.type,
          keyword: this.keyword,
          p: page
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.order-list-container {
  padding: 24px 32px;
  background-color: #fff;
  .el-input {
    width: 350px;
  }
  .order-list {
    &__caption {
      display: table;
      width: 100%;
      padding: 16px 0;
      margin-top: 24px;
      background-color: #fafafa;
      &-item {
        display: table-cell;
        font-size: 14px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
        text-align: center;
      }
    }
    &__item {
      margin-top: 16px;
    }
    .el-pagination {
      padding: 16px 0;
      text-align: center;
    }
  }
}
</style>
