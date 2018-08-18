<i18n>
{
  "en": {
    "邀请用户评价": "Invite User to Review",
    "输入设计师姓名进行搜索": "Enter keyword to search",
    "搜索": "Search",
    "邀请": "Invite",
    "已邀请": "Invited",
    "已评价": "Reviewed",
    "重新加载": "Reload"
  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="'邀请用户评价'"
      class="mt0" />
    <el-input
      v-model="keyword"
      :placeholder="$t('输入关键字进行搜索')"
      size="small"
      @keyup.native.enter="onSearch">
      <el-button
        slot="append"
        type="primary"
        @click="onSearch">{{ $t('搜索') }}</el-button>
    </el-input>
    <my-loader
      v-if="loading || error"
      :loading="loading"
      :error="error"
      :btn-text="$t('重新加载')"
      :on-reload="getUsers" />
    <my-empty v-else-if="!users.length" />
    <template v-else>
      <div class="user-list">
        <user-list-item
          v-for="(user, index) in users"
          :user="user"
          :key="user.id">
          <template slot="action">
            <el-button
              v-if="user.invitation_status === 'inviting'"
              disabled
              plain
              size="mini">{{ $t('已邀请') }}</el-button>
            <el-button
              v-else-if="user.invitation_status === 'reviewed'"
              disabled
              plain
              size="mini">{{ $t('已评价') }}</el-button>
            <el-button
              v-else
              :loading="btnLoadings[index]"
              plain
              type="primary"
              size="mini"
              @click="onInvite(index)">{{ $t('邀请') }}</el-button>
          </template>
        </user-list-item>
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
      v-if="!loading && !error"
      class="mt2"/>
  </div>
</template>

<script>
import UserListItem from '@/views/components/UserListItem'
import { searchUsersToInvite } from '@/api/user'
import { inviteUserByUID } from '@/api/review'
export default {
  components: { UserListItem },
  data () {
    return {
      users: [],
      keyword: '',
      pageCount: 1,
      currentPage: 1,
      loading: false,
      error: false,
      btnLoadings: {}
    }
  },
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    if (this.$route.query.keyword) this.keyword = this.$route.query.keyword
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.loading = true
      this.error = false
      const { currentPage, keyword } = this
      searchUsersToInvite(currentPage, keyword)
        .then(({ data: { data: users, meta: { pagination } } }) => {
          this.loading = false
          this.users = users
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
          this.error = true
        })
    },
    onInvite (index) {
      if (this.btnLoadings[index]) return
      this.$set(this.btnLoadings, index, true)
      const user = this.users[index]
      inviteUserByUID(user.id).then(() => {
        user.invitation_status = 'inviting'
        this.btnLoadings[index] = false
      }).catch(() => {
        this.btnLoadings[index] = false
      })
    },
    onSearch () {
      this.$router.push({
        path: this.$route.path,
        query: {
          keyword: this.keyword
        }
      })
    },
    onChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
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
}
</style>
