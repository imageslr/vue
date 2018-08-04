<i18n>
{
  "zh": {
    "orderNo": "订单号",
    "orderDetail": "订单详情",
    "review": "评 价"
  },
  "en": {

  }
}
</i18n>

<template>
  <div :class="['list-container', {'is-finished': isFinished }]">
    <div class="title">
      <span
        v-t="order.created_at"
        class="f-14 black-85 bold mr2" />
      <span
        v-t="$t('orderNo') + '：' + order.req_no"
        class="f-14 black-65" />
    </div>
    <div class="content">
      <div
        class="content__title"
        style="width:35%">
        <router-link
          v-t="order.title"
          :to="'/project/'+order.id"
          tag="p"
          class="content__title-link"/>
        <p
          v-t="order.tender_description"
          class="f-14 m0 black-45 ellipsis-1" />
      </div>
      <div
        v-t="type"
        style="width:10%"/>
      <div style="width:10%">
        ￥{{ order.price }}
      </div>
      <div style="width:10%">
        <span v-if="isFinished">￥{{ order.actual_payment }}</span>
      </div>
      <div
        class="content__status"
        style="width:25%">
        <order-status :order="order" />
      </div>
      <div
        style="width:10%"
        class="content__action">
        <el-button
          type="primary"
          size="small"
          @click="$router.push('/order/' + order.id)">{{ $t('orderDetail') }}</el-button>
        <el-button
          v-if="order.status >= 1200 && order.review_status"
          size="small">{{ $t('review') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStatus from './OrderStatus'
export default {
  components: {
    OrderStatus
  },
  props: {
    order: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    isFinished () {
      const { status } = this.order
      return status === 1210 || status === 1212 || status === 500
    },
    type () {
      const type = [
        '海选', '入围', '邀标'
      ]
      return type[this.order.type - 1]
    }
  }

}
</script>

<style lang="scss" scoped>
.list-container {
  background: #fff;
  border: 1px solid #bae7ff;
  .title {
    padding: 12px 24px;
    background: rgba(0, 160, 220, 0.1);
    border-bottom: 1px solid #bae7ff;
  }
  &.is-finished {
    border: 1px solid #e8e8e8;
    .title {
      background: #f1f1f1;
      border-bottom: 1px solid #e8e8e8;
    }
    .content .content__status {
      border-left: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
    }
  }
  .content {
    display: table;
    table-layout: fixed;
    width: 100%;
    & > div {
      display: table-cell;
      padding: 24px 0;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      text-align: center;
      vertical-align: middle;
    }
    &__title {
      padding-left: 24px !important;
      text-align: left !important;
      &-link {
        display: inline-block;
        margin: 0 0 8px;
        line-height: 22px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    &__status {
      border-left: 1px solid #bae7ff;
      border-right: 1px solid #bae7ff;
    }
    &__action {
      .el-button {
        width: 80px;
        margin: 0 0 8px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
