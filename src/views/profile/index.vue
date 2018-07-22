<i18n>
{
  "zh": {
    "profile": "个人资料",
    "editProfile": "编辑个人资料",
    "partyReviews": "甲方评价",
    "designerReviews": "设计师评价",
    "personalActivities": "个人动态",
    "following": "已关注",
    "contact": "联系"
  },
  "en": {
    "profile": "Profile",
    "editProfile": "Edit profile",
    "partyReviews": "Party Reviews",
    "designerReviews": "Designer Reviews",
    "personalActivities": "Personal Activities",
    "following": "Following",
    "contact": "Contact"
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
          v-if="isSelf"
          @click="editProfileDialogVisible = true">{{ $t('editProfile') }}</el-button>
        <template v-else>
          <el-button
            :loading="followBtnLoading"
            type="primary"
            @click="onToggleFollow">{{ followStatus }}</el-button>
          <el-button>{{ $t('contact') }}</el-button>
        </template>
      </profile-card>
      <edit-profile-dialog :visible.sync="editProfileDialogVisible"/>
      <h2
        v-t="$t(type + 'Reviews')"
        class="title" />
      <review-card :uid="pageUID"/>
    </div>
    <div class="main-container__right">
      <h2
        v-t="$t('personalActivities')"
        class="title" />
      <activity-list
        :get-activities="getActivities"
        :show-action-button="isSelf"/>
    </div>
  </div>
</template>

<script>
import ProfileCard from '@/views/components/ProfileCard'
import ActivityList from '@/views/components/ActivityList'
import ReviewCard from './components/ReviewCard'
import EditProfileDialog from './components/EditProfileDialog'
import { getUserInfoByUID } from '@/api/user'
import { followUserByUID, unfollowUserByUID } from '@/api/follow'
import { getActivitiesByUID } from '@/api/activity'
export default {
  components: {
    ProfileCard,
    ReviewCard,
    EditProfileDialog,
    ActivityList
  },
  data () {
    return {
      userInfo: {}, // 用户信息
      followBtnLoading: false,
      editProfileDialogVisible: false, // 是否显示个人信息编辑Dialog
      activities: [], // 个人动态
      activitiesLoading: true,
      activitiesNomore: false
    }
  },
  computed: {
    // 当前登录账号的uid
    uid () {
      return this.$store.getters.uid
    },
    // 页面参数上的uid，为空的时候默认是自己的主页
    pageUID () {
      return this.$route.query.uid || this.$store.getters.uid
    },
    // 是否在浏览自己的主页
    isSelf () {
      return this.uid == this.pageUID // eslint-disable-line eqeqeq
    },
    // 账号类型
    type () {
      return this.userInfo.type
    },
    // 关注状态
    followStatus () {
      return this.userInfo._is_following ? this.$t('following') : this.$t('g.follow')
    }
  },
  created () {
    if (this.isSelf) {
      this.userInfo = this.$store.getters.userInfo
    } else {
      getUserInfoByUID(this.pageUID).then(({ data }) => {
        this.userInfo = data
      })
    }
  },
  methods: {
    getActivities (start) {
      let uid = this.pageUID
      return getActivitiesByUID(uid, start)
    },
    onToggleFollow () {
      this.followBtnLoading = true
      const fn = this.userInfo._is_following ? unfollowUserByUID : followUserByUID
      fn(this.pageUID).then(() => {
        this.followBtnLoading = false
        this.userInfo._is_following = !this.userInfo._is_following // TODO setUserInfo
        console.log(this.userInfo)
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
</style>
