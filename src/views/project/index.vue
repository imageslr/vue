<i18n>
{
  "en": {
    "该项目已被甲方取消": "The project has been canceled",
    "该项目正在审核中": "The project is reviewing",
    "该项目未通过审核": "The project has not passed review",
    "收藏": "Favorite",
    "取消收藏": "Unfavorite",
    "我要报名": "Apply",
    "报名项目": "Apply the project",
    "报名成功": "Successfully apply",
    "取消报名": "Cancel apply",
    "此操作将取消报名该项目，是否确认？": "This operation will cancel the application for the project. Is it confirmed?",
    "编辑项目": "Edit the project",
    "取消发布": "Cancel publish",
    "此操作将取消发布该项目并不可恢复，是否确认？": "This operation will unpublish the project and is not recoverable. Is it confirmed?",
    "取消成功": "Successfully canceled",
    "甲方": "Party",
    "发布于": "Published at",
    "设计师报名中": "Designers applying",
    "设计师工作中": "Designers working",
    "项目已完成": "Project is complete",
    "项目的类型是？": "Project types",
    "项目的功能是？": "Project features",
    "项目描述": "Project description",
    "项目关键字": "Project keywords",
    "项目设计深度要求": "Design depth",
    "项目的交付时间": "Delivery time",
    "希望用多长时间找设计师？": "How long do you want to find a designer?",
    "希望付给设计师的费用是多少？": "How much would you want to pay for the designer?",
    "下载附件": "Download file",
    "上传附件": "Upload file",
    "只能上传一个文件": "Allow upload only one file",
    "正在上传附件，请稍后": "File uploading, please wait",
    "简单说点什么，让业主更快了解你（200字以内）": "Say something so that the party can know you quickly (200 characters at most)",
    "我的报名信息": "My application",
    "点击查看项目信息": "View project info",
    "收起": "Collapse"
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
      <my-alert
        v-if="isReviewing"
        :title="$t('该项目正在审核中')"
        type="warning"
        class="mb2"/>
      <my-alert
        v-if="isReviewFailed"
        :title="$t('该项目未通过审核') + (project.review_message ? '：' + project.review_message : '')"
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
            v-if="editable"
            size="mini"
            @click="onEdit"
          >{{ $t('编辑项目') }}</el-button>
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
    <div class="main-container">
      <div
        v-if="project.applying"
        class="card my-applicaion">
        <h3 v-t="'我的报名信息'" />
        <p v-text="project.application.remark" />
        <my-alert
          v-if="project.application.application_file_url"
          class="mt-12">
          <a
            :href="project.application.application_file_url"
            target="_blank">{{ $t('下载附件') }}</a>
        </my-alert>
        <p class="m0 mt1 f-12 black-65">{{ $t('报名于') }}：{{ project.application.created_at }}</p>
      </div>
      <div
        v-loading="loading"
        class="card">
        <template v-if="showInfo">
          <el-button
            type="text"
            style="position:absolute;right:24px;top:16px;"
            @click="showInfo = false">{{ $t('收起') }}</el-button>
          <div class="project-info">
            <h3 v-t="'项目的类型是？'" />
            <p>{{ project.types.join('/') }}</p>
            <h3 v-t="'项目的功能是？'" />
            <p>{{ project.features.join('/') }}</p>
            <h3 v-t="'项目关键字'" />
            <el-tag
              v-for="keyword in project.keywords"
              :key="keyword"
              type="info"
              class="mr1">{{ keyword }}</el-tag>
            <h3 v-t="'项目描述'" />
            <p
              class="pre-wrap"
              v-text="project.description" />
            <my-alert
              v-if="project.project_file_url"
              class="mt-12">
              <a
                :href="project.project_file_url"
                target="_blank">{{ $t('下载附件') }}</a>
            </my-alert>
            <h3 v-t="'项目设计深度要求'" />
            <p v-text="project.depth" />
            <h3 v-t="'项目的交付时间'" />
            <p v-text="project.delivery_time" />
            <h3 v-t="'希望用多长时间找设计师？'" />
            <p v-text="project.find_time" />
            <h3 v-t="'希望付给设计师的费用是多少？'" />
            <p v-text="project.payment" />
          </div>
        </template>
        <el-button
          v-else
          type="text"
          @click="showInfo = true">{{ $t('点击查看项目信息') }}</el-button>
      </div>
      <application-list
        v-if="isPublisher && project.mode === 'free'"
        :project="project" />
      <invitation-list
        v-if="isPublisher && project.mode !== 'free'"
        :project="project" />
      <el-dialog
        :visible.sync="dialogVisible"
        :title="$t('报名项目')">
        <el-input
          v-model="applicationForm.remark"
          :rows="5"
          :placeholder="$t('简单说点什么，让业主更快了解你（200字以内）')"
          type="textarea"/>
        <my-upload
          ref="upload"
          :max-size="50"
          type="application_file"
          class="mt-12"
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
  </div>
</template>

<script>
/* eslint eqeqeq: "off" */
import { Project } from '@/services/constants'
import {
  getProjectById,
  cancelProjectById,
  favoriteProjectById,
  unfavoriteProjectById,
  applyProjectById,
  cancelApplyProjectById } from '@/api/project'
import ApplicationList from './components/ApplicationList'
import InvitationList from './components/InvitationList'
export default {
  components: { ApplicationList, InvitationList },
  data () {
    return {
      project: {
        id: null,
        title: '加载中',
        types: [],
        features: [],
        favorite_count: 0,
        user: {},
        application: {},
        applications: [],
        invitations: []
      },
      loading: false, // 是否正在获取项目详情

      /**
       * 报名表单 Dialog
       */
      dialogVisible: false,
      dialogUploading: false, // 是否正在上传文件
      dialogButtonLoading: false, // 是否正在上传表单数据
      applicationForm: { // 报名表单
        remark: '',
        application_file_id: null
      },

      showInfo: this.$isDesigner() // 是否显示项目信息
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
    // 项目是否正在审核中
    isReviewing () {
      return this.project.status == Project.STATUS_REVIEWING
    },
    // 项目是否未通过审核
    isReviewFailed () {
      return this.project.status == Project.STATUS_REVIEW_FAILED
    },
    // 甲方：是否是项目的发布者
    isPublisher () {
      return this.project.user.id == this.$uid()
    },
    // 甲方：能否编辑项目
    editable () {
      const { project } = this
      const { user } = this.project
      return user.id == this.$uid() && // 是项目的发布者
        (project.status == Project.STATUS_TENDERING || // 招标状态
         project.status == Project.STATUS_REVIEW_FAILED || // 审核未通过
         project.status == Project.STATUS_REVIEWING) // 审核中
    },
    // 甲方：能否取消发布项目
    cancelable () {
      const { project } = this
      const { user } = this.project
      return user.id == this.$uid() && // 是项目的发布者
        (project.status == Project.STATUS_TENDERING || // 招标状态
         project.status == Project.STATUS_REVIEW_FAILED || // 审核未通过
         project.status == Project.STATUS_REVIEWING) // 审核中
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
     * 甲方相关操作：取消发布、编辑项目、申请重新审核
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
    onEdit () {
      this.$router.push(`/project/${this.id}/edit`)
    },
    /**
     * Dialog操作：设计师报名项目
     */
    onDialogCancel () {
      this.$refs.upload.cancel()
      this.dialogVisible = false
    },
    onDialogConfirm () {
      if (this.dialogUploading) {
        this.$message.warning(this.$t('正在上传附件，请稍后'))
        return false
      }

      this.dialogButtonLoading = true
      applyProjectById(this.project.id, this.applicationForm).then(({ data }) => {
        this.dialogButtonLoading = false
        this.dialogVisible = false
        this.$message.success(this.$t('报名成功'))
        this.project.applying = true
        this.project.application = data
      }).catch(() => {
        this.dialogButtonLoading = false
      })
    },
    onUploadStart () {
      this.dialogUploading = true
    },
    onUploadSuccess (data) {
      this.dialogUploading = false
      this.applicationForm.application_file_id = data.id
    },
    onUploadError () {
      this.dialogUploading = false
    },
    onUploadRemove () {
      this.applicationForm.application_file_id = null
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
  .card {
    margin-bottom: 24px;
    padding: 24px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    &:last-child {
      margin-bottom: 0;
    }
  }
  .project-info {
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
}
.alert {
  font-size: 14px;
}
</style>
