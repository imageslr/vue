<i18n>
{
  "zh": {
    "status": {
      "500": "已取消",
      "600": "审核未通过",
      "900": "审核中",
      "1000": "报名中",
      "1100": "工作中",
      "1200": "已完成"
    },
    "modes": {
      "free": "自由式",
      "invite": "邀请式",
      "specify": "指定式"
    }
  },
  "en": {
    "输入项目标题进行搜索": "Enter project title to search",
    "搜索项目": "Search projects",
    "所有项目": "All",
    "审核中": "Reviewing",
    "报名中": "Applying",
    "工作中": "Working",
    "已完成": "Completed",
    "已取消": "Canceled",
    "审核未通过": "Review Failed",
    "发布于": "Published at",
    "查看详情": "View detail",
    "重新加载": "Reload",

    "汇款信息": "Remittance info",
    "设计费汇款详情": "Design fee remittance detail",
    "暂未发放设计费": "Not pay design fee yet",

    "status": {
      "500": "Canceled",
      "600": "Review Failed",
      "900": "Reviewing",
      "1000": "Applying",
      "1100": "Working",
      "1200": "Completed"
    },
    "modes": {
      "free": "Free mode",
      "invite": "Invite mode",
      "specify": "Specify mode"
    }
  }
}
</i18n>

<template>
  <div>
    <el-menu
      :default-active="$route.query.status || 'all'"
      mode="horizontal"
      @select="onNavigate">
      <el-menu-item index="all">{{ $t('所有项目') }}</el-menu-item>
      <template v-if="$isParty()">
        <el-menu-item index="900">{{ $t('审核中') }}</el-menu-item>
        <el-menu-item index="600">{{ $t('审核未通过') }}</el-menu-item>
      </template>
      <el-menu-item index="1000">{{ $t('报名中') }}</el-menu-item>
      <el-menu-item index="1100">{{ $t('工作中') }}</el-menu-item>
      <el-menu-item index="1200">{{ $t('已完成') }}</el-menu-item>
      <el-menu-item index="500">{{ $t('已取消') }}</el-menu-item>
    </el-menu>
    <div class="container">
      <el-input
        v-model="keywordInput"
        :placeholder="$t('输入项目标题进行搜索')"
        size="small"
        @keyup.native.enter="onSearch">
        <el-button
          slot="append"
          type="primary"
          @click="onSearch">{{ $t('搜索项目') }}</el-button>
      </el-input>
      <my-loader
        v-if="loading || error"
        :loading="loading"
        :error="error"
        :btn-text="$t('重新加载')"
        :on-reload="getProjects" />
      <my-empty v-else-if="!projects.length" />
      <template v-else>
        <div class="project-list">
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            class="project-list-item">
            <div class="flex-auto">
              <el-tag :type="project.status | statusToType">{{ $t(`status.${project.status}`) }}</el-tag>
              <el-tag type="info">{{ $t(`modes.${project.mode}`) }}</el-tag>
              <router-link
                :to="`/project/${project.id}`"
                tag="p"
                class="project-list-item__title"
                v-text="project.title" />
              <p class="m0 f-14 black-45">{{ $t('发布于') }}：{{ project.created_at }}</p>
            </div>
            <div>
              <router-link :to="'/project/'+project.id">
                <el-button
                  type="primary"
                  size="small">
                  {{ $t('查看详情') }}
                </el-button>
              </router-link>
              <el-button
                v-if="$isParty()"
                size="small"
                style="margin-left: 8px"
                @click="onShowRemittanceDialog(index)">
                {{ $t('汇款信息') }}
              </el-button>
              <template v-if="$isDesigner()">
                <el-button
                  v-if="project.designer_payment"
                  size="small"
                  style="margin-left: 8px"
                  @click="$router.push(`/payment/${project.designer_payment.id}`)">
                  {{ $t('设计费汇款详情') }}
                </el-button>
                <el-button
                  v-else-if="isCompleted(project)"
                  size="small"
                  style="margin-left: 8px"
                  disabled>
                  {{ $t('暂未发放设计费') }}
                </el-button>
                <el-button
                  v-if="isFavorite"
                  :loading="favoriteLoadings[index]"
                  size="small"
                  style="margin-left: 8px"
                  @click="onToggleFavorite(index)">
                  {{ project.favoriting ? $t('取消收藏') : $t('收藏') }}
                </el-button>
              </template>
            </div>
          </div>
        </div>
        <el-pagination
          :current-page.sync="currentPage"
          :page-count="pageCount"
          background
          layout="prev, pager, next"
          class="mt2 center"
          @current-change="onChangePage"/>
      </template>
    </div>
    <remittance-dialog ref="remittanceDialog" />
  </div>
</template>

<script>
import {
  getProjectsOfCurrentUser,
  getFavoriteProjectsOfCurrentUser,
  favoriteProjectById,
  unfavoriteProjectById } from '@/api/project'
import { Project } from '@/services/constants'
import RemittanceDialog from './components/RemittanceDialog'
export default {
  components: { RemittanceDialog },
  filters: {
    statusToType (status) {
      const t = {
        500: 'info',
        600: 'danger',
        900: 'warning',
        1000: null,
        1100: null,
        1200: 'info'
      }
      return t[status]
    }
  },
  data () {
    return {
      projects: [],
      status: null, // 页面状态
      keyword: '', // query中的关键字
      keywordInput: '', // 搜索输入框的内容
      pageCount: 1,
      currentPage: 1,
      loading: false,
      error: false,

      // favorite loadings
      favoriteLoadings: {}
    }
  },
  computed: {
    // 是否是“我收藏的项目”
    isFavorite () {
      return this.$route.path === '/order/favorite'
    }
  },
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    if (this.$route.query.status) this.status = this.$route.query.status
    if (this.$route.query.keyword) this.keywordInput = this.keyword = this.$route.query.keyword
    this.getProjects()
  },
  methods: {
    getProjects () {
      this.loading = true
      this.error = false
      const { currentPage, status, keyword } = this
      const fetch = this.isFavorite ? getFavoriteProjectsOfCurrentUser : getProjectsOfCurrentUser
      fetch(currentPage, { status, keyword })
        .then(({ data: { data: projects, meta: { pagination } } }) => {
          this.loading = false
          this.projects = projects
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
          this.error = true
        })
    },
    onSearch () {
      if (!this.keywordInput) return
      this.$router.push({
        path: this.$route.path,
        query: {
          status: this.status,
          keyword: this.keywordInput
        }
      })
    },
    onToggleFavorite (index) {
      if (this.favoriteLoadings[index]) return
      this.$set(this.favoriteLoadings, index, true)
      const project = this.projects[index]
      const fetch = project.favoriting ? unfavoriteProjectById : favoriteProjectById
      fetch(project.id).then(() => {
        project.favoriting = !project.favoriting
        this.favoriteLoadings[index] = false
      }).catch(() => {
        this.favoriteLoadings[index] = false
      })
    },
    onChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          status: this.status,
          keyword: this.keywordInput,
          p: page
        }
      })
    },
    onNavigate (index) {
      this.$router.push({
        path: this.$route.path,
        query: {
          status: index === 'all' ? null : index,
          p: 1
        }
      })
    },
    onShowRemittanceDialog (index) {
      const project = this.projects[index]
      this.$refs.remittanceDialog.show(project)
    },
    isTendering (project) {
      return project.status == Project.STATUS_TENDERING // eslint-disable-line eqeqeq
    },
    isCompleted (project) {
      return project.status == Project.STATUS_COMPLETED // eslint-disable-line eqeqeq
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 24px 32px;
  background-color: #fff;
  .el-input {
    width: 350px;
  }
  .project-list {
    &-item {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.15);
      &__title {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}
</style>
