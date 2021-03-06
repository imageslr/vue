<i18n>
{
  "en": {
    "报名列表": "Application list",
    "下载附件": "Download file",
    "报名于": "Applied at",
    "查看备注": "View remark",
    "备注": "Remark"
  }
}
</i18n>

<template>
  <div
    v-loading="loading"
    class="card">
    <h3
      v-t="'报名列表'"
      class="mt0 mb2" />
    <my-empty v-if="!applications.length" />
    <div
      v-else
      class="list">
      <div
        v-for="application in applications"
        :key="application.id"
        class="list-item">
        <router-link :to="'/profile?uid=' + application.user.id">
          <my-avatar
            :avatar-url="application.user.avatar_url"
            class="list-item__avatar"/>
        </router-link>
        <div class="list-item__info">
          <router-link
            :to="'/profile?uid=' + application.user.id"
            class="bold black-85">{{ application.user.name }}</router-link>
          <p>
            <span class="color-primary">{{ $t('g.following') }}</span>
            <span v-text="application.user.following_count" />
            <span class="color-primary">{{ $t('g.fans') }}</span>
            <span v-text="application.user.follower_count" />
          </p>
          <p v-text="application.user.title" />
          <p v-text="application.user.introduction" />
        </div>
        <div class="black-45 f-14">
          <div
            v-t="'报名于'"
            class="m0 mb-4" />
          <div
            class="m0"
            v-text="application.created_at" />
        </div>
        <div class="list-item__action">
          <el-button
            :disabled="!application.remark"
            type="text"
            @click="onViewDetail(application)">
            {{ $t('查看备注') }}
          </el-button>
          <el-button
            :disabled="!application.application_file_url"
            type="text"
            @click="onDownloadApplicationFile(application)" >
            {{ $t('下载附件') }}
          </el-button>
        </div>
      </div>
      <el-pagination
        :current-page.sync="currentPage"
        :page-count="pageCount"
        background
        layout="prev, pager, next"
        class="mt2 center"
        @current-change="getApplications"/>
    </div>
    <el-dialog
      :visible.sync="dialog.visible"
      :title="$t('备注')">
      <p v-text="dialog.remark" />
    </el-dialog>
  </div>
</template>

<script>
/* eslint eqeqeq: "off" */
import { getApplicationsByProjectId } from '@/api/project'
export default {
  props: {
    // 项目详情
    project: {
      type: Object,
      validator (value) {
        return Array.isArray(value.applications)
      },
      required: true
    }
  },
  data () {
    return {
      applications: [], // 报名列表
      currentPage: 1, // 报名列表当前页
      pageCount: 1, // 报名列表总页数
      loading: false, // 是否正在获取报名信息
      dialog: { // 报名详情Dialog
        remark: '', // 备注信息
        visible: false
      }
    }
  },
  created () {
    this.applications = this.project.applications
  },
  methods: {
    getApplications (page = 1) {
      this.loading = true
      getApplicationsByProjectId(this.project.id, page)
        .then(({ data: { data, meta: { pagination } } }) => {
          this.loading = false
          this.applications = data
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
        })
    },
    onViewDetail (application) {
      this.dialog.visible = true
      this.dialog.remark = application.remark
    },
    onDownloadApplicationFile (application) {
      window.open(application.application_file_url)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  &-item {
    display: flex;
    align-items: flex-start;
    padding: 16px;
    font-size: 14px;
    &__avatar {
      width: 48px;
      height: 48px;
      margin-right: 24px;
    }
    &__info {
      flex: 1;
      overflow: hidden;
      margin-right: 24px;
      p {
        margin: 4px 0 0;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
      }
    }
    &__action {
      margin-left: 100px;
      .el-button {
        padding: 0;
      }
    }
  }
}
</style>
