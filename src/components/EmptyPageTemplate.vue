<i18n>
{
  "en": {
    "暂无内容": "No Data"
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
          v-text="title || $t('暂无内容')"/>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
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
