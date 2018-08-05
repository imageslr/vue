<i18n>
{
  "zh": {
    "profile": "个人资料",
    "editProfile": "编辑个人资料",
    "partyReviews": "甲方评价",
    "designerReviews": "设计师评价",
    "personalActivities": "个人动态",
    "following": "已关注",
    "contact": "联系",
    "noReviews": "暂未收到评价",
    "viewAll": "查看所有评价",
    "allReviews": "所有评价",
    "works": "作品集"
  },
  "en": {
    "profile": "Profile",
    "editProfile": "Edit profile",
    "partyReviews": "Party Reviews",
    "designerReviews": "Designer Reviews",
    "personalActivities": "Personal Activities",
    "following": "Following",
    "contact": "Contact",
    "noReviews": "No received reviews",
    "viewAll": "View all reviews",
    "allReviews": "All reviews",
    "works": "Works"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="main-container__left">
      <h2
        v-t="$t('profile')"
        class="title" />
      <profile-card :user-info="userInfo">
        <el-button
          v-if="isCurrentUser"
          @click="$router.push({path: '/me'})">{{ $t('editProfile') }}</el-button>
        <template v-else>
          <el-button
            :loading="followBtnLoading"
            type="primary"
            @click="onToggleFollow">{{ userInfo.following ? $t('following') : $t('g.follow') }}</el-button>
          <el-button>{{ $t('contact') }}</el-button>
        </template>
      </profile-card>
      <h2
        v-t="$t((userInfo.type === 'party' ? 'designer' : 'party') + 'Reviews')"
        class="title" />
      <div class="card review-card">
        <div
          v-for="(review, index) in reviews"
          v-if="index < 5"
          :key="review.id"
          class="review-item">
          <div class="review-item__user">
            <router-link :to="'/profile?uid=' + review.reviewer.id">
              <my-avatar
                :avatar-url="review.reviewer.avatar_url"
                class="review-item__user-avatar" />
            </router-link>
            <div class="review-item__user-info">
              <router-link
                :to="'/profile?uid=' + review.reviewer.id"
                class="f-14 bold">{{ review.reviewer.name }}</router-link>
              <el-rate
                v-model="review.rate"
                :colors="['#00A0DC', '#00A0DC', '#00A0DC']"
                class="review-item__user-rate"
                disabled />
              <p
                v-t="review.created_at"
                class="m0 f-12 black-45" />
            </div>
          </div>
          <p
            v-t="review.content"
            class="m0 mt-4 f-12 black-45" />
        </div>
        <el-button
          v-if="reviews.length"
          type="text"
          class="center w-100"
          @click="reviewDialog.visible=true">{{ $t('viewAll') }} </el-button>
        <p
          v-t="$t('noReviews')"
          v-if="!reviews.length"
          class="m0 p-12 f-12 black-45 center"/>
      </div>
    </div>
    <div class="main-container__right">
      <template v-if="userInfo.type === 'designer'">
        <h2
          v-t="$t('works')"
          class="title" />
        <div class="card f-14 center p3 black-65">暂无作品</div>
      </template>
      <h2
        v-t="$t('personalActivities')"
        class="title" />
      <activity-list
        :get-activities="getActivities"
        :show-action-button="isCurrentUser"/>
    </div>
    <el-dialog
      :title="$t('allReviews')"
      :visible.sync="reviewDialog.visible">
      <div v-loading="reviewDialog.loading">
        <div
          v-for="review in reviewDialog.reviews"
          :key="review.id"
          class="review-item">
          <div class="review-item__user">
            <router-link :to="'/profile?uid=' + review.reviewer.id">
              <my-avatar
                :avatar-url="review.reviewer.avatar_url"
                class="review-item__user-avatar" />
            </router-link>
            <div class="review-item__user-info">
              <router-link
                :to="'/profile?uid=' + review.reviewer.id"
                class="f-14 bold">{{ review.reviewer.name }}</router-link>
              <el-rate
                v-model="review.rate"
                :colors="['#00A0DC', '#00A0DC', '#00A0DC']"
                class="review-item__user-rate"
                disabled />
              <p
                v-t="review.created_at"
                class="m0 f-12 black-45" />
            </div>
          </div>
          <p
            v-t="review.content"
            class="m0 mt-4 f-12 black-45" />
        </div>
        <el-pagination
          :current-page.sync="reviewDialog.currentPage"
          :page-count="reviewDialog.pageCount"
          style="text-align: center; padding: 16px 0;"
          background
          layout="prev, pager, next"
          @current-change="getReviews"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ProfileCard from '@/views/components/ProfileCard'
import ActivityList from '@/views/components/ActivityList'
import { getUserInfoByUID } from '@/api/user'
import { followUserByUID, unfollowUserByUID } from '@/api/follow'
import { getActivitiesByUID } from '@/api/activity'
import { getReceivedReviewsByUID } from '@/api/review'
export default {
  components: {
    ProfileCard,
    ActivityList
  },
  data () {
    return {
      userInfo: {
        name: '加载中',
        following_count: 0,
        follower_count: 0
      },
      activities: [], // 个人动态
      reviews: [], // 收到的评论
      followBtnLoading: false,
      activitiesLoading: true,
      activitiesNomore: false,
      reviewDialog: {
        loading: false,
        visible: false,
        reviews: [],
        currentPage: 1,
        pageCount: 1
      }
    }
  },
  computed: {
    // 页面参数上的uid，为空的时候默认是自己的主页
    pageUID () {
      return this.$route.query.uid || this.$uid()
    },
    // 是否是当前用户的主页
    isCurrentUser () {
      return this.$uid() == this.pageUID // eslint-disable-line eqeqeq
    }
  },
  created () {
    if (this.isCurrentUser) {
      this.userInfo = this.$store.getters.userInfo
    } else {
      getUserInfoByUID(this.pageUID).then(({ data }) => {
        this.userInfo = data
      })
    }

    // 获取收到的评价
    getReceivedReviewsByUID(this.pageUID).then(({
      data: { data, meta: { pagination } }
    }) => {
      this.reviews = this.reviewDialog.reviews = data
      this.reviewDialog.pageCount = pagination.total_pages
    })
  },
  methods: {
    getActivities (page) {
      return getActivitiesByUID(this.pageUID, page)
    },
    getReviews (page) {
      this.reviewDialog.loading = true
      getReceivedReviewsByUID(this.pageUID, page).then(({
        data: { data, meta: { pagination } }
      }) => {
        this.reviewDialog.loading = false
        this.reviewDialog.reviews = data
        this.reviewDialog.pageCount = pagination.total_pages
      }).catch(() => {
        this.reviewDialog.loading = false
      })
    },
    onToggleFollow () {
      this.followBtnLoading = true
      const fn = this.userInfo.following ? unfollowUserByUID : followUserByUID
      fn(this.pageUID).then(() => {
        this.followBtnLoading = false
        this.userInfo.following = !this.userInfo.following
      }).catch(() => {
        this.followBtnLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  align-items: flex-start;
  &__left {
    width: 220px;
  }
  &__right {
    flex: 1;
    padding-left: 48px;
  }
  .card,
  .title {
    margin-bottom: 8px;
  }
}
.title {
  padding: 12px 16px;
  font-size: 11px;
  color: #4b4f56;
  background: #f6f7f9;
  border-radius: 2px;
  box-shadow: 0 1px 1px 0 #b5b5b5, 0 2px 1px 0 #e2e1e1,
    0 1px 4px 1px rgba(0, 0, 0, 0.1);
}
.review-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px 12px;
  &__user {
    display: flex;
    align-items: flex-start;
    &-avatar {
      width: 56px;
      height: 56px;
      margin-right: 8px;
      // border: none;
      // border-radius: 0;
      // box-shadow: none;
      // background: none;
    }
    &-rate /deep/ .el-rate__icon {
      margin-right: 0;
    }
  }
}
</style>
