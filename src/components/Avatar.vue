<template>
  <img
    v-if="avatarUrl"
    :src="avatarUrl"
    class="avatar">
  <icon
    v-else
    class="avatar"
    name="user-circle" />
</template>

<script>
import 'vue-awesome/icons/user-circle'
export default {
  props: {
    avatarUrl: {
      type: String,
      default: ''
    },
    square: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 80px;
  height: 80px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: inset 0 1.5px 3px 0 rgba(0, 0, 0, 0.15),
    0 1.5px 3px 0 rgba(0, 0, 0, 0.15);
  color: rgba(0, 0, 0, 0.45);
  background-color: #f5f5f5;
}
</style>
