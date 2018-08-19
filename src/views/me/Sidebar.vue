<i18n>
{
  "en": {
    "个人信息管理": "Information Management",
    "编辑个人资料": "Personal Information",
    "上传认证信息": "Authentication",
    "绑定手机号": "Binding Phone",
    "绑定邮箱": "Binding Email",
    "修改密码": "Reset Password",
    "我发表的评论": "My Replies",
    "评价管理": "Review Management",
    "我收到的评价": "Received Reviews",
    "邀请用户评价": "Invite User to Review",
    "我发表的评价": "Posted Reviews"
  }
}
</i18n>

<template>
  <el-menu
    :default-active="$route.path"
    :default-openeds="['me', 'review']"
    class="aside"
    router>
    <el-submenu index="me">
      <template slot="title">{{ $t('个人信息管理') }}</template>
      <el-menu-item index="/me">{{ $t('编辑个人资料') }}</el-menu-item>
      <el-menu-item index="/me/auth">{{ $t('上传认证信息') }}</el-menu-item>
      <el-menu-item index="/me/phone">{{ $t('绑定手机号') }}</el-menu-item>
      <el-menu-item index="/me/email">{{ $t('绑定邮箱') }}</el-menu-item>
      <el-menu-item index="/me/password">{{ $t('修改密码') }}</el-menu-item>
    </el-submenu>
    <el-submenu index="review">
      <template slot="title">{{ $t('评价管理') }}</template>
      <el-menu-item index="/me/review/received">{{ $t('我收到的评价') }}</el-menu-item>
      <el-menu-item index="/me/review/posted">{{ $t('我发表的评价') }}</el-menu-item>
      <el-menu-item index="/me/invite">{{ $t('邀请用户评价') }}</el-menu-item>
    </el-submenu>
    <!-- <el-menu-item index="/me/reply">{{ $t('我发表的评论') }}</el-menu-item> -->
  </el-menu>
</template>

<script>
export default {

}
</script>
