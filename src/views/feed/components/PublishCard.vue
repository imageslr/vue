<i18n>
{
  "en": {
    "发照片或者动态": "Publish photo or activity",
    "发照片": "Choose photo",
    "图片正在上传中，请稍候": "Photo is uploading, please wait"
  }
}
</i18n>

<template>
  <div class="card">
    <el-input
      ref="input"
      v-model="content"
      :placeholder="$t('发照片或者动态')"
      resize="none"
      autosize
      maxlength="200"
      class="publish-card__input"
      type="textarea"
      @focus="onFocus"/>
    <div
      v-if="inputing"
      class="publish-card__counter">{{ content.length }} / 200</div>
    <my-divider margin="12"/>
    <div class="clearfix p-12">
      <template v-if="inputing">
        <my-multi-upload
          ref="upload"
          type="activity_photo"
          class="mb-12" />
        <el-button
          class="left"
          @click="onCancel">{{ $t('g.cancelBtn') }}</el-button>
      </template>
      <el-button
        v-else
        round
        class="left publish-card__photo-btn"
        @click="onFocus"><icon name="camera-retro" />{{ $t('发照片') }}</el-button>
      <el-button
        :loading="publishBtnLoading"
        type="primary"
        class="right"
        @click="onPublish">{{ $t('g.publish') }}</el-button>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/camera-retro'
import { publishActivity } from '@/api/activity'
export default {
  data () {
    return {
      content: '',
      inputing: false,
      publishBtnLoading: false
    }
  },
  methods: {
    onFocus () {
      // this.uploadingCount = 0
      this.inputing = true
    },
    onPublish () {
      if (!this.inputing) {
        this.inputing = true // 不聚焦的时候点击按钮自动聚焦
        return
      }
      let { content } = this
      let photoIds = this.$refs.upload.getImageIds()
      if (photoIds === false) {
        return this.$message.warning(this.$t('图片正在上传中，请稍候'))
      }
      if (this.content.length === 0 && !photoIds.length) {
        return
      }
      this.publishBtnLoading = true
      publishActivity({ content, photo_image_ids: photoIds }).then(({ data }) => {
        this.$refs.upload.clear()
        Object.assign(this.$data, this.$options.data()) // 重置data
        this.$emit('published', data)
      }).catch((e) => {
        this.publishBtnLoading = false
      })
    },
    onCancel () {
      this.$refs.upload.clear() // 取消全部上传请求
      Object.assign(this.$data, this.$options.data())
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
.publish-card__counter {
  position: absolute;
  right: 12px;
  bottom: 72px;
  color: rgba(0, 0, 0, 0.3);
}
</style>
