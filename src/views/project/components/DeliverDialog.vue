<i18n>
{
  "en": {
    "上传交付文件": "Upload delivery file",
    "备注信息（5000字以内）": "Remark (up to 5000 characters)",
    "正在上传附件，请稍后": "File uploading, please wait",
    "请上传交付的设计文件": "Please upload the design file to deliver",
    "提交成功": "Successfully uploaded",
    "查看已上传的设计文件": "View the delivered design file"
  }
}
</i18n>

<template>
  <el-dialog
    :visible.sync="visible"
    :title="$t('上传交付文件')">
    <el-input
      v-model="form.remark"
      :rows="5"
      :placeholder="$t('备注信息（5000字以内）')"
      :maxlength="5000"
      type="textarea"/>
    <my-upload
      ref="upload"
      :max-size="100"
      type="delivery_file"
      class="mt-12"
      @start="onUploadStart"
      @success="onUploadSuccess"
      @error="onUploadError"
      @remove="onUploadRemove"/>
    <my-alert
      v-if="hasSubmitted"
      class="mt-12">
      <a
        :href="project.delivery.file_url"
        target="_blank">{{ $t('查看已上传的设计文件') }}</a>
    </my-alert>
    <span
      slot="footer"
      class="dialog-footer">
      <el-button @click="onCancel">{{ $t('g.cancelBtn') }}</el-button>
      <el-button
        :loading="submitting"
        type="primary"
        @click="onConfirm">{{ $t('g.confirmBtn') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deliverProjectById, updateDeliveryById } from '@/api/project'
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      visible: false,
      form: {
        remark: '',
        file_url: null
      },
      uploading: false,
      submitting: false
    }
  },
  computed: {
    // 是否已经提交了交付文件
    hasSubmitted () {
      return !!this.project.delivery
    }
  },
  watch: {
    visible () {
      const { delivery } = this.project
      if (delivery) {
        this.form = {
          remark: delivery.remark,
          file_url: delivery.file_url
        }
      }
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    onConfirm () {
      if (this.uploading) {
        this.$message.warning(this.$t('正在上传附件，请稍后'))
        return false
      }
      if (!this.form.file_url) {
        return this.$message.warning(this.$t('请上传交付的设计文件'))
      }

      // 如果没有数据改变，就直接关闭dialog
      if (this.hasSubmitted) {
        const { form, project: { delivery } } = this
        if (form.remark === delivery.remark &&
        form.file_url === delivery.file_url) {
          this.visible = false
          return
        }
      }

      this.submitting = true

      // 判断是否已经提交过交付文件，如果提交过则修改
      const fn = this.hasSubmitted
        ? updateDeliveryById(this.project.delivery.id, this.form)
        : deliverProjectById(this.project.id, this.form)

      fn.then(({ data }) => {
        this.submitting = false
        this.visible = false
        this.$message.success(this.$t('提交成功'))
        this.$emit('delivered', data)
      }).catch(() => {
        this.submitting = false
      })
    },
    onCancel () {
      this.$refs.upload.cancel()
      this.visible = false
    },
    onUploadStart () {
      this.uploading = true
    },
    onUploadSuccess (data) {
      this.uploading = false
      this.form.file_url = data.path
    },
    onUploadError () {
      this.uploading = false
    },
    onUploadRemove () {
      this.form.file_url = null
    }
  }
}
</script>

<style>
</style>
