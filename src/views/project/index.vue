<i18n>
{
  "en": {
    "该项目已被甲方取消": "The project has been canceled",
    "收藏": "Favorite",
    "取消收藏": "Unfavorite",
    "我要报名": "Apply",
    "报名项目": "Apply the project",
    "报名成功": "Successfully apply",
    "取消报名": "Cancel apply",
    "此操作将取消报名该项目，是否确认？": "This operation will cancel the application for the project. Is it confirmed?",
    "补充项目": "Supplement the project",
    "取消发布": "Cancel publish",
    "此操作将取消发布该项目并不可恢复，是否确认？": "This operation will unpublish the project and is not recoverable. Is it confirmed?",
    "取消成功": "Successfully canceled",
    "甲方": "Party",
    "发布于": "Published at",
    "设计师报名中": "Designers applying",
    "设计师工作中": "Designers working",
    "项目已完成": "Project is complete",
    "项目的类型是？": "Project type",
    "项目的功能是？": "Project feature",
    "项目的面积有多大？": "Project area",
    "项目的其他描述和需求": "Project description",
    "项目的交付时间": "Delivery time",
    "希望用多长时间找设计师？": "How long do you want to find a designer?",
    "希望付给设计师的费用是多少？": "How much would you want to pay for the designer?",
    "项目补充": "Project supplement",
    "补充于": "Supplement at",
    "补充成功": "Successful operation",
    "请输入项目的补充内容，比如如项目面积、项目风格、希望设计师做到哪种程度等等": "Please enter the supplement description",
    "补充内容不能为空":"Supplement description cannot be empty",
    "下载附件": "Download file",
    "上传附件": "Upload file",
    "只能上传一个文件，最大不得超过10M": "Allow upload only one file of which size is less than 10MB",
    "只能上传一个文件": "Allow upload only one file",
    "上传文件大小不能超过10MB！": "File max size is 10MB",
    "正在上传附件，请稍后": "File uploading, please wait",
    "简单说点什么，让业主更快了解你（200字以内）": "Say something so that the party can know you quickly (200 characters at most)"
  }
}
</i18n>

<template>
  <div>
    <div class="project-header card">
      <my-alert
        v-if="isCanceled"
        :title="$t('该项目已被甲方取消')"
        type="warning"
        class="mb2"/>
      <div class="project-header__title-area">
        <h1 class="project-header__title">{{ project.title }}</h1>
        <template v-if="$isDesigner()">
          <el-button
            v-if="project.favoriting"
            icon="el-icon-star-off"
            size="mini"
            @click="onUnfavorite"
          >{{ $t('取消收藏') }} ({{ project.favorite_count }})</el-button>
          <el-button
            v-else
            icon="el-icon-star-off"
            size="mini"
            @click="onFavorite"
          >{{ $t('收藏') }} ({{ project.favorite_count }})</el-button>
          <el-button
            v-if="canCancelApply"
            size="mini"
            @click="onCancelApply"
          >{{ $t('取消报名') }}</el-button>
          <el-button
            v-if="canApply"
            type="primary"
            size="mini"
            @click="dialogVisible = true"
          >{{ $t('我要报名') }}</el-button>
        </template>
        <template v-if="$isParty()">
          <el-button
            v-if="supplementable"
            size="mini"
            @click="dialogVisible = true"
          >{{ $t('补充项目') }}</el-button>
          <el-button
            v-if="cancelable"
            size="mini"
            @click="onCancelPublish"
          >{{ $t('取消发布') }}</el-button>
        </template>
      </div>
      <div class="project-header__info">
        <div class="project-header__info-item">
          <span class="black-85">{{ $t('甲方') }}: </span>
          <my-avatar :avatar-url="project.user.avatar_url"/>
          <router-link :to="'/profile?uid='+project.user.id">{{ project.user.name }}</router-link>
        </div>
        <div class="project-header__info-item">
          <span class="black-85">{{ $t('发布于') }}: </span>
          {{ project.created_at }}
        </div>
      </div>
      <el-steps
        :active="stepIndex"
        process-status="process"
        finish-status="success"
        class="mt3">
        <el-step :title="$t('设计师报名中')" />
        <el-step :title="$t('设计师工作中')" />
        <el-step :title="$t('项目已完成')" />
      </el-steps>
    </div>
    <div
      v-loading="loading"
      class="main-container card">
      <h3 v-t="'项目的类型是？'" />
      <p>{{ project.types.join('/') }}</p>
      <h3 v-t="'项目的功能是？'" />
      <p>{{ project.features.join('/') }}</p>
      <h3 v-t="'项目的面积有多大？'" />
      <p v-text="project.area" />
      <h3 v-t="'项目的其他描述和需求'" />
      <p
        class="pre-wrap"
        v-text="project.description" />
      <my-alert
        v-if="project.project_file_url"
        class="mt-12"><a :href="project.project_file_url">{{ $t('下载附件') }}</a></my-alert>
      <h3 v-t="'项目的交付时间'" />
      <p v-text="project.delivery_time" />
      <h3 v-t="'希望用多长时间找设计师？'" />
      <p v-text="project.find_time" />
      <h3 v-t="'希望付给设计师的费用是多少？'" />
      <p v-text="project.payment" />
      <template
        v-if="project.supplement_at">
        <h3 v-t="'项目补充'" />
        <p v-text="project.textarea" />
        <my-alert
          v-if="project.supplement_file_url"
          class="mt-12"><a :href="project.supplement_file_url">{{ $t('下载附件') }}</a></my-alert>
        <p class="m0 mt1 f-12 black-65">{{ $t('补充于') }}：{{ project.supplement_at }}</p>
      </template>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogText.title">
      <el-input
        v-model="dialogForm.textarea"
        :rows="5"
        :placeholder="dialogText.placeholder"
        type="textarea"/>
      <my-upload
        ref="upload"
        :type="uploadFileType"
        @start="onUploadStart"
        @success="onUploadSuccess"
        @error="onUploadError"
        @remove="onUploadRemove"/>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="onDialogCancel">{{ $t('g.cancelBtn') }}</el-button>
        <el-button
          :loading="dialogButtonLoading"
          type="primary"
          @click="onDialogConfirm">{{ $t('g.confirmBtn') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint eqeqeq: "off" */
import { Project } from '@/services/constants'
import {
  getProjectById,
  cancelProjectById,
  supplementProjectById,
  favoriteProjectById,
  unfavoriteProjectById,
  applyProjectById,
  cancelApplyProjectById } from '@/api/project'
export default {
  data () {
    return {
      loading: false,
      project: {
        id: null,
        title: '加载中',
        types: [],
        features: [],
        favorite_count: 0,
        user: {}
      },
      dialogVisible: false,
      dialogUploading: false, // 是否正在上传文件
      dialogButtonLoading: false, // 是否正在上传表单数据
      dialogForm: {
        textarea: '',
        file_id: null
      }
    }
  },
  computed: {
    // 项目id
    id () {
      return this.$route.params.id
    },
    // 项目进度下标
    stepIndex () {
      switch (this.project.status) {
        case Project.STATUS_TENDERING:
          return 0
        case Project.STATUS_WORKING:
          return 1
        case Project.STATUS_COMPLETED:
          return 2
      }
    },
    // 项目是否取消
    isCanceled () {
      return this.project.status == Project.STATUS_CANCELED
    },
    // 甲方：能否补充项目
    supplementable () {
      const { project } = this
      const { user } = this.project
      return user.id == this.$uid() && // 是项目的发布者
        project.status == Project.STATUS_TENDERING && // 招标状态
        !project.supplement_at // 未补充
    },
    // 甲方：能否取消发布项目
    cancelable () {
      const { project } = this
      const { user } = this.project
      return user.id == this.$uid() && // 是项目的发布者
        project.status == Project.STATUS_TENDERING // 招标状态
    },
    // 设计师：能否报名
    canApply () {
      const { project } = this
      return project.status == Project.STATUS_TENDERING && !project.applying
    },
    // 设计师：能否取消报名
    canCancelApply () {
      const { project } = this
      return project.status == Project.STATUS_TENDERING && project.applying
    },
    // Dialog的文字内容，不同身份的用户看到的文字与可选的操作是不一样的
    dialogText () {
      return {
        title: this.$isParty() ? this.$t('补充项目') : this.$t('报名项目'),
        placeholder: this.$isParty()
          ? this.$t('请输入项目的补充内容，比如如项目面积、项目风格、希望设计师做到哪种程度等等')
          : this.$t('简单说点什么，让业主更快了解你（200字以内）')
      }
    },
    // 上传的文件类别
    uploadFileType () {
      return this.$isParty() ? 'project_file' : 'application_file'
    }
  },
  created () {
    this.getProject()
  },
  methods: {
    getProject () {
      this.loading = true
      getProjectById(this.id).then(({ data }) => {
        this.loading = false
        this.project = data
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 设计师相关操作：报名、取消报名、收藏、取消收藏
     */
    onCancelApply () {
      this.$confirm(this.$t('此操作将取消报名该项目，是否确认？'), this.$t('g.notice'), {
        confirmButtonText: this.$t('g.confirmBtn'),
        cancelButtonText: this.$t('g.cancelBtn'),
        type: 'warning'
      }).then(() => {
        cancelApplyProjectById(this.project.id).then(() => {
          this.project.applying = false
          this.$message({
            type: 'success',
            message: this.$t('取消成功')
          })
        })
      }).catch(() => {})
    },
    onFavorite () {
      favoriteProjectById(this.project.id).then(() => {
        this.project.favoriting = true
        this.project.favorite_count++
      })
    },
    onUnfavorite () {
      unfavoriteProjectById(this.project.id).then(() => {
        this.project.favoriting = false
        this.project.favorite_count--
      })
    },
    /**
     * 甲方相关操作：取消发布、补充项目
     */
    onCancelPublish () {
      this.$confirm(this.$t('此操作将取消发布该项目并不可恢复，是否确认？'), this.$t('g.notice'), {
        confirmButtonText: this.$t('g.confirmBtn'),
        cancelButtonText: this.$t('g.cancelBtn'),
        type: 'warning'
      }).then(() => {
        cancelProjectById(this.project.id).then(() => {
          this.project.status = Project.STATUS_CANCELED
          this.project.canceled_at = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
          this.$message({
            type: 'success',
            message: this.$t('取消成功')
          })
        })
      }).catch(() => {})
    },
    /**
     * Dialog操作：设计师报名项目、甲方补充项目
     */
    onDialogCancel () {
      this.$refs.upload.cancel()
      this.dialogVisible = false
    },
    onDialogConfirm () {
      // 设计师报名的时候可以什么都不填，甲方必须填写补充内容
      if (this.$isParty() && !this.dialogForm.textarea.length) {
        this.$message.error(this.$t('补充内容不能为空'))
        return false
      }
      if (this.dialogUploading) {
        this.$message.warning(this.$t('正在上传附件，请稍后'))
        return false
      }

      this.dialogButtonLoading = true
      const handler = this.$isParty() ? supplementProjectById : applyProjectById
      const { textarea, file_id } = this.dialogForm
      let form
      if (this.$isParty()) {
        form = {
          supplement_description: textarea,
          supplement_file_id: file_id
        }
      } else {
        form = {
          remark: textarea,
          application_file_id: file_id
        }
      }
      handler(this.project.id, form).then(({ data }) => {
        this.dialogButtonLoading = false
        this.dialogVisible = false
        if (this.$isParty()) {
          this.$message.success(this.$t('补充成功'))
          this.project = data
        } else {
          this.$message.success(this.$t('报名成功'))
          this.project.applying = true
        }
      }).catch(() => {
        this.dialogButtonLoading = false
      })
    },
    onUploadStart () {
      this.dialogUploading = true
    },
    onUploadSuccess (data) {
      this.dialogUploading = false
      this.dialogForm.file_id = data.id
    },
    onUploadError () {
      this.dialogUploading = false
    },
    onUploadRemove () {
      this.dialogForm.file_id = null
    }
  }
}
</script>

<style lang="scss" scoped>
.project-header {
  width: 100%;
  padding: 24px calc((100% - 1000px) / 2);
  &__title-area {
    display: flex;
    align-items: flex-start;
    margin: 0 0 16px;
    vertical-align: middle;
  }
  &__title {
    flex: 1;
    margin: 0;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
  }
  &__info {
    width: 600px;
    &-item {
      display: inline-block;
      width: 290px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      .avatar {
        width: 20px;
        height: 20px;
        vertical-align: bottom;
      }
    }
  }
}
.main-container {
  margin-top: 24px;
  padding: 24px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  h3 {
    margin-top: 32px;
    &:first-child {
      margin-top: 0;
    }
  }
  p {
    margin: 8px 0;
    line-height: 1.81em;
  }
}
.alert {
  font-size: 14px;
}
</style>
