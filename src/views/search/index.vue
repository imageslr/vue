<i18n>
{
  "en": {
    "项目": "Projects",
    "设计师": "Designers"
  }
}
</i18n>

<template>
  <div>
    <el-menu
      :default-active="$route.query.type || 'project'"
      mode="horizontal"
      @select="onNavigate">
      <el-menu-item index="project">{{ $t('项目') }}</el-menu-item>
      <el-menu-item index="designer">{{ $t('设计师') }}</el-menu-item>
    </el-menu>
    <project-list v-if="!$route.query.type || $route.query.type == 'project'" />
    <user-list v-if="$route.query.type == 'designer'" />
  </div>
</template>

<script>
import ProjectList from './ProjectList'
import UserList from './UserList'
export default {
  components: { ProjectList, UserList },
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
