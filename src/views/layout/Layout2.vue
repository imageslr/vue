<template>
  <div class="app-container">
    <navbar class="app-nav"/>
    <section class="app-main">
      <!-- <transition
        name="fade"
        mode="out-in"> -->
      <router-view :key="$route.fullPath"/>
      <!-- </transition> -->
    </section>
    <app-footer/>
  </div>
</template>
<script>
import { Navbar, AppFooterBlack as AppFooter } from './components'
export default {
  components: {
    Navbar, AppFooter
  }
}
</script>
<style scoped>
.app-container {
  position: relative;
  width: 100%;
  min-height: 100%;
  padding-top: 70px;
  background-color: #f9f9f9;
}
.app-nav {
  z-index: 5;
  position: fixed;
  top: 0;
  width: 100%;
}
.app-main {
  position: relative;
  min-height: calc(100vh - 70px); /* header: 70px */
}
</style>
