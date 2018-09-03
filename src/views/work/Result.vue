<i18n>
{
  "en": {
    "添加作品成功": "Successfully add work",
    "修改作品成功": "Successfully edit work",
    "继续添加作品": "Continue to add work",
    "查看个人主页": "View home page"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card result">
      <i class="el-icon-success result__icon" />
      <h1
        v-t="edit ? '修改作品成功' : '添加作品成功'"
        class="result__title" />
      <el-button
        v-if="!edit"
        class="block w-100"
        type="primary"
        @click="$router.push(`/work/add`)">{{ $t('继续添加作品') }}</el-button>
      <el-button
        :type="edit ? 'primary' : 'default'"
        class="block w-100"
        style="margin: 16px 0 0;"
        @click="$router.push(`/profile?uid=${$uid()}`)">{{ $t('查看个人主页') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    edit () {
      return this.$route.query.edit
    }
  }
}
</script>

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
