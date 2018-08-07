<i18n>
{
  "zh": {
    "placeholder": "发照片或者动态",
    "photoBtn": "发照片",
    "maxPhotoNumber": "最多可上传 9 张照片",
    "uploading": "图片正在上传中，请稍候"
  },
  "en": {
    "placeholder": "Publish photo or activity",
    "photoBtn": "Choose photo",
    "maxPhotoNumber": "Add 9 photos at most",
    "uploading": "Photo is uploading, please wait"
  }
}
</i18n>

<template>
  <div class="card">
    <el-input
      ref="input"
      v-model="content"
      :placeholder="$t('placeholder')"
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
        <el-upload
          ref="upload"
          :limit="9"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-exceed="onExceed"
          :http-request="onUpload"
          action=""
          multiple
          class="mb-12"
          list-type="picture-card"
          accept="image/jpeg, image/jpg, image/png, image/bmp">
          <i class="el-icon-plus"/>
        </el-upload>
        <el-button
          class="left"
          @click="onCancel">{{ $t('g.cancelBtn') }}</el-button>
      </template>
      <el-button
        v-else
        round
        class="left publish-card__photo-btn"
        @click="onFocus"><icon name="camera-retro" />{{ $t('photoBtn') }}</el-button>
      <el-button
        :loading="publishBtnLoading"
        type="primary"
        class="right"
        @click="onPublish">{{ $t('g.publish') }}</el-button>
    </div>
    <el-dialog :visible.sync="preview.visible">
      <img
        :src="preview.src"
        width="100%" >
    </el-dialog>
  </div>
</template>

<script>
import 'vue-awesome/icons/camera-retro'
import { publishActivity } from '@/api/activity'
import { upload } from '@/api/upload'
export default {
  data () {
    return {
      content: '',
      photoImageIds: [],
      inputing: false,
      publishBtnLoading: false,
      preview: {
        visible: false,
        src: ''
      },
      uploadingCount: 0, // 正在上传的文件数量
      uploadQueue: [] // 上传队列的source，可以cancel
    }
  },
  methods: {
    onFocus () {
      // this.uploadingCount = 0
      this.inputing = true
    },
    onPreview (photo) {
      this.preview.visible = true
      this.preview.src = photo.url
    },
    onRemove (photo) {
      this.photoImageIds = this.photoImageIds.filter(id => {
        return photo.response.id != id // eslint-disable-line eqeqeq
      })
    },
    onExceed () {
      this.$message.error(this.$t('maxPhotoNumber'))
    },
    onUpload (file) {
      let source = this.$axios.CancelToken.source()
      this.uploadQueue.push(source) // 加入到上传队列中
      this.uploadingCount++ // 信号量+1
      file.onProgress({ percent: 50 }) // 传一个percent参数，显示loading
      upload('activity_photo', file.file, { cancelToken: source.token })
        .then(({ data }) => {
          this.uploadingCount && this.uploadingCount-- // 信号量-1
          file.onSuccess()
          this.photoImageIds.push(data.id)
        }).catch(error => {
          this.uploadingCount && this.uploadingCount-- // 信号量-1
          file.onError()
          console.error(error)
        })
    },
    onPublish () {
      if (!this.inputing) {
        this.inputing = true
        return
      }
      if (this.uploadingCount > 0) {
        return this.$message.warning(this.$t('uploading'))
      }
      if (this.content.length === 0 && !this.photoImageIds.length) {
        return
      }
      this.publishBtnLoading = true
      let { content, photoImageIds } = this
      publishActivity({ content, photo_image_ids: photoImageIds }).then(({ data }) => {
        this.$refs.upload.clearFiles()
        Object.assign(this.$data, this.$options.data()) // 重置data
        this.$emit('published', data)
      }).catch((e) => {
        console.log(e.message)
        this.publishBtnLoading = false
      })
    },
    onCancel () {
      this.uploadQueue.forEach(v => v.cancel('取消上传')) // 取消全部上传请求
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
