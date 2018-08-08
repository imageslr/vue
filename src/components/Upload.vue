<i18n>
{
  "zh": {
    "maxSize": "上传文件大小不能超过{size}MB！",
    "tip": "只能上传一个文件，最大不得超过{size}MB"
  },
  "en": {
    "maxSize": "File max size is {size} MB",
    "tip": "Allow upload only one file of which size is less than {size} MB",
    "上传附件": "Upload file",
    "只能上传一个文件": "Allow upload only one file"
  }
}
</i18n>

<template>
  <el-upload
    :on-exceed="onExceed"
    :on-remove="onRemove"
    :http-request="onUpload"
    :before-upload="beforeFileUpload"
    :limit="1"
    action=""
    class="form__uploader mt-12">
    <el-button
      :loading="uploading"
      :disabled="!!fileData">{{ $t('上传附件') }}</el-button>
    <p
      slot="tip"
      class="inline ml-12 black-45"
      v-text="$t('tip', { size: maxSize })"/>
  </el-upload>
</template>

<script>
/**
 * 只允许上传一个文件的选择器
 * @event start
 * @event success (data)
 * @event error (error)
 * @event remove
 */
import { upload } from '@/api/upload'
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    maxSize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      fileData: null,
      uploading: false,
      UPLOAD_SOURCE: null // 用于取消上传
    }
  },
  methods: {
    // 取消上传
    cancel () {
      if (this.UPLOAD_SOURCE) {
        this.UPLOAD_SOURCE.cancel('取消上传')
      }
    },
    beforeFileUpload (file) {
      const isLessThan = file.size / 1024 / 1024 < this.maxSize
      if (!isLessThan) {
        this.$message.error(this.$t('maxSize', { size: this.maxSize }))
      }
      return isLessThan
    },
    onUpload (file) {
      this.$emit('start')
      if (this.UPLOAD_SOURCE) this.UPLOAD_SOURCE.cancel('取消上传')
      this.UPLOAD_SOURCE = this.$axios.CancelToken.source()

      this.uploading = true
      file.onProgress({ percent: 50 }) // 传一个percent参数，显示loading

      upload(this.type, file.file, { cancelToken: this.UPLOAD_SOURCE.token })
        .then(({ data }) => {
          this.uploading = false
          this.fileData = data
          file.onSuccess()
          this.$emit('success', data)
        }).catch(error => {
          console.error(error)
          this.uploading = false
          file.onError()
          this.$emit('error', error)
        })
    },
    onRemove () {
      this.fileData = null
      this.$emit('remove')
    },
    onExceed () {
      this.$message.error(this.$t('只能上传一个文件'))
    }
  }
}
</script>

<style>
</style>
