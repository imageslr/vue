<i18n>
{
  "zh": {
    "nomore": "已看完所有动态，前往{0}发现更多精彩内容"
  },
  "en": {
    "我要发布项目": "Publish project",
    "我已发布项目": "Published projects",
    "收藏的设计师": "Following designers",
    "设计师广场": "Designer plaza",
    "搜索项目": "Search projects",
    "我的项目": "My projects",
    "添加作品": "Add work",
    "我的作品集": "My portfolios",
    "我的账户": "My account",
    "nomore": "All activities have been read, go to {0} and discover more exciting things"
  }
}
</i18n>

<template>
  <div class="main-container">
    <profile-card :user-info="userInfo"/>
    <main
      class="main">
      <project-list />
      <publish-card
        v-if="$isDesigner()"
        @published="onPublished"/>
      <recommend-card/>
      <activity-list
        ref="activityList"
        :get-activities="getActivities"
        show-action-button>
        <i18n
          slot="nomore"
          path="nomore"
          class="f-12 m0 pt2 center black-65"
          tag="p">
          <router-link to="/square">{{ $t('设计师广场') }}</router-link>
        </i18n>
      </activity-list>
    </main>
    <div class="action-area-container">
      <aside class="action-area card">
        <template v-if="$isParty()">
          <router-link
            class="action-area-item"
            to="publish">{{ $t('我要发布项目') }}</router-link>
          <router-link
            class="action-area-item"
            to="order">{{ $t('我已发布项目') }}</router-link>
          <router-link
            class="action-area-item"
            to="/follow?userType=designer">{{ $t('收藏的设计师') }}</router-link>
          <router-link
            class="action-area-item"
            to="/square">{{ $t('设计师广场') }}</router-link>
        </template>
        <template v-if="$isDesigner()">
          <router-link
            class="action-area-item"
            to="search">{{ $t('搜索项目') }}</router-link>
          <router-link
            class="action-area-item"
            to="order">{{ $t('我的项目') }}</router-link>
          <router-link
            class="action-area-item"
            to="/work/add">{{ $t('添加作品') }}</router-link>
          <router-link
            class="action-area-item"
            to="/profile">{{ $t('我的作品集') }}</router-link>
          <router-link
            class="action-area-item"
            to="/square">{{ $t('设计师广场') }}</router-link>
          <router-link
            class="action-area-item"
            to="/payment">{{ $t('我的账户') }}</router-link>
        </template>
        <app-footer/>
      </aside>
    </div>
  </div>
</template>

<script>
import ProfileCard from './components/ProfileCard'
import ProjectList from './components/ProjectList'
import ActivityList from '@/views/components/ActivityList'
import PublishCard from './components/PublishCard'
import RecommendCard from './components/RecommendCard'
import AppFooter from '../layout/components/AppFooter'
import { getFollowingActivities } from '@/api/activity'
export default {
  components: {
    ProfileCard,
    ProjectList,
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
