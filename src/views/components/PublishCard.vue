<template>
  <div class="card">
    <el-input
      v-model="textarea"
      :placeholder="$t('publish.placeholder')"
      autosize
      class="publish-card__input"
      type="textarea"/>
    <divider margin="12"/>
    <div class="clearfix p-12">
      <el-button
        round
        class="left publish-card__photo-btn"><icon name="camera-retro" />{{ $t('publish.photoBtn') }}</el-button>
      <el-button
        type="primary"
        class="right">{{ $t('publish.publishBtn') }}</el-button>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/camera-retro'
export default {
  data () {
    return {
      textarea: ''
    }
  }
}
</script>

<style>
.publish-card__photo-btn span {
  display: flex;
  align-items: center;
}
.publish-card__photo-btn .fa-icon {
  margin-right: 8px;
}
.publish-card__input {
  padding: 24px 12px;
}
.publish-card__input textarea {
  border: none;
  padding: 0px;
  font-size: 16px;
}
</style>
