<i18n>
{
  "en": {
    "项目": "Projects",
    "设计师": "Designers",
    "甲方": "Party"
  }
}
</i18n>

<template>
  <div>
    <el-menu
      :default-active="searchType"
      mode="horizontal"
      @select="onNavigate">
      <el-menu-item index="project">{{ $t('项目') }}</el-menu-item>
      <el-menu-item index="designer">{{ $t('设计师') }}</el-menu-item>
      <el-menu-item index="party">{{ $t('甲方') }}</el-menu-item>
    </el-menu>
    <project-list v-if="searchType === 'project'" />
    <user-list v-if="searchType === 'designer' || searchType == 'party'" />
  </div>
</template>

<script>
import ProjectList from './ProjectList'
import UserList from './UserList'
export default {
  components: { ProjectList, UserList },
  computed: {
    searchType () {
      return this.$route.query.type || 'project'
    }
  },
  methods: {
    onNavigate (index) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: index,
          p: 1
        }
      })
    }
  }
}
</script>
