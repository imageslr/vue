<i18n>
{
  "en": {
    "添加作品": "Add your work",
    "编辑作品": "Edit work",
    "分享你的设计心得，展示你的专业能力": "Share your design experience and showcase your professional skills",
    "标题": "Title",
    "最多200字": "200 characters at most",
    "描述": "Description",
    "如项目类型、项目功能、项目面积、完成日期等": "Such as project type, project function, project area, completion date, etc.",
    "相关照片": "Relevant photos",
    "可见范围": "Visible range",
    "公开可见": "Public",
    "私密": "Private",
    "提交": "Submit",
    "请填写此项": "Please enter this field",
    "图片正在上传中，请稍候": "Photo is uploading, please wait"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card form-card">
      <div class="border-bottom center p-24">
        <h1
          v-t="editing ? '编辑作品' : '添加作品'"
          class="m0 color-primary"/>
        <p
          v-t="'分享你的设计心得，展示你的专业能力'"
          class="m0 pt1 black-65 f-13"/>
      </div>
      <el-form
        v-loading="loading"
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        class="form"
        size="small">
        <el-form-item
          :label="$t('标题')"
          prop="title">
          <el-input
            v-model="form.title"
            :placeholder="$t('最多200字')"
            maxlength="200"/>
        </el-form-item>
        <el-form-item
          :label="$t('描述')"
          prop="description">
          <el-input
            v-model="form.description"
            :placeholder="$t('如项目类型、项目功能、项目面积、完成日期等')"
            :rows="7"
            type="textarea"/>
        </el-form-item>
        <el-form-item
          :label="$t('相关照片')"
          prop="photo_urls">
          <my-multi-upload
            ref="upload"
            :limit="20"
            :image-urls="form.photo_urls"
            type="work_photo" />
        </el-form-item>
        <el-form-item
          :label="$t('可见范围')"
          prop="visible_range">
          <el-radio-group v-model="form.visible_range">
            <el-radio label="public">{{ $t(`公开可见`) }}</el-radio>
            <el-radio label="private">{{ $t(`私密`) }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      :loading="submitting"
      class="block w-100 shadow mt-24"
      type="primary"
      @click="onSubmit">{{ $t('提交') }}</el-button>
  </div>
</template>

<script>
import { getWorkById, addWork, updateWorkById } from '@/api/work'
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        photo_urls: [],
        visible_range: 'public'
      },
      rules: {
        title: { required: true, message: this.$t('请填写此项') },
        description: { required: true, message: this.$t('请填写此项'), whitespace: true },
        photo_urls: { type: 'array', required: true, message: this.$t('请填写此项') },
        visible_range: { required: true, mes9sage: this.$t('请填写此项') }
      },
      submitting: false,
      loading: false
    }
  },
  computed: {
    editing () {
      return this.$route.path !== '/work/add'
    },
    id () {
      return this.$route.params.id
    }
  },
  created () {
    if (this.editing) {
      this.loading = true
      getWorkById(this.id).then(({ data }) => {
        this.loading = false
        this.form = {
          title: data.title,
          description: data.description,
          photo_urls: data.photo_urls,
          visible_range: data.visible_range
        }
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeDestroy () {
    this.$refs.upload.clear() // 取消所有上传请求
  },
  methods: {
    onSubmit () {
      let { form } = this
      let photo_urls = this.$refs.upload.getImageUrls()
      if (photo_urls === false) {
        return this.$message.warning(this.$t('图片正在上传中，请稍候'))
      }
      this.form.photo_urls = photo_urls
      this.$refs.form.validate().then(() => {
        this.submitting = true
        if (this.editing) {
          updateWorkById(this.id, this.form).then(() => {
            this.submitting = false
            this.$router.push('/work/result?edit=1')
          }).catch(() => {
            this.submitting = false
          })
        } else {
          addWork(this.form).then(() => {
            this.submitting = false
            this.$router.push('/work/result')
          }).catch(() => {
            this.submitting = false
          })
        }
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.form-card {
  padding: 0 32px 16px;
}
.form {
  width: 800px;
  position: relative;
  left: 50%;
  margin-left: -400px;
  padding-top: 32px;
  /deep/ .el-input__inner,
  /deep/ .el-textarea__inner {
    border-color: rgb(220, 223, 230);
    &:focus {
      border-color: #0077b5;
    }
  }
}
</style>
