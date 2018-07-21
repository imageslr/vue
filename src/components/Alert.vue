<template>
  <div :class="['alert', type]">
    <i
      :class="'el-icon-' + type"
      class="alert__icon"/>
    <slot>
      <p
        v-t="title"
        class="alert__title"/>
    </slot>
    <el-button
      v-if="actionText"
      type="text"
      class="alert__button"
      @click="$emit('clickAction', $event)">{{ actionText }}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'info' // warning, success
    },
    title: {
      type: String,
      default: ''
    },
    actionText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  &.warning {
    background: #fffbe6;
    border: 1px solid #ffe58f;
    border-radius: 4px;
    .alert__icon {
      color: #ffbf00;
    }
  }
  &.success {
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 4px;
    .alert__icon {
      color: #52c41a;
    }
  }
  &.info {
    background: rgba(0, 160, 220, 0.1);
    border: 1px solid #bae7ff;
    border-radius: 4px;
    .alert__icon {
      color: #0077b5;
    }
  }
  &.error {
    background: #fff1f0;
    border: 1px solid #ffa39e;
    border-radius: 4px;
    .alert__icon {
      color: #f5222d;
    }
  }
  &__title {
    flex: 1;
    margin: 0 8px 0;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  &__button {
    padding-top: 0;
    padding-bottom: 0;
    color: rgba(0, 119, 181, 0.9);
  }
}
</style>
