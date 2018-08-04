<template>
  <div class="main-container">
    <project-editer ref="editor"/>
    <el-button
      :loading="loading"
      class="block w-100 shadow mt-24"
      type="primary"
      @click="onSubmit">{{ $t('g.publish') }}</el-button>
  </div>
</template>

<script>
import ProjectEditer from './components/ProjectEditer'
import { publishProject } from '@/api/project'
export default {
  components: { ProjectEditer },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      const editor = this.$refs.editor
      const form = editor.form
      const body = {
        ...form,
        user_id: this.$store.getters.uid
      }
      editor.validate(valid => {
        if (valid) {
          publishProject(body).then(({ data: { req_id } }) => {
            this.loading = false
            this.$router.replace(`/publish/result?id=${req_id}`)
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
