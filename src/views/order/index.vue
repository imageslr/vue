<i18n>
{
  "en": {
    "输入项目标题或订单编号进行搜索": "Enter title or number of project to search",
    "搜索订单": "Search projects",
    "所有订单": "All",
    "报名中": "Applying",
    "工作中": "Working",
    "已完成": "Completed",
    "已取消": "Canceled",
    "发布于": "Published at",
    "查看详情": "View detail",
    "重新加载": "Reload"
  }
}
</i18n>

<template>
  <div>
    <el-menu
      :default-active="$route.query.status || 'all'"
      mode="horizontal"
      @select="onNavigate">
      <el-menu-item index="all">{{ $t('所有订单') }}</el-menu-item>
      <el-menu-item index="1000">{{ $t('报名中') }}</el-menu-item>
      <el-menu-item index="1100">{{ $t('工作中') }}</el-menu-item>
      <el-menu-item index="1200">{{ $t('已完成') }}</el-menu-item>
      <el-menu-item index="500">{{ $t('已取消') }}</el-menu-item>
    </el-menu>
    <div class="container">
      <el-input
        v-model="keywordInput"
        :placeholder="$t('输入项目标题或订单编号进行搜索')"
        size="small"
        @keyup.native.enter="onSearch">
        <el-button
          slot="append"
          type="primary"
          @click="onSearch">{{ $t('搜索订单') }}</el-button>
      </el-input>
      <my-loader
        :loading="loading"
        :error="error"
        :btn-text="$t('重新加载')"
        :on-reload="getProjects" />
      <my-empty v-if="!loading && !projects.length" />
      <template v-if="!loading && !error">
        <div class="project-list">
          <div
            v-for="project in projects"
            :key="project.id"
            class="project-list-item">
            <div class="flex-auto">
              <router-link
                :to="`/project/${project.id}`"
                tag="p"
                class="project-list-item__title"
                v-text="project.title" />
              <p class="m0 f-14 black-45">{{ $t('发布于') }}：{{ project.created_at }}</p>
            </div>
            <router-link :to="'/project/'+project.id">
              <el-button
                type="primary"
                size="small">
                {{ $t('查看详情') }}
              </el-button>
            </router-link>
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
  </div>
</template>

<script>
import { getProjectsOfCurrentUser } from '@/api/project'
export default {
  data () {
    return {
      projects: [],
      status: null, // 页面状态
      keyword: '', // query中的关键字
      keywordInput: '', // 搜索输入框的内容
      pageCount: 1,
      currentPage: 1,
      loading: false,
      error: false
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
      getProjectsOfCurrentUser(currentPage, { status, keyword })
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
