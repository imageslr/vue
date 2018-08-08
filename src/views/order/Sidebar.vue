<i18n>
{
  "en": {
    "我的订单": "My orders",
    "我的评价": "My reviews",
    "我发出的评价": "Sended",
    "我收到的评价": "Received"
  }
}
</i18n>

<template>
  <el-menu
    :default-active="$route.path"
    :default-openeds="['/review']"
    router>
    <el-menu-item index="/order">{{ $t('我的订单') }}</el-menu-item>
    <!-- <el-submenu index="/review">
      <template slot="title">{{ $t('review') }}</template>
      <el-menu-item index="/review/sended">{{ $t('reviewSended') }}</el-menu-item>
      <el-menu-item index="/review/received">{{ $t('reviewReceived') }}</el-menu-item>
    </el-submenu> -->
  </el-menu>
</template>

<script>
export default {

}
</script>

<style>
</style>
