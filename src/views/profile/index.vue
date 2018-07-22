<i18n>
{
  "zh": {
    "profile": "个人资料",
    "editProfile": "编辑个人资料",
    "partyReviews": "甲方评价",
    "designerReviews": "设计师评价",
    "personalActivities": "个人动态",
    "contact": "交流"
  },
  "en": {
    "profile": "Profile",
    "editProfile": "Edit profile",
    "partyReviews": "Party Reviews",
    "designerReviews": "Designer Reviews",
    "personalActivities": "Personal Activities",
    "contact": "Contact"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="main-container__left">
      <profile-card :user-info="userInfo">
        <el-button
          v-if="isSelf"
          @click="editProfileDialogVisible = true">{{ $t('editProfile') }}</el-button>
        <template v-else>
          <el-button
            v-if="userInfo._is_following"
            :loading="followBtnLoading"
            @click="onCancelFollow">{{ $t('g.cancelFollow') }}</el-button>
          <el-button
            v-else
            :loading="followBtnLoading"
            type="primary"
            @click="onFollow">{{ $t('g.following') }}</el-button>
          <el-button>{{ $t('contact') }}</el-button>
        </template>
      </profile-card>
      <review-card />
      <edit-profile-dialog :visible.sync="editProfileDialogVisible"/>
    </div>
    <div class="main-container__right"/>
  </div>
</template>

<script>
import ProfileCard from '@/views/components/ProfileCard'
import ReviewCard from './components/ReviewCard'
import EditProfileDialog from './components/EditProfileDialog'
import { getUserInfoByUID } from '@/api/user'
import { followUserByUID, unfollowUserByUID } from '@/api/follow'
export default {
  components: {
    ProfileCard,
    ReviewCard,
    EditProfileDialog
  },
  data () {
    return {
      userInfo: {}, // 用户信息
      followBtnLoading: false,
      editProfileDialogVisible: false // 是否显示个人信息编辑Dialog
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
    onFollow () {
      this.onToggleFollow('follow')
    },
    onCancelFollow () {
      this.onToggleFollow('unfollow')
    },
    onToggleFollow (action) {
      this.followBtnLoading = true
      const fn = action === 'follow' ? followUserByUID : unfollowUserByUID
      fn(this.pageUID).then(() => {
        this.followBtnLoading = false
        this.userInfo._is_following = !this.userInfo._is_following // TODO setUserInfo
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
}
</style>
