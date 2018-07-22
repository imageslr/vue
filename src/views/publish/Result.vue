<i18n>
{
  "zh": {
    "publishSucceed": "需求发布成功",
    "description": "现在你可以邀请设计师参与竞标",
    "viewDetail": "查看需求详情"
  },
  "en": {
    "publishSucceed": "Requirement publish succeed",
    "description": "Now you can invite designers to participate in the bidding",
    "viewDetail": "View requirement detail"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card">
      <div class="result">
        <i class="el-icon-success result__icon" />
        <h1
          v-t="$t('publishSucceed')"
          class="result__title" />
        <p
          v-t="$t('description')"
          class="result__description" />
      </div>
      <invite-card
        class="invite-card"
        req-id="reqId" />
    </div>
    <el-button
      class="block w-100 shadow mt-24"
      type="primary"
      @click="$router.push(`/requirement/${reqId}`)">{{ $t('viewDetail') }}</el-button>
  </div>
</template>

<script>
import InviteCard from '@/views/components/InviteCard/index.vue'
export default {
  components: { InviteCard },
  computed: {
    reqId () {
      return this.$route.query.req_id
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  padding: 40px 24px 0;
  text-align: center;
  &__icon {
    color: #5bc039;
    font-size: 72px;
  }
  &__title {
    margin: 24px 0 8px;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
  }
  &__description {
    margin: 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
}
/* 稍微修改一下样式，省得再做个组件 */
.invite-card {
  box-shadow: none;
  /deep/ .card__header {
    position: relative;
    border: none;
    padding-bottom: 0;
    &-title {
      display: none;
    }
    &-search {
      position: relative;
      left: 0;
      top: 0;
    }
  }
}
</style>
