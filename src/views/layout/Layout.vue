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
  height: 100%;
}

.app-main {
  /* header 52px */
  min-height: calc(100vh - 52px);
}
</style>
