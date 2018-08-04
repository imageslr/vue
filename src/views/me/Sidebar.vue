<i18n>
{
  "zh": {
    "personalInformation": "个人资料",
    "myReplies": "我发表的评论"
  },
  "en": {
    "personalInformation": "Personal Information",
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
    <el-menu-item index="/me/reply">{{ $t('myReplies') }}</el-menu-item>
  </el-menu>
</template>

<script>
export default {

}
</script>
