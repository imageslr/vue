<i18n>
{
  "zh": {
    "activity_replied": "{name} 评论了你的动态 {activityContent} {createdAt}",
    "reply_replied": "{name} 回复了你在动态 {activityContent} 下的评论 {createdAt}",
    "project_applied": "{name} 报名了你的项目 {projectTitle} {createdAt}"
  },
  "en": {
    "activity_replied": "{name} replied your activity {activityContent}",
    "reply_replied": "{name} replied your reply under activity {activityContent}",
    "project_applied": "{name} applied your project {projectTitle}",
    "点击查看": "Click to view"
  }
}
</i18n>

<template>
  <div
    v-if="data.type === 'activity_replied' || data.type === 'reply_replied'"
    :class="{unread: !notification.read_at}"
    class="notification-item">
    <i18n
      :path="data.type"
      tag="div">
      <router-link
        :to="`/profile?uid=${data.user_id}`"
        place="name">{{ data.user_name }}</router-link>
      <router-link
        :to="`/activity/${data.activity_id}`"
        place="activityContent">{{ data.activity_content || $t('点击查看') }}</router-link>
      <span
        class="ml-4 black-45"
        place="createdAt"
        v-text="notification.created_at" />
    </i18n>
    <p
      class="reply-content"
      v-text="data.reply_content" />
  </div>
  <div
    v-else-if="data.type === 'project_applied'"
    :class="{unread: !notification.read_at}"
    class="notification-item">
    <i18n
      :path="data.type"
      tag="div">
      <router-link
        :to="`/profile?uid=${data.user_id}`"
        place="name">{{ data.user_name }}</router-link>
      <router-link
        :to="`/project/${data.project_id}`"
        place="projectTitle">{{ data.project_title }}</router-link>
      <span
        class="ml-4 black-45"
        place="createdAt"
        v-text="notification.created_at" />
    </i18n>
    <p
      class="application-remark"
      v-text="data.application_remark" />
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      default () {
        return {
          id: null,
          data: {}
        }
      }
    }
  },
  computed: {
    data () {
      return this.notification.data
    }
  },
  methods: {
    markAsRead () {

    }
  }
}
</script>

<style lang="scss">
.notification-item {
  padding: 16px;
  font-size: 14px;
  border: 1px solid rgba($color: #000000, $alpha: 0.15);
  border-radius: 4px;
  &.unread {
    background-color: #e6f7ff;
    border: 1px solid #bae7ff;
  }
  a {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
  .reply-content,
  .application-remark {
    margin: 8px 0 0;
    line-height: 1.5;
  }
}
</style>
