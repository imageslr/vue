<i18n>
{
  "zh": {
    "publishRequirement": "发布需求",
    "publishedRequirements": "已发布的需求",
    "followingDesigners": "我的设计师"
  },
  "en": {
    "publishRequirement": "Publish requirement",
    "publishedRequirements": "Published requirements",
    "followingDesigners": "Following designers"
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
        show-follow-button/>
    </main>
    <div class="action-area-container">
      <aside class="action-area card">
        <router-link
          class="action-area-item"
          to="publish">{{ $t('publishRequirement') }}</router-link>
        <router-link
          class="action-area-item"
          to="order">{{ $t('publishedRequirements') }}</router-link>
        <router-link
          class="action-area-item"
          to="follow">{{ $t('followingDesigners') }}</router-link>
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
    getActivities (start) {
      let uid = this.$store.getters.uid
      return getFollowingActivities(uid, start)
    },
    onPublished (e) {
      console.log(this.$refs.activityList)
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
