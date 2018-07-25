<template>
  <div class="card">
    <h2
      v-t="title"
      class="card__header"/>
    <slot name="title"/>
    <div class="card__content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
</style>
