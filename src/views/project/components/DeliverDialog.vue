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
import { deliverProjectById } from '@/api/project'
export default {
  props: {
    projectId: {
      type: Number | String,
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
  methods: {
    show () {
      this.visible = true
    },
    onCancel () {
      this.$refs.upload.cancel()
      this.visible = false
    },
    onConfirm () {
      if (this.uploading) {
        this.$message.warning(this.$t('正在上传附件，请稍后'))
        return false
      }

      if (!this.form.file_url) {
        return this.$message.warning(this.$t('请上传交付的设计文件'))
      }

      this.submitting = true
      deliverProjectById(this.projectId, this.form).then(({ data }) => {
        this.submitting = false
        this.visible = false
        this.$message.success(this.$t('提交成功'))
        this.$emit('delivered', data)
      }).catch(() => {
        this.submitting = false
      })
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
