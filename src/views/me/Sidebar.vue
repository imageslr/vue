<i18n>
{
  "zh": {
    "personalInformation": "编辑个人资料",
    "bindingPhone": "绑定手机号",
    "bindingEmail": "绑定邮箱",
    "myReplies": "我发表的评论"
  },
  "en": {
    "personalInformation": "Edit Information",
    "bindingPhone": "Binding Phone",
    "bindingEmail": "Binding Email",
    "myReplies": "My Replies"
  }
}
</i18n>

<template>
  <el-menu
    :default-active="$route.path"
    class="aside"
    router>
    <el-menu-item index="/me">{{ $t('personalInformation') }}</el-menu-item>
    <el-menu-item index="/me/phone">{{ $t('bindingPhone') }}</el-menu-item>
    <el-menu-item index="/me/email">{{ $t('bindingEmail') }}</el-menu-item>
    <el-menu-item index="/me/reply">{{ $t('myReplies') }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {

}
</script>
