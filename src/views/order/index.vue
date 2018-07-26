<i18n>
{
  "zh": {
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
  <div class="container">
    <side-menu class="aside"/>
    <div class="main">
      <order-menu :order-nums="orderNums"/>
      <div class="order-list-container">
        <el-input size="small">
          <el-button
            slot="append"
            type="primary">{{ $t('search') }}</el-button>
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
        </div>
      </div>
    </div>
</div></template>

<script>
import SideMenu from './components/SideMenu'
import OrderMenu from './components/OrderMenu'
import OrderListItem from './components/OrderListItem'
import { getOrdersByUID } from '@/api/order'
export default {
  components: {
    SideMenu,
    OrderMenu,
    OrderListItem
  },
  data () {
    return {
      orderNums: {},
      orders: []
    }
  },
  created () {
    this.getOrders()
  },
  methods: {
    getOrders () {
      getOrdersByUID(this.$store.getters.uid).then(({ data }) => {
        this.orderNums = data.order_nums
        this.orders = data.orders
      })
    },
    getParams () {

    }
  }

}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .aside {
    position: fixed;
    top: 52px;
    left: 0;
    bottom: 0;
    width: 200px;
  }
  .main {
    padding-left: 200px;
  }
}
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
  }
}
</style>
