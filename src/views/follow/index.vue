<i18n>
{
  "zh": {
    "followingTabTitle": "我关注的人",
    "followerTabTitle": "关注我的人",
    "followingTabTitleOther": "Ta关注的人",
    "followerTabTitleOther": "关注Ta的人"
  },
  "en":  {
    "followingTabTitle": "Following",
    "followerTabTitle": "Followers",
    "followingTabTitleOther": "Following",
    "followerTabTitleOther": "Followers"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card">
      <el-menu
        :default-active="type"
        style="padding: 0 32px;"
        mode="horizontal"
        @select="onSelectMenuItem">
        <el-menu-item index="following">{{ isSelf ? $t('followingTabTitle') : $t('followingTabTitleOther') }}</el-menu-item>
        <el-menu-item index="follower">{{ isSelf ? $t('followerTabTitle') : $t('followerTabTitleOther') }}</el-menu-item>
      </el-menu>
      <loader
        :loading="loading"
        :error="error"
        :on-reload="getUsers"/>
      <user-list :users="users"/>
      <el-pagination
        :current-page.sync="currentPage"
        :total="total"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        @current-change="onNavigate"/>
    </div>
  </div>
</template>

<script>
import { getFollowingUsersByUID, getFollowersByUID } from '@/api/follow'
import UserList from './components/UserList'
export default {
  components: { UserList },
  data () {
    return {
      loading: true,
      error: false,
      users: [],
      total: Infinity, // TODO: Bug report: 设成0时current-page会失效，不知道为什么
      pageSize: 20,
      currentPage: 1
    }
  },
  computed: {
    // 页面列表类型
    type () {
      if (this.$route.query.type === 'follower') {
        return 'follower'
      } else {
        return 'following'
      }
    },
    // 当前页面的用户id，默认是当前登录用户的id
    pageUID () {
      return this.$route.query.uid || this.$store.getters.uid
    },
    // 是否是自己的关注页
    isSelf () {
      return this.pageUID == this.$store.getters.uid // eslint-disable-line eqeqeq
    }
  },
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.loading = true
      this.error = false
      const start = (this.currentPage - 1) * this.pageSize
      const fn = this.type === 'following' ? getFollowingUsersByUID : getFollowersByUID
      fn(this.pageUID, start).then(({ data: { users, total } }) => {
        this.loading = false
        this.total = total
        this.users = [...this.users, ...users]
      }).catch(() => {
        this.loading = false
        this.error = true
      })
    },
    onSelectMenuItem (index) {
      if (index === 'following') {
        this.$router.push({
          path: this.$route.path,
          query: {
            type: 'following',
            uid: this.pageUID
          }
        })
      } else {
        this.$router.push({
          path: this.$route.path,
          query: {
            type: 'follower',
            uid: this.pageUID
          }
        })
      }
    },
    onNavigate (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: this.type,
          uid: this.pageUID,
          p: page
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  padding: 16px 0;
  text-align: center;
}
</style>
