<i18n>
{
  "en": {
    "我发布的项目": "My projects",
    "我参与的项目": "My participated projects",
    "我收藏的项目": "My favorite projects",
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
    <el-menu-item index="/order">{{ $isParty() ? $t('我发布的项目') : $t('我参与的项目') }}</el-menu-item>
    <el-menu-item
      v-if="$isDesigner()"
      index="/order/favorite">{{ $t('我收藏的项目') }}</el-menu-item>
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
