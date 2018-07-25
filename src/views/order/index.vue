<i18n>
{
  "zh": {
    "order": "我的订单",
    "review": "我的评论",
    "reviewSended": "我发出的评论",
    "reviewReceived": "我收到的评论"
  },
  "en": {
    "order": "My orders",
    "review": "My reviews",
    "reviewSended": "Sended",
    "reviewReceived": "Received"
  }
}
</i18n>

<template>
  <div class="container">
    <el-menu
      :default-active="$route.path"
      :default-openeds="['/review']"
      class="aside"
      router>
      <el-menu-item index="/order">{{ $t('order') }}</el-menu-item>
      <el-submenu index="/review">
        <template slot="title">{{ $t('review') }}</template>
        <el-menu-item index="/review/sended">{{ $t('reviewSended') }}</el-menu-item>
        <el-menu-item index="/review/received">{{ $t('reviewReceived') }}</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="main">
      <order-menu :order-nums="orderNums"/>
    </div>
</div></template>

<script>
import OrderMenu from './components/OrderMenu'
import { getOrdersByUID } from '@/api/order'
export default {
  components: {
    OrderMenu
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
    }
  }

}
</script>

<style lang="scss" scoped>
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
</style>
