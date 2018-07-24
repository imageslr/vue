<template>
  <div
    v-show="loading"
    class="loader"
    style="text-align: center">
    <i class="el-icon-loading" />
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
