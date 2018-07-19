<template>
  <svg
    :style="'fill:'+fill"
    class="svg-icon"
    aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    fill: {
      type: String,
      default: 'currentColor'
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
}
</style>
