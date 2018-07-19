<template>
  <el-button
    class="lang-select-button"
    type="text"
    @click="switchLanguage">{{ text }}</el-button>
</template>

<script>
export default {
  computed: {
    text () {
      return this.$store.getters.language === 'en' ? '切换语言' : 'Language'
    }
  },
  methods: {
    switchLanguage () {
      let newLanguage = this.$store.getters.language === 'en' ? 'zh' : 'en'
      this.$i18n.locale = newLanguage
      this.$store.dispatch('setLanguage', newLanguage)
      // this.$message({
      //   message: newLanguage === 'en' ? 'Switch Language Success' : '切换语言成功',
      //   type: 'success'
      // })
    }
  }
}
</script>

<style scoped>
.el-button {
  padding: 0;
}
</style>
