<i18n>
{
  "en": {
    "发表评价成功": "Successfully posted review",
    "查看我发表的评价": "View my posted reviews",
    "返回首页": "Return to feed page"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card result">
      <i class="el-icon-success result__icon" />
      <h1
        v-t="'发表评价成功'"
        class="result__title" />
      <el-button
        class="block w-100"
        type="primary"
        @click="$router.push(`/me/review/posted`)">{{ $t('查看我发表的评价') }}</el-button>
      <el-button
        class="block w-100"
        style="margin: 16px 0 0;"
        @click="$router.push(`/feed`)">{{ $t('返回首页') }}</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result {
  padding: 40px 24px 24px;
  text-align: center;
  &__icon {
    color: #5bc039;
    font-size: 72px;
  }
  &__title {
    margin: 24px 0;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
