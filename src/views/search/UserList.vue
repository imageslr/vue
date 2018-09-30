<i18n>
{
  "en": {
    "输入设计师姓名进行搜索": "Enter keyword to search",
    "专业领域": "Professional fields",
    "排序方式": "Order by",
    "默认排序": "Default",
    "完成项目数从多到少": "Completed project count desc",

    "搜索": "Search",
    "关注": "Follow",
    "取消关注": "Unfollow",
    "关注": "Following",
    "粉丝": "Follower",
    "重新加载": "Reload"
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
          clearable
          @keyup.native.enter="onSearch"/>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="selectedFields"
          :placeholder="$t('专业领域')"
          multiple>
          <el-option
            v-for="field in fields"
            :key="field"
            :label="field"
            :value="field"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="order"
          :placeholder="$t('排序方式')"
          clearable>
          <el-option
            label="默认排序"
            value="default"/>
          <el-option
            label="完成项目数从多到少"
            value="completed_project_count_desc"/>
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
      :on-reload="getUsers" />
    <my-empty v-else-if="!users.length" />
    <template v-else>
      <div class="user-list">
        <div
          v-for="(user, index) in users"
          :key="user.id"
          class="user-list-item">
          <router-link :to="'/profile?uid=' + user.id">
            <my-avatar
              :avatar-url="user.avatar_url"
              class="user-list-item__avatar"/>
          </router-link>
          <div class="user-list-item__info">
            <router-link
              :to="'/profile?uid=' + user.id"
              class="bold black-85">{{ user.name }}</router-link>
            <p>
              <span class="color-primary">{{ $t('关注') }}</span>
              <span v-text="user.following_count" />
              <span class="color-primary">{{ $t('粉丝') }}</span>
              <span v-text="user.follower_count" />
            </p>
            <p v-text="user.title" />
            <p v-text="user.introduction" />
            <div class="mt1">
              <el-tag
                v-for="field in user.professional_fields"
                :key="field"
                size="mini"
                type="info"
                class="mr1">{{ field }}</el-tag>
            </div>
          </div>
          <template v-if="user.id != $uid()">
            <el-button
              v-if="user.following"
              :loading="followLoadings[index]"
              plain
              size="mini"
              @click="onToggleFollow(index)">{{ $t('取消关注') }}</el-button>
            <el-button
              v-else
              :loading="followLoadings[index]"
              plain
              type="primary"
              size="mini"
              @click="onToggleFollow(index)">{{ $t('关注') }}</el-button>
          </template>
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
    <my-invite-alert
      v-if="!loading && !error && userType === 'designer'"
      class="mt2"/>
  </div>
</template>

<script>
import { searchUsers } from '@/api/user'
export default {
  data () {
    return {
      fields: [
        '建筑设计',
        '室内设计',
        '景观设计',
        '城市设计',
        '城市规划',
        '概念规划',
        'Architectural Design',
        'Interior Design',
        'Landscape Design',
        'Urban Design',
        'Urban Planning',
        'Concept Planning'
      ],
      users: [],
      keyword: '',
      selectedFields: [],
      order: null, // default
      pageCount: 1,
      currentPage: 1,
      loading: false,
      error: false,
      followLoadings: {}
    }
  },
  computed: {
    userType () {
      return this.$route.query.type
    }
  },
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    if (this.$route.query.keyword) this.keyword = this.$route.query.keyword
    if (this.$route.query.order) this.order = this.$route.query.order
    if (this.$route.query.fields) {
      if (Array.isArray(this.$route.query.fields)) this.selectedFields = this.$route.query.fields
      else this.selectedFields = [this.$route.query.fields]
    }
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.loading = true
      this.error = false
      const { currentPage, keyword, userType, selectedFields, order } = this
      searchUsers(currentPage, keyword, userType, {
        professional_fields: selectedFields,
        order
      })
        .then(({ data: { data: users, meta: { pagination } } }) => {
          this.loading = false
          this.users = users
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
          this.error = true
        })
    },
    onToggleFollow (index) {
      if (this.followLoadings[index]) return
      this.$set(this.followLoadings, index, true)
      const user = this.users[index]
      const action = user.following ? 'UNFOLLOW' : 'FOLLOW'
      this.$store.dispatch(action, user.id).then(() => {
        user.following = !user.following
        this.followLoadings[index] = false
      }).catch(() => {
        this.followLoadings[index] = false
      })
    },
    onSearch () {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: this.userType,
          keyword: this.keyword,
          fields: this.selectedFields,
          order: this.order
        }
      })
    },
    onChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: this.userType,
          keyword: this.$route.query.keyword,
          fields: this.selectedFields,
          p: page,
          order: this.order
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
    width: 200px;
  }
  .user-list {
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
    }
  }
}
</style>
