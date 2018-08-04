<i18n>
{
  "zh": {
    "personalInformation": "个人资料"
  },
  "en": {
    "personalInformation": "Personal Information"
  }
}
</i18n>

<template>
  <el-menu
    :default-active="$route.path"
    class="aside"
    router>
    <el-menu-item index="/me">{{ $t('personalInformation') }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {

}
</script>
