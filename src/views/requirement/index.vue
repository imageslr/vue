<template>
  <div/>
</template>

<script>
import { getReqDetailById } from '@/api/requirement'
export default {
  data () {
    return {
      reqDetail: {
        user: {

        }
      }
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    getReqDetailById()
  }
}
</script>

<style>
</style>
