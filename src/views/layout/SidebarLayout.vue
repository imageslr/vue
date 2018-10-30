
<template>
  <div class="app-container">
    <navbar class="app-navbar"/>
    <router-view
      :key="$route.fullPath"
      class="app-sidebar"
      name="sidebar"/>
    <div class="app-main">
      <router-view
        :key="$route.fullPath"
        class="app-content"
        name="content"/>
      <app-footer />
    </div>
  </div>
</template>

<script>
import { Navbar, AppFooter } from './components'
export default {
  components: {
    Navbar, AppFooter
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 70px;
  padding-left: 200px;
  min-height: 100%;
  .app-navbar {
    z-index: 5;
    position: fixed;
    height: 70px;
    top: 0;
    left: 0;
    width: 100%;
  }
  .app-sidebar {
    position: fixed;
    left: 0;
    top: 70px;
    bottom: 0;
    width: 200px;
  }
  .app-main {
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    .app-content {
      flex: 1;
    }
  }
}
</style>
