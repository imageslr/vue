<i18n>
{
  "en": {
    "个人资料": "Profile",
    "编辑个人资料": "Edit profile",
    "甲方评价": "Party Reviews",
    "设计师评价": "Designer Reviews",
    "收到的评价": "Received Reviews",
    "个人动态": "Personal Activities",
    "已关注": "Following",
    "关注": "Follow",
    "联系": "Contact",
    "分享": "Share",
    "浏览量": "Views",
    "复制链接": "Copy the link",
    "暂未收到评价": "No received reviews",
    "查看所有评价": "View all reviews",
    "所有评价": "All reviews",
    "作品集": "Works",
    "拼命加载中": "Loading user info",
    "发送站内信": "Send direct message",
    "发 送": "Send",

    "您可以评价该用户": "You can review the user",
    "发表评价": "Post review",

    "发送成功后，您可在消息列表中查看对话": "You can view the conversation in the message list once sent",

    "发送成功": "Successfully sent message",
    "消息不能为空": "Message cannot be empty",
    "您无权查看该甲方的信息": "You are not authorized to view the information of the Party."
  }
}
</i18n>

<template>
  <div
    v-if="userInfo.id"
    class="main-container">
    <my-alert
      v-if="userInfo.can_review"
      :title="$t('您可以评价该用户')"
      :action-text="$t('发表评价')"
      @clickAction="$router.push(`/review/post?uid=${pageUID}`)" />
    <div class="content">
      <div class="content__left">
        <h2
          v-t="'个人资料'"
          class="title" />
        <profile-card :user-info="userInfo">
          <el-button
            v-if="isCurrentUser"
            @click="$router.push({path: '/me'})">{{ $t('编辑个人资料') }}</el-button>
          <template v-else>
            <el-button
              v-if="userInfo.type === 'designer'"
              :loading="followBtnLoading"
              type="primary"
              @click="onToggleFollow">{{ userInfo.following ? $t('已关注') : $t('关注') }}</el-button>
            <el-button @click="messageDialog.visible = true">{{ $t('联系') }}</el-button>
          </template>
          <el-button @click="onShare">
            {{ $t('分享') }}
            <i class="el-icon-share" />
          </el-button>
          <p class="f-12 m0 black-45">{{ $t('浏览量') }}：{{ userInfo.views }}</p>
        </profile-card>
        <template v-if="isDesigner">
          <h2
            v-t="'收到的评价'"
            class="title" />
          <review-list
            v-loading="reviewLoading"
            :reviews="reviews"
            @clickBtn="reviewDialog.visible=true" />
        </template>
      </div>
      <div class="content__right">
        <template v-if="isDesigner">
          <div class="flex-title">
            <h2
              v-t="'作品集'"
              :class="{'unactive': pageType != 'work' }"
              class="title"
              @click="pageType = 'work'" />
            <h2
              v-t="'个人动态'"
              :class="{'unactive': pageType != 'activity' }"
              class="title"
              @click="pageType = 'activity'" />
          </div>
          <keep-alive>
            <work-list v-if="pageType === 'work'" />
            <activity-list
              v-else
              :get-activities="getActivities"
              :show-action-button="isCurrentUser"/>
          </keep-alive>
        </template>
        <template v-else>
          <h2
            v-t="'收到的评价'"
            class="title" />
          <review-list
            v-loading="reviewLoading"
            :reviews="reviews"
            @clickBtn="reviewDialog.visible=true" />
        </template>
      </div>
    </div>
    <el-dialog
      :title="$t('发送站内信')"
      :visible.sync="messageDialog.visible"
      width="500px">
      <el-input
        v-model="messageDialog.input"
        :placeholder="$t('发送成功后，您可在消息列表中查看对话')"
        @keyup.native.enter="onSendMessage"/>
      <div slot="footer">
        <el-button @click="messageDialog.visible = false">{{ $t('g.cancelBtn') }}</el-button>
        <el-button
          :loading="messageDialog.loading"
          type="primary"
          @click="onSendMessage">{{ $t('发 送') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('所有评价')"
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
              <!-- <el-rate
                v-model="review.rate"
                :colors="['#00A0DC', '#00A0DC', '#00A0DC']"
                class="review-item__user-rate"
                disabled /> -->
              <span
                v-t="`g.${review.reviewer.type}`"
                class="f-14 black-45" />
              <p
                class="m0 f-12 black-45"
                v-text="review.created_at" />
            </div>
          </div>
          <p
            class="m0 mt-4 f-12 black-45"
            v-text="review.content" />
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
import WorkList from './components/WorkList'
import ReviewList from './components/ReviewList'
import { getUserInfoByUID } from '@/api/user'
import { getActivitiesByUID } from '@/api/activity'
import { getReceivedReviewsByUID } from '@/api/review'
import { postMessage } from '@/api/message'
export default {
  components: {
    ProfileCard,
    ActivityList,
    WorkList,
    ReviewList
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
      reviewLoading: true,
      followBtnLoading: false,
      activitiesLoading: true,
      activitiesNomore: false,
      reviewDialog: {
        loading: false,
        visible: false,
        reviews: [],
        currentPage: 1,
        pageCount: 1
      },
      messageDialog: {
        visible: false,
        input: '',
        loading: false
      },
      pageType: 'work' // 设计师主页当前显示的信息流类型，work（作品集）或activity（动态）
    }
  },
  computed: {
    // 页面参数上的uid，为空的时候默认是自己的主页
    pageUID () {
      return this.$route.query.uid || this.$uid()
    },
    // 是否是设计师
    isDesigner () {
      return this.userInfo.type === 'designer'
    },
    // 是否是当前用户的主页
    isCurrentUser () {
      return this.$uid() == this.pageUID // eslint-disable-line eqeqeq
    }
  },
  created () {
    // 获取用户信息
    if (this.isCurrentUser) {
      this.userInfo = this.$store.getters.userInfo

      // 获取收到的评价
      getReceivedReviewsByUID(this.pageUID).then(({
        data: { data, meta: { pagination } }
      }) => {
        this.reviews = this.reviewDialog.reviews = data
        this.reviewDialog.pageCount = pagination.total_pages
        this.reviewLoading = false
      }).catch(() => {
        this.reviewLoading = false
      })
    } else {
      const loading = this.$loading({
        lock: true,
        spinner: 'el-icon-loading',
        text: this.$t('拼命加载中'),
        background: 'rgba(255, 255, 255)'
      })
      getUserInfoByUID(this.pageUID).then(({ data }) => {
        this.userInfo = data
        loading.close()

        // 获取收到的评价
        getReceivedReviewsByUID(this.pageUID).then(({
          data: { data, meta: { pagination } }
        }) => {
          this.reviews = this.reviewDialog.reviews = data
          this.reviewDialog.pageCount = pagination.total_pages
          this.reviewLoading = false
        }).catch(() => {
          this.reviewLoading = false
        })
      }).catch(({ response }) => {
        loading.close()
        if (response && response.status === 403 && response.data) {
          this.$message.warning(response.data.message)
        }
      })
    }
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
      const action = this.userInfo.following ? 'UNFOLLOW' : 'FOLLOW'
      this.$store.dispatch(action, this.pageUID).then(() => {
        this.followBtnLoading = false
        this.userInfo.following = !this.userInfo.following
      }).catch(() => {
        this.followBtnLoading = false
      })
    },
    onShare () {
      let link = this.$t('app.link') + this.$route.path + '?uid=' + this.pageUID
      this.$alert(link, this.$t('复制链接'), {
        confirmButtonText: this.$t('g.confirmBtn')
      })
    },
    onSendMessage () {
      const { input } = this.messageDialog
      if (!input || !input.trim()) {
        return this.$message.warning(this.$t('消息不能为空'))
      }
      this.messageDialog.loading = true
      postMessage(this.pageUID, input).then(() => {
        this.messageDialog = {
          visible: false,
          input: '',
          loading: false
        }
        this.$message.success(this.$t('发送成功'))
      }).catch(() => {
        this.messageDialog.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
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
  color: rgba(0, 0, 0, 0.85);
  background: #f6f7f9;
  border-radius: 2px;
  box-shadow: 0 1px 1px 0 #b5b5b5, 0 2px 1px 0 #e2e1e1,
    0 1px 4px 1px rgba(0, 0, 0, 0.1);
}
.flex-title {
  display: flex;
  .title {
    flex: 1;
    cursor: pointer;
    &:first-child {
      margin-right: 4px;
    }
    &:last-child {
      margin-left: 4px;
    }
    &.unactive {
      color: rgba(0, 0, 0, 0.65);
      font-weight: normal;
    }
  }
}
.review-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px 12px;
  &__user {
    display: flex;
    align-items: flex-start;
    &-avatar {
      width: 36px;
      height: 36px;
      margin-right: 8px;
    }
    &-rate /deep/ .el-rate__icon {
      margin-right: 0;
    }
  }
}
</style>
