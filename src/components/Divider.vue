<template>
  <div :style="{margin: '0 ' + margin + 'px'}">
    <div class="divider"/>
  </div>
</template>

<script>
export default {
  props: {
    margin: {
      type: String | Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.divider {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
