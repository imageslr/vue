<template>
  <el-dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
  >
    123123
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>
