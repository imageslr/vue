<template>
  <div class="main-container">
    <requirement-editer />
    <el-button
      class="block w-100 shadow"
      type="primary"
      @click="onSubmit">{{ $t('g.publish') }}</el-button>
  </div>
</template>

<script>
import RequirementEditer from './components/RequirementEditer'
export default {
  components: {
    RequirementEditer
  },
  methods: {
    onSubmit () {}
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  > * {
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
