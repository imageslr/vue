<i18n>
{
  "zh": {
    "publishProject": "发布项目",
    "publishedProjects": "已发布的项目",
    "followingDesigners": "收藏的设计师",
    "searchProjects": "搜索项目",
    "myProjects": "我的项目",
    "myWorks": "我的作品集"
  },
  "en": {
    "publishProject": "Publish project",
    "publishedProjects": "Published projects",
    "followingDesigners": "Following designers",
    "searchProjects": "Search projects",
    "myProjects": "My projects",
    "myWorks": "My works"
  }
}
</i18n>

<template>
  <div class="main-container">
    <profile-card :user-info="userInfo"/>
    <main
      class="main">
      <publish-card @published="onPublished"/>
      <recommend-card/>
      <activity-list
        ref="activityList"
        :get-activities="getActivities"
        show-action-button/>
    </main>
    <div class="action-area-container">
      <aside class="action-area card">
        <template v-if="$isParty()">
          <router-link
            class="action-area-item"
            to="publish">{{ $t('publishProject') }}</router-link>
          <router-link
            class="action-area-item"
            to="order">{{ $t('publishedProjects') }}</router-link>
          <router-link
            class="action-area-item"
            to="follow">{{ $t('followingDesigners') }}</router-link>
        </template>
        <template v-if="$isDesigner()">
          <router-link
            class="action-area-item"
            to="search">{{ $t('searchProjects') }}</router-link>
          <router-link
            class="action-area-item"
            to="order">{{ $t('myProjects') }}</router-link>
          <router-link
            class="action-area-item"
            to="work">{{ $t('myWorks') }}</router-link>
        </template>
        <app-footer/>
      </aside>
    </div>
  </div>
</template>

<script>
import ProfileCard from '@/views/components/ProfileCard'
import ActivityList from '@/views/components/ActivityList'
import PublishCard from './components/PublishCard'
import RecommendCard from './components/RecommendCard'
import AppFooter from '../layout/components/AppFooter'
import { getFollowingActivities } from '@/api/activity'
export default {
  components: {
    ProfileCard,
    PublishCard,
    ActivityList,
    AppFooter,
    RecommendCard
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    getActivities (page) {
      return getFollowingActivities(page)
    },
    onPublished (activity) {
      this.$refs.activityList.activities.unshift(activity)
    }
  }
}
</script>

<style scoped>
.main-container {
  padding: 24px 244px 0;
}
.profile-card {
  position: fixed;
  top: 76px;
  margin-left: -244px;
}
.action-area-container {
  position: absolute;
  top: 24px;
  right: 220px;
}
.action-area {
  position: fixed;
  width: 220px;
}
.action-area-item {
  display: block;
  padding: 24px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
.main > .card {
  margin-bottom: 8px;
}
</style>
