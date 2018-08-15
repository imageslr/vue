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
    "点击查看": "Click to view",
    "标为已读": "Mark as read",
    "删除": "Delete"
  }
}
</i18n>

<template>
  <div
    v-loading="loading"
    v-if="data.type === 'activity_replied' || data.type === 'reply_replied'"
    :class="{unread}"
    class="notification-item">
    <el-dropdown
      class="notification-item__dropdown"
      trigger="click"
      @command="onClickCommand">
      <el-button
        type="text"
        icon="el-icon-arrow-down"/>
      <el-dropdown-menu
        slot="dropdown">
        <el-dropdown-item
          v-if="unread"
          command="markAsRead">{{ $t('标为已读') }}</el-dropdown-item>
        <el-dropdown-item command="delete">{{ $t('删除') }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
  data () {
    return {
      loading: false
    }
  },
  computed: {
    data () {
      return this.notification.data
    },
    unread () {
      return !this.notification.read_at
    }
  },
  methods: {
    onClickCommand (command) {
      if (command === 'markAsRead') {
        this.loading = true
        this.$store.dispatch('markAsReadById', this.notification.id).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
      if (command === 'delete') {
        this.loading = true
        this.$store.dispatch('deleteNotificationById', this.notification).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style lang="scss">
.notification-item {
  position: relative;
  padding: 16px;
  font-size: 14px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  &.unread {
    background-color: #e6f7ff;
  }
  &__dropdown {
    position: absolute;
    right: 16px;
    top: 6px;
    .el-button {
      color: rgba(0, 0, 0, 0.65);
    }
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
