<template>
  <div
    v-show="loading || error"
    class="loader">
    <i
      v-if="loading"
      class="el-icon-loading" />
    <el-button
      v-if="error"
      plain
      size="mini"
      @click="onReload()">{{ btnText || $t('g.reload') }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: null
    },
    onReload: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  padding: 16px 0;
  text-align: center;
}
</style>
