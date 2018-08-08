<i18n>
{
  "en": {
    "编辑个人资料": "Personal Information",
    "上传认证信息": "Authentication Information",
    "绑定手机号": "Binding Phone",
    "绑定邮箱": "Binding Email",
    "我发表的评论": "My Replies"
  }
}
</i18n>

<template>
  <el-menu
    :default-active="$route.path"
    class="aside"
    router>
    <el-menu-item index="/me">{{ $t('编辑个人资料') }}</el-menu-item>
    <el-menu-item index="/me/auth">{{ $t('上传认证信息') }}</el-menu-item>
    <el-menu-item index="/me/phone">{{ $t('绑定手机号') }}</el-menu-item>
    <el-menu-item index="/me/email">{{ $t('绑定邮箱') }}</el-menu-item>
    <el-menu-item index="/me/reply">{{ $t('我发表的评论') }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {

}
</script>
