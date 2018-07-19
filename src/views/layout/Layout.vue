<template>
  <div class="app-container">
    <navbar class="app-nav"/>
    <transition
      name="fade"
      mode="out-in">
      <section class="app-main">
        <router-view :key="$route.fullPath"/>
      </section>
    </transition>
    <app-footer/>
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
<style scoped>
.app-container {
  position: relative;
  width: 100%;
  min-height: 100%;
  padding-top: 52px;
  background-color: #f9f9f9;
}
.app-nav {
  z-index: 50;
  position: fixed;
  top: 0;
  width: 100%;
}
.app-main {
  position: relative;
  min-height: calc(100vh - 52px - 60px); /* header: 52px footer: 60px */
}
</style>
