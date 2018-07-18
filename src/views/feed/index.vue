<template>
  <div class="container">
    <profile-card/>
    <main class="main">
      <publish-card class="mb1"/>
      <activity-card
        v-for="activity in activities"
        :activity="activity"
        :key="activity.id"
        class="mb1"
        show-follow-button
        @preview="onPreview"/>
      <preview
        :visible.sync="preview.visible"
        :photo-url="preview.photoUrl"
        :width="preview.width" />
    </main>
    <aside class="action-area card">
      <router-link
        class="action-area-item"
        to="publish">{{ $t('actions.publishRequirement') }}</router-link>
      <router-link
        class="action-area-item"
        to="order">{{ $t('actions.publishedRequirements') }}</router-link>
      <router-link
        class="action-area-item"
        to="follow">{{ $t('actions.followingDesigners') }}</router-link>
      <div><app-footer/></div>
    </aside>
  </div>
</template>

<script>
import ProfileCard from '../components/ProfileCard'
import PublishCard from '../components/PublishCard'
import ActivityCard from '../components/ActivityCard'
import AppFooter from '../layout/components/AppFooter'
import { getFollowingActivities } from '@/api/activity'
export default {
  components: { ProfileCard, PublishCard, ActivityCard, AppFooter },
  data () {
    return {
      total: 0,
      activities: [],
      preview: {
        visible: false,
        photoUrl: '',
        width: '50%'
      }
    }
  },
  created () {
    this.getActivities()
  },
  methods: {
    getActivities () {
      getFollowingActivities(this.$store.getters.uid).then(({ data }) => {
        const { total, activities } = data
        this.activities.push.apply(this.activities, activities)
        this.total = total
      })
    },
    onPreview (e) {
      if (e.target.tagName === 'IMG') {
        this.preview.visible = true
        this.preview.photoUrl = e.target.src
        this.preview.width = e.target.width + 'px'
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  width: 1000px; /* 200 | 24+...+24 | 200 */
  margin: 24px auto 0;
}
.main {
  flex: 1;
  margin: 0 24px;
}
.action-area {
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
</style>
