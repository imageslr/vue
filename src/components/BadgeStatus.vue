<template>
  <span class="badge-status">
    <span
      :class="'is-' + status"
      class="badge-status-dot"/>
    <span
      v-t="text"
      v-if="text"
      class="badge-status-text"/>
  </span>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: 'default' // info, success, warning, error
    },
    text: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.badge-status {
  line-height: inherit;
  vertical-align: baseline;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  &-dot {
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }
  &-text {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin-left: 8px;
  }
}
.badge-status-dot {
  &.is-default {
    background-color: #d9d9d9;
  }
  &.is-info {
    background-color: #29b2fe;
  }
  &.is-success {
    background-color: #52c41a;
  }
  &.is-warning {
    background-color: #faad14;
  }
  &.is-error {
    background-color: #f5222d;
  }
}
</style>
