<template>
  <div class="progress">
    <el-progress
      :percentage="percentage"
      :status="status"
      :show-text="false"
      class="progress__bar"/>
    <div
      v-if="text"
      class="progress__text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  align-items: center;
  &__bar {
    flex: 1;
  }
  &__text {
    padding-left: 8px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
