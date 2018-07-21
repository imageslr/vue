<i18n>
{
  "zh": {
    "followingTabTitle": "我关注的人",
    "followerTabTitle": "关注我的人"
  },
  "en":  {
    "followingTabTitle": "Following",
    "followerTabTitle": "Followers"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card">
      <el-menu
        :default-active="activeIndex"
        style="padding: 0 32px;"
        mode="horizontal"
        @select="onSelectMenuItem">
        <el-menu-item index="follower">{{ $t('followingTabTitle') }}</el-menu-item>
        <el-menu-item index="following">{{ $t('followerTabTitle') }}</el-menu-item>
      </el-menu>
      <loader
        :loading="loading"
        class="mt2 md2"/>
      <user-list :users.sync="users"/>
      <el-pagination
        :current-page.sync="currentPage"
        :total="total"
        :page-size="20"
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
      users: [],
      total: Infinity, // TODO: Bug report: 设成0时current-page会失效，不知道为什么
      currentPage: 1
    }
  },
  computed: {
    activeIndex () {
      if (this.$route.query.type === 'following') {
        return 'following'
      } else {
        return 'follower'
      }
    },
    start () {
      return (this.currentPage - 1) * 20
    },
    type () {
      if (this.$route.query.type === 'following') {
        return 'following'
      } else {
        return 'follower'
      }
    }
  },
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.loading = true
      const fn = this.type === 'following' ? getFollowingUsersByUID : getFollowersByUID
      const uid = this.$store.getters.uid
      fn(uid, this.start).then(({ data: { users, total } }) => {
        this.loading = false
        this.total = total
        this.users = [...this.users, ...users]
      }).catch(() => {
        this.loading = false
      })
    },
    onSelectMenuItem (index) {
      if (index === 'following') {
        this.$router.push('/follow?type=following')
      } else {
        this.$router.push('/follow?type=follower')
      }
    },
    onNavigate (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          p: page,
          type: this.type
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 16px;
  text-align: center;
}
</style>
