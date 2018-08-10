<i18n>
{
  "en":  {
    "我关注的人": "Following",
    "关注我的人": "Followers",
    "Ta关注的人": "Following",
    "关注Ta的人": "Followers",
    "只看设计师": "Only designer",
    "只看甲方": "Only party"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card">
      <el-menu
        :default-active="pageType"
        style="padding: 0 32px;"
        mode="horizontal"
        @select="onSelectMenuItem">
        <el-menu-item index="following">{{ isCurrentUser ? $t('我关注的人') : $t('Ta关注的人') }}</el-menu-item>
        <el-menu-item index="follower">{{ isCurrentUser ? $t('关注我的人') : $t('关注Ta的人') }}</el-menu-item>
      </el-menu>
      <div class="p2">
        <el-button
          :type="userType === 'designer' ? 'primary' : 'default'"
          size="small"
          plain
          round
          @click="onSelectUserType('designer')">
          {{ $t('只看设计师') }}
        </el-button>
        <el-button
          :type="userType === 'party' ? 'primary' : 'default'"
          size="small"
          plain
          round
          @click="onSelectUserType('party')">
          {{ $t('只看甲方') }}
        </el-button>
      </div>
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
            </div>
            <el-button
              v-if="user.following"
              :loading="followLoadings[index]"
              plain
              size="mini"
              class="list-item__action"
              @click="onToggleFollow(index)">{{ $t('取消关注') }}</el-button>
            <el-button
              v-else
              :loading="followLoadings[index]"
              plain
              type="primary"
              size="mini"
              class="list-item__action"
              @click="onToggleFollow(index)">{{ $t('关注') }}</el-button>
          </div>
        </div>
        <el-pagination
          :current-page.sync="currentPage"
          :page-count="pageCount"
          background
          layout="prev, pager, next"
          @current-change="onChangePage"/>
      </template>
    </div>
  </div>
</template>

<script>
import { getFollowingUsersByUID, getFollowersByUID } from '@/api/follow'
export default {
  data () {
    return {
      users: [],
      pageCount: 1,
      currentPage: 1,
      loading: true,
      error: false,
      followLoadings: {}
    }
  },
  computed: {
    // 页面类型
    pageType () {
      return this.$route.query.type || 'following'
    },
    // 用户类型
    userType () {
      return this.$route.query.userType
    },
    // 当前页面的用户id，默认是当前登录用户的id
    pageUID () {
      return this.$route.query.uid || this.$store.getters.uid
    },
    // 是否是自己的关注页
    isCurrentUser () {
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
      const { currentPage, pageUID, pageType, userType } = this
      const fetch = pageType === 'following' ? getFollowingUsersByUID : getFollowersByUID
      fetch(pageUID, currentPage, userType).then(({
        data: { data: users, meta: { pagination } }
      }) => {
        this.loading = false
        this.pageCount = pagination.total_pages
        this.users = users
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
    onSelectMenuItem (index) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: index,
          uid: this.pageUID
        }
      })
    },
    onSelectUserType (userType) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: this.pageType,
          userType: userType === this.userType ? null : userType, // 如果已经被选中，再次点击就取消选择
          uid: this.pageUID
        }
      })
    },
    onChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: this.pageType,
          userType: this.userType,
          uid: this.pageUID,
          p: page
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.el-pagination {
  padding: 16px 0;
  text-align: center;
}
</style>
