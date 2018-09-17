<i18n>
{
  "zh": {
    "activity_replied": "{name} 评论了你的动态 {activityContent} {createdAt}",
    "reply_replied": "{name} 回复了你在动态 {activityContent} 下的评论 {createdAt}",
    "project_applied": "{name} 报名了你的项目 {projectTitle} {createdAt}",
    "project_remitted": "您参与的项目 {projectTitle} 已托管赏金，您可以开始工作了！ {createdAt}",
    "invite_to_review": "{name} 邀请您评价Ta，您的评价将展示在Ta的个人主页 {createdAt}",
    "project_invited": "{name} 邀请您参与Ta的项目 {projectTitle}，请选择是否接受邀请 {createdAt}",
    "project_payed": "您已收到项目 {projectTitle} 的设计费 {amount} 元 {createdAt}"
  },
  "en": {
    "activity_replied": "{name} replied your activity {activityContent}",
    "reply_replied": "{name} replied your reply under activity {activityContent}",
    "project_applied": "{name} applied your project {projectTitle}",
    "project_remitted": "The project {projectTitle} you participating has remitted design fees. You can start working now! {createdAt}",
    "invite_to_review": "{name} invited you to review him, your review will display on his profile page {createdAt}",
    "project_invited": "{name} invitied you to participate his/her project {projectTitle}. Please accept or decline the invitation. {createdAt}",
    "project_payed": "You have received design fee of {projectTitle}: {amount} . {createdAt}",
    "点击查看": "Click to view",
    "标为已读": "Mark as read",
    "查看Ta的个人主页": "View his profile",
    "发表评价": "Post review",
    "删除": "Delete"
  }
}
</i18n>

<template>
  <div
    v-loading="loading"
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
    <template v-if="data.type === 'activity_replied' || data.type === 'reply_replied'">
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
    </template>
    <template v-else-if="data.type === 'project_applied'">
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
      <router-link :to="`/project/${data.project_id}`">
        <el-button
          style="padding-bottom: 0"
          type="text">{{ $t('点击查看') }}</el-button>
      </router-link>
    </template>
    <template v-else-if="data.type === 'invite_to_review'">
      <i18n
        :path="data.type"
        tag="div">
        <router-link
          :to="`/profile?uid=${data.user_id}`"
          place="name">{{ data.user_name }}</router-link>
        <span
          class="ml-4 black-45"
          place="createdAt"
          v-text="notification.created_at" />
      </i18n>
      <router-link :to="`/profile?uid=${data.user_id}`">
        <el-button
          style="padding-bottom: 0"
          type="text">{{ $t('查看Ta的个人主页') }}</el-button>
      </router-link>
      <router-link :to="`/review/post?uid=${data.user_id}`">
        <el-button
          style="padding-bottom: 0"
          type="text">{{ $t('发表评价') }}</el-button>
      </router-link>
    </template>
    <template v-else-if="data.type === 'project_invited'">
      <i18n
        :path="data.type"
        tag="div">
        <router-link
          :to="`/profile?uid=${data.party_id}`"
          place="name">{{ data.party_name }}</router-link>
        <router-link
          :to="`/project/${data.project_id}`"
          place="projectTitle">{{ data.project_title }}</router-link>
        <span
          class="ml-4 black-45"
          place="createdAt"
          v-text="notification.created_at" />
      </i18n>
      <router-link :to="`/project/${data.project_id}`">
        <el-button
          style="padding-bottom: 0"
          type="text">{{ $t('点击查看') }}</el-button>
      </router-link>
    </template>
    <template v-else-if="data.type === 'project_remitted'">
      <i18n
        :path="data.type"
        tag="div">
        <router-link
          :to="`/project/${data.project_id}`"
          place="projectTitle">{{ data.project_title }}</router-link>
        <span
          class="ml-4 black-45"
          place="createdAt"
          v-text="notification.created_at" />
      </i18n>
      <router-link :to="`/project/${data.project_id}`">
        <el-button
          style="padding-bottom: 0"
          type="text">{{ $t('点击查看') }}</el-button>
      </router-link>
    </template>
    <template v-else-if="data.type === 'project_payed'">
      <i18n
        :path="data.type"
        tag="div">
        <router-link
          :to="`/project/${data.project_id}`"
          place="projectTitle">{{ data.project_title }}</router-link>
        <span
          class="ml-4 black-85 bold"
          place="amount"
          v-text="data.amount" />
        <span
          class="ml-4 black-45"
          place="createdAt"
          v-text="notification.created_at" />
      </i18n>
      <router-link :to="`/payment/${data.payment_id}`">
        <el-button
          style="padding-bottom: 0"
          type="text">{{ $t('点击查看') }}</el-button>
      </router-link>
    </template>
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
