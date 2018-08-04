<template>
  <el-dialog
    :visible="visible"
    :width="width"
    custom-class="preview-dialog"
    @update:visible="$emit('update:visible', $event)"
    @close="$emit('close')"
    @closed="$emit('closed')">
    <img
      :src="src"
      width="100%"
      class="block">
  </el-dialog>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    }
  }
}
</script>

<style>
.preview-dialog .el-dialog__header {
  padding: 0;
}
.preview-dialog .el-dialog__body {
  padding: 0;
}
</style>
