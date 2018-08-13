<i18n>
{
  "en": {
    "没有新的通知": "No new notifications"
  }
}
</i18n>

<template>
  <div className="empty-content">
    <div class="exception-content">
      <img
        src="https://img.alicdn.com/tfs/TB1WNNxjBHH8KJjy0FbXXcqlpXa-780-780.png"
        class="imgException">
      <h3
        class="title"
        v-text="$t('没有新的通知')"/>
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
    color: rgb(51, 51, 51);
  }
}
</style>
