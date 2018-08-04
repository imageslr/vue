<i18n>
{
  "zh": {
    "uploadFile": "上传附件",
    "fileFormat": "附件格式",
    "title": {
      "supplement": "补充需求",
      "apply": "上传投标文件"
    },
    "placeholder": {
      "supplement": "请输入补充内容",
      "apply": "备注说明"
    },
    "errorMessage": {
      "supplement": "补充内容不能为空"
    }
  },
  "en": {
    "uploadFile": "Upload file",
    "fileFormat": "File format",
    "title": {
      "supplement": "Supplement Project",
      "apply": "Upload Tender File"
    },
    "errorMessage": {
      "supplement": "Supplement content cannot be empty"
    }
  }
}
</i18n>

<template>
  <el-dialog
    :visible="visible"
    :title="title"
    @update:visible="$emit('update:visible', $event)">
    <el-input
      v-model="textarea"
      :rows="7"
      :placeholder="placeholder"
      type="textarea"/>
    <el-upload
      :file-list="fileList"
      action=""
      class="mt-12">
      <el-button>{{ $t('uploadFile') }}</el-button>
      <p
        v-t="uploadTip"
        slot="tip"
        class="inline ml-12 black-45"/>
    </el-upload>
    <span
      slot="footer"
      class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">{{ $t('g.cancelBtn') }}</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="onConfirm">{{ $t('g.confirmBtn') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Project from '@/models/project'
import { supplementProjectById } from '@/api/project'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    reqDetail: {
      type: Object,
      default () {
        return Project.parse()
      }
    },
    type: {
      type: String,
      default: 'supplement',
      validator: (val) => ['supplement', 'apply'].includes(val)
    }
  },
  data () {
    return {
      loading: false,
      textarea: '',
      fileList: []
    }
  },
  computed: {
    uploadTip () {
      return this.$t('fileFormat') + ': ' + ['png', 'jpeg', 'doc', 'docx', 'pdf', 'zip', 'rar'].join('、')
    },
    title () {
      return this.$t('title.' + this.type)
    },
    placeholder () {
      return this.$t('placeholder.' + this.type)
    }
  },
  methods: {
    onConfirm () {
      if (this.type === 'supplement' && !this.textarea.length) {
        return this.$message.error(this.$t('errorMessage.supplement'))
      }
      if (this.type === 'supplement') {
        this.supplement()
      } else {
        this.apply()
      }
    },
    supplement () {
      this.loading = true
      supplementProjectById(this.reqDetail.id, {
        supplement_description: this.textarea
        // TODO fileupload
      }).then(({ data: { supplement_at, supplement_document_url } }) => {
        this.loading = false
        this.$emit('update:visible', false)
        this.$emit('update:reqDetail', {
          ...this.reqDetail,
          supplement_description: this.textarea,
          supplement_at,
          supplement_document_url
        })
      }).catch(() => {
        this.loading = false
      })
    },
    apply () {
      // this.loading = true
    }
  }
}
</script>

<style>
</style>
