<i18n>
{
  "zh": {
    "publishSucceed": "项目发布成功",
    "description": "现在你可以邀请设计师参与竞标",
    "viewDetail": "查看项目详情"
  },
  "en": {
    "publishSucceed": "Project publish succeed",
    "description": "Now you can invite designers to participate in the bidding",
    "viewDetail": "View project detail"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card result">
      <i class="el-icon-success result__icon" />
      <h1
        v-t="$t('publishSucceed')"
        class="result__title" />
      <el-button
        class="block w-100"
        type="primary"
        @click="$router.push(`/project/${$route.query.id}`)">{{ $t('viewDetail') }}</el-button>
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
  &__description {
    margin: 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
