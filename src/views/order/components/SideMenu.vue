<i18n>
{
  "zh": {
    "order": "我的订单",
    "review": "我的评论",
    "reviewSended": "我发出的评论",
    "reviewReceived": "我收到的评论"
  },
  "en": {
    "order": "My orders",
    "review": "My reviews",
    "reviewSended": "Sended",
    "reviewReceived": "Received"
  }
}
</i18n>

<template>
  <el-menu
    :default-active="$route.path"
    :default-openeds="['/review']"
    router>
    <el-menu-item index="/order">{{ $t('order') }}</el-menu-item>
    <el-submenu index="/review">
      <template slot="title">{{ $t('review') }}</template>
      <el-menu-item index="/review/sended">{{ $t('reviewSended') }}</el-menu-item>
      <el-menu-item index="/review/received">{{ $t('reviewReceived') }}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {

}
</script>

<style>
</style>
