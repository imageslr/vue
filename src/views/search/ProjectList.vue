<i18n>
{
  "zh": {
    "status": {
      "1000": "报名中",
      "1100": "工作中",
      "1200": "已完成"
    }
  },
  "en": {
    "输入关键字进行搜索": "Enter keyword to search",
    "搜索": "Search",
    "项目状态": "Project status",
    "查看详情": "View detail",
    "发布于": "Published at",
    "重新加载": "Reload",
    "设计费": "Design fees",
    "人收藏": "favoritors",
    "项目类型": "Project type",
    "项目功能": "Project feature",
    "希望用多长时间找设计师": "How long to find a designer",
    "status": {
      "1000": "Applying",
      "1100": "Working",
      "1200": "Completed"
    }
  }
}
</i18n>

<template>
  <div class="container">
    <el-form
      size="small"
      inline>
      <el-form-item>
        <el-input
          v-model="keyword"
          :placeholder="$t('输入关键字进行搜索')"
          @keyup.native.enter="onSearch"/>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="status"
          :placeholder="$t('项目状态')"
          multiple>
          <el-option
            v-for="item in statusOptions"
            :key="item"
            :label="$t(`status.${item}`)"
            :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSearch">{{ $t('搜索') }}</el-button>
      </el-form-item>
    </el-form>
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
          v-for="project in projects"
          :key="project.id"
          class="project-list-item">
          <router-link
            :to="`/project/${project.id}`"
            class="project-list-item__title"
            v-text="project.title" />
          <span
            class="black-65 bold"
            v-text="$t('设计费') + '：' + project.payment"/>
          <div class="project-list-item__content">
            <p>{{ $t('项目类型') }}：{{ project.types.join('/') }}</p>
            <p>{{ $t('项目功能') }}：{{ project.features.join('/') }}</p>
            <p>{{ $t('希望用多长时间找设计师') }}：{{ project.find_time }}</p>
          </div>
          <div class="project-list-item__publisher">
            <my-avatar :avatar-url="project.user.avatar_url"/>
            <router-link
              :to="'/profile?uid='+project.user.id"
              class="f-14">{{ project.user.name }}</router-link>
            <span class="f-14 black-45">{{ $t('发布于') }} {{ project.created_at }}</span>
            <span class="f-14 black-45">{{ project.favorite_count + ' ' + $t('人收藏') }}</span>
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
</template>

<script>
import { searchProjects } from '@/api/project'
export default {
  data () {
    return {
      statusOptions: ['1000', '1100', '1200'],
      projects: [],
      status: [],
      keyword: '',
      pageCount: 1,
      currentPage: 1,
      loading: false,
      error: false
    }
  },
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    if (this.$route.query.status) {
      if (Array.isArray(this.$route.query.status)) this.status = this.$route.query.status
      else this.status = [this.$route.query.status]
    }
    if (this.$route.query.keyword) this.keyword = this.$route.query.keyword
    this.getProjects()
  },
  methods: {
    getProjects () {
      this.loading = true
      this.error = false
      const { currentPage, status, keyword } = this
      searchProjects(currentPage, keyword, status)
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
      this.$router.push({
        path: this.$route.path,
        query: {
          type: 'project',
          status: this.status,
          keyword: this.keyword
        }
      })
    },
    onChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: 'project',
          status: this.$route.query.status,
          keyword: this.$route.query.keyword,
          p: page
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
  .project-list-item {
    padding: 16px 24px;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.15);
    &__title {
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
    &__content {
      margin: 8px 0;
      font-size: 14px;
      color: rgba($color: #000000, $alpha: 0.65);
      p {
        margin: 0;
        line-height: 1.7em;
      }
    }
    &__publisher {
      .avatar {
        width: 20px;
        height: 20px;
        vertical-align: bottom;
      }
    }
  }
}
</style>
