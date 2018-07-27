<i18n>
{
  "zh": {
    "participating": "设计师参与中",
    "waitingToSign": "待托管赏金并签单",
    "working": "设计师作标中",
    "tendering": "设计师交标中",
    "hasTendered": "交标日期已过",
    "evaluating": "评标中",
    "sysEvaluating": "超时未评标，系统评标中",
    "hasEvaluated": "已评标",
    "announcing": "公布中标单位中",
    "waitingToPay": "待支付",
    "refunding": "余款退还中",
    "refundSucceed": "余款退还成功",
    "refundFailed": "余款退还失败",
    "finished": "交易成功",
    "unreview": "{num} 位待评价设计师"
  },
  "en": {

  }
}
</i18n>

<template>
  <div class="status-container">
    <!-- 设计师参与中 -->
    <template v-if="status === 1000">
      <badge-status
        :text="$t('participating')"
        status="info" />
      <req-progress :req-detail="order" />
    </template>
    <!-- 待签单 -->
    <badge-status
      v-if="status === 1010"
      :text="$t('waitingToSign')"
      status="info" />
    <!-- 设计师作标中 -->
    <badge-status
      v-if="status === 1100"
      :text="$t('working')"
      status="info" />
    <!-- 设计师交标中 -->
    <template v-if="status === 1110">
      <badge-status
        :text="$t('tendering')"
        status="info" />
      <my-progress
        :percentage="parseInt(100 * order.current_tender_num / order.current_apply_num)"
        :text="order.current_tender_num + '/' + order.current_apply_num"/>
    </template>
    <!-- 待评标 -->
    <template v-if="status === 1120">
      <badge-status :text="$t('hasTendered')" />
      <badge-status
        :text="$t('evaluating')"
        status="info"/>
    </template>
    <!-- 待评标 -->
    <template v-if="status === 1130">
      <badge-status :text="$t('hasTendered')" />
      <badge-status
        :text="$t('sysEvaluating')"
        status="info"/>
    </template>
    <!-- 公布中 -->
    <template v-if="status === 1140">
      <badge-status :text="$t('hasEvaluated')" />
      <badge-status
        :text="$t('announcing')"
        status="info"/>
    </template>
    <!-- 待支付 -->
    <badge-status
      v-if="status === 1200"
      :text="$t('waitingToPay')"
      status="info" />
    <!-- 交易完成 -->
    <template v-if="status >= 1210">
      <badge-status :text="$t('finished')" />
      <badge-status
        v-if="status === 1211"
        :text="$t('refunding')"
        status="info"/>
      <badge-status
        v-if="status === 1212"
        :text="$t('refundSucceed')"/>
      <badge-status
        v-if="status === 1213"
        :text="$t('refundFailed')"
        status="error"/>
      <badge-status
        v-if="order.review_status"
        :text="$t('unreview', {num: order.review_status})"
        status="info"/>
    </template>
  </div>
</template>

<script>
import ReqProgress from '../../requirement/components/ReqProgress'
export default {
  components: {
    ReqProgress
  },
  props: {
    order: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    status () {
      return this.order.status
    }
  }
}
</script>

<style lang="scss" scoped>
.status-container {
  > * {
    margin-bottom: 4px !important;
  }
  .progress {
    width: 180px;
    margin: 0 auto;
  }
  .badge-status {
    display: block;
  }
}
</style>
