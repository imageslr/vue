<i18n>
{
  "zh": {
    "orderStatus": {
      "all": "所有订单",
      "tendering": "招标中",
      "waitingToSign": "待签单",
      "working": "作标中",
      "waitingToOpen": "待开标",
      "evaluating": "评标中",
      "announcing": "公布中",
      "waitingToPay": "待支付",
      "waitingToReview": "待评价",
      "finished": "已完成"
    }
  },
  "en": {

  }
}
</i18n>
<template>
  <el-menu
    :default-active="$route.query.type || 'all'"
    mode="horizontal"
    @select="onNavigate">
    <el-menu-item
      v-for="item in status"
      :key="item"
      :index="item">
      <template slot="title">
        <span v-t="$t('orderStatus.' + item)" />
        <span
          v-if="orderNums[item] && item != 'all' && item != 'finished'"
          class="color-primary f-14"
          v-text="orderNums[item]" />
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    orderNums: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      status: [
        'all',
        'tendering',
        'waitingToSign',
        'working',
        'waitingToOpen',
        'evaluating',
        'announcing',
        'waitingToPay',
        'finished'
      ]
    }
  },
  methods: {
    onNavigate (index) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: index,
          p: 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
