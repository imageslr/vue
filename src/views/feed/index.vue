<template>
  <div class="container">
    <profile-card/>
    <main class="main">
      <publish-card class="mb1"/>
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
export default {
  components: { ProfileCard, PublishCard, ActivityCard, AppFooter }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  width: 1000px; /* 200 | 24+...+24 | 200 */
  margin: 24px auto;
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
