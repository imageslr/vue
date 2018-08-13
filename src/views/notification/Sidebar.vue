<i18n>
{
  "en": {
    "未读通知": "Unread",
    "全部通知": "All notificaitons"
  }
}
</i18n>

<template>
  <el-menu
    :default-active="$route.query.type === 'all' ? '/notification?type=all' : '/notification'"
    class="aside"
    router>
    <el-menu-item index="/notification">{{ $t('未读通知') }}</el-menu-item>
    <el-menu-item index="/notification?type=all">{{ $t('全部通知') }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {

}
</script>
