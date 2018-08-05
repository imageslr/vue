<i18n>
{
  "zh": {
    "title": "页面暂无内容",
    "description": "您访问的页面不存在，请查看其他页面继续浏览"
  },
  "en": {
    "title": "Page is empty",
    "description": "The page you visit is not found. Please visit other page."
  }
}
</i18n>

<template>
  <div className="empty-content">
    <div class="exception-content">
      <img
        src="https://img.alicdn.com/tfs/TB1WNNxjBHH8KJjy0FbXXcqlpXa-780-780.png"
        class="imgException">
      <div>
        <h3
          class="title"
          v-text="$t('title')"/>
        <p
          class="description"
          v-html="$t('description')"/>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.exception-content {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .imgException {
    max-width: 260px;
    margin-right: 50px;
  }
  .title {
    font-size: 24px;
    margin: 20px 0;
    color: rgb(51, 51, 51);
  }
  .description {
    font-size: 16px;
    color: rgb(102, 102, 102);
  }
}
</style>
