<i18n>
{
  "zh": {
    "onLimit": "最多可上传 {limit} 张图片"
  },
  "en": {
    "onLimit": "Upload {limit} pictures at most"
  }
}
</i18n>

<template>
  <div>
    <el-upload
      ref="upload"
      :limit="limit"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-exceed="onExceed"
      :http-request="onUpload"
      :file-list="fileList"
      action=""
      multiple
      list-type="picture-card"
      accept="image/jpeg, image/jpg, image/png, image/bmp">
      <i class="el-icon-plus"/>
    </el-upload>
    <el-dialog :visible.sync="preview.visible">
      <img
        :src="preview.src"
        width="100%" >
    </el-dialog>
  </div>
</template>

<script>
/**
 * 多个图片的上传器，可取消
 */
import { upload } from '@/api/upload'
export default {
  props: {
    // upload的type参数
    type: {
      type: String,
      required: true
    },
    // 最大可上传数量
    limit: {
      type: Number,
      default: 9
    },
    // 初始时的图片链接数组
    imageUrls: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // {uid: 文件id, id: 数据库id, url: 返回的url, source: 上传句柄, uploading: boolean}
      //  在数组中的顺序就是选择时的顺序
      uploadList: [],
      fileList: [], // 图片列表，仅用于展示。当前组件中的所有图片信息在uploadList里
      preview: {
        visible: false,
        src: ''
      }
    }
  },
  watch: {
    imageUrls () {
      this.resetLists()
    }
  },
  created () {
    this.resetLists()
  },
  methods: {
    // 获取所有图片的id数组，如果有图片正在上传中则返回false
    getImageIds () {
      let res = []
      for (let i = 0; i < this.uploadList.length; i++) {
        let v = this.uploadList[i]
        if (v.uploading) {
          return false
        } else {
          res.push(v.id)
        }
      }
      return res
    },
    // 获取所有图片的url数组，如果有图片正在上传中则返回false
    getImageUrls () {
      let res = []
      for (let i = 0; i < this.uploadList.length; i++) {
        let v = this.uploadList[i]
        if (v.uploading) {
          return false
        } else {
          res.push(v.url)
        }
      }
      return res
    },
    // 清空所有上传的文件，取消正在上传的请求
    clear () {
      this.uploadList.forEach(v => v.source && v.source.cancel('取消上传')) // 取消全部上传请求
      this.uploadList = []
    },
    onUpload (file) {
      let fileRaw = file.file
      let uid = fileRaw.uid
      let source = this.$axios.CancelToken.source()

      // 加入到上传列表中
      this.uploadList.push({
        source,
        uid,
        id: null,
        url: '',
        uploading: true
      })

      // 传一个percent参数，显示loading
      file.onProgress({ percent: 50 })
      upload(this.type, fileRaw, { cancelToken: source.token })
        .then(({ data }) => {
          // 上传成功时记录id
          this.uploadList.some(v => {
            if (v.uid === fileRaw.uid) {
              v.id = data.id
              v.url = data.path
              v.uploading = false
              return true
            }
            return false
          })
          file.onSuccess()
        }).catch(error => {
          // 上传失败时从列表中删除
          this.uploadList.filter(v => {
            return v.uid !== fileRaw.uid
          })
          console.info(error)
          file.onError()
        })
    },
    // 从列表里删除；如果是正在上传中，取消上传
    onRemove (file) {
      this.uploadList = this.uploadList.filter(v => {
        if (file.uid === v.uid) {
          if (v.source) v.source.cancel()
          return false
        }
        return true
      })
    },
    onExceed () {
      this.$message.error(this.$t('onLimit', { limit: this.limit }))
    },
    onPreview (image) {
      this.preview.visible = true
      this.preview.src = image.url
    },
    resetLists () {
      let increment = 0
      this.fileList = this.imageUrls.map(v => {
        return {
          name: 'uploaded',
          uid: Date.now() + increment++, // 自定义uid
          url: v
        }
      })
      this.uploadList = this.imageUrls.map((v, index) => {
        return {
          uid: this.fileList[index].uid, // 用uid标识文件
          url: v
        }
      })
    }
  }
}
</script>

<style>
</style>
