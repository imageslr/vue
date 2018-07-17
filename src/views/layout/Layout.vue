<template>
  <div class="app-container">
    <navbar/>
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
  background-color: #f9f9f9;
}

.app-main {
  position: relative;
  min-height: calc(100vh - 52px - 60px); /* header: 52px footer: 60px */
}
</style>
