<template>
  <div
    v-infinite-scroll="getActivities"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="200"
    class="container"
  >
    <profile-card/>
    <main
      class="main">
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
        :src="preview.src"
        :width="preview.width" />
      <loader
        :loading="loading"
        icon="facebook" />
    </main>
    <div class="action-area-container">
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
        src: '',
        width: '50%'
      },
      loading: true
    }
  },
  created () {
    this.getActivities()
  },
  methods: {
    getActivities () {
      this.loading = true
      let uid = this.$store.getters.uid
      let start = this.activities.length
      return getFollowingActivities(uid, start).then(({ data }) => {
        this.loading = false
        const { total, activities } = data
        this.activities.push.apply(this.activities, activities)
        this.total = total
      }).catch(() => {
        this.loading = false
      })
    },
    onPreview (e) {
      if (e.target.tagName === 'IMG') {
        this.preview.visible = true
        this.preview.src = e.target.src
        this.preview.width = e.target.width + 'px'
      }
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 24px 244px;
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
</style>
