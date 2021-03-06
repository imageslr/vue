<i18n>
{
  "zh": {
    "description": "这些是你还未参与的项目，快看看有没有你感兴趣的吧~",
    "modes": {
      "free": "自由式",
      "invite": "邀请式",
      "specify": "指定式"
    }
  },
  "en": {
    "我的项目": "My projects",
    "推荐项目": "Recommended projects",
    "收藏人数": "Favorite count",
    "报名人数": "Application count",
    "邀请人数": "Invitation count",
    "报名人员": "Applied designers",
    "邀请人员": "Invited designers",
    "发布于": "Published at",
    "暂无设计师参与": "No designer participates",
    "查看全部": "View all",
    "description": "These projects are which you have not participated. Check to see which you are interested in.",
    "modes": {
      "free": "Free mode",
      "invite": "Invite mode",
      "specify": "Specify mode"
    }
  }
}
</i18n>

<template>
  <div
    v-loading="loading"
    class="card p2">
    <h2
      v-if="$isParty()"
      class="m0 flex items-center">
      <span class="flex-auto f-15 bold">{{ $t('我的项目') }}</span>
      <router-link
        :to="'/order'"
        class="link">
        <el-button
          type="text"
          style="padding: 0;">{{ $t('查看全部') }}</el-button>
      </router-link>
    </h2>
    <el-tooltip
      v-else
      :content="$t('description')"
      effect="dark"
      placement="right">
      <h2
        class="m0 f-15 inline-block">
        <span v-t="'推荐项目'" />
        <i class="el-icon-info" />
      </h2>
    </el-tooltip>
    <el-scrollbar v-if="projects.length">
      <ul class="list-reset project-list">
        <li
          v-for="project in projects"
          :key="project.id"
          class="project-list-item">
          <div
            class="ellipsis-1">
            <status-tag :status="project.status" />
            <el-tag>{{ $t(`modes.${project.mode}`) }}</el-tag>
            <router-link
              :to="`project/${project.id}`"
              v-text="project.title" />
          </div>
          <p class="f-14 black-65 mb1">{{ $t('发布于') }}：{{ project.created_at }}</p>
          <p class="f-14 black-65 mt0 mb1">
            {{ $t('收藏人数') }}：{{ project.favorite_count }}
            <template v-if="project.mode === 'free'"> | {{ $t('报名人数') }}：{{ project.application_count }}</template>
            <template v-else> | {{ $t('邀请人数') }}：{{ project.invitation_count }}</template>
          </p>
          <div
            v-if="$isParty()"
            class="avatar-list">
            <div
              class="title"
              v-text="$t(project.mode === 'free' ? '报名人员' : '邀请人员') + '：'" />
            <div
              v-t="'暂无设计师参与'"
              v-if="project.mode === 'free' ? !project.application_count : !project.invitation_count"
              class="f-14 black-65" />
            <div class="list">
              <template>
                <router-link
                  v-for="{ user } in (project.mode === 'free' ? project.applications : project.invitations)"
                  :to="'/profile?uid=' + user.id"
                  :key="user.id"
                  tag="div"
                  class="list-item">
                  <my-avatar
                    :avatar-url="user.avatar_url"
                    class="list-item__avatar" />
                  <div
                    class="list-item__name ellipsis-1"
                    v-text="user.name"/>
                </router-link>
                <router-link
                  v-if="project.mode === 'free' ?
                    project.application_count > project.applications.length :
                  project.invitation_count > project.invitations.length"
                  :to="`/project/${project.id}`"
                  tag="div"
                  class="list-more">
                  <i class="el-icon-more"/>
                </router-link>
              </template>
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
    <my-empty v-else />
  </div>
</template>

<script>
import StatusTag from '@/views/components/StatusTag'
import { getProcessingProjectsOfCurrentUser, getRecommendProjectsOfCurrentUser } from '@/api/project'
export default {
  components: { StatusTag },
  data () {
    return {
      loading: true,
      projects: []
    }
  },
  created () {
    this.getProjects()
  },
  methods: {
    getProjects () {
      const fn = this.$isParty() ? getProcessingProjectsOfCurrentUser : getRecommendProjectsOfCurrentUser
      fn().then(({ data: { data: projects } }) => {
        this.projects = projects
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.project-list {
  white-space: nowrap;
  &-item {
    display: inline-block;
    width: 480px;
    padding: 16px;
    margin-right: 16px;
    border: 1px solid rgba($color: #000000, $alpha: 0.15);
    border-radius: 4px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.avatar-list {
  display: flex;
  align-items: flex-start;
  .title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
  .list {
    flex: 1;
    overflow: auto;
    &-item {
      display: inline-block;
      width: 50px;
      margin-right: 8px;
      text-align: center;
      cursor: pointer;
      &__avatar {
        width: 32px;
        height: 32px;
      }
      &__name {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
    &-more {
      position: relative;
      left: 9px; // 为了和list-item__avater之间的间距一致
      display: inline-block;
      width: 32px;
      height: 32px;
      font-size: 20px;
      color: rgba($color: #000000, $alpha: 0.65);
      text-align: center;
      vertical-align: top;
      border: 1px solid rgba($color: #000000, $alpha: 0.15);
      border-radius: 50%;
      cursor: pointer;
      > .el-icon-more {
        vertical-align: middle;
      }
    }
  }
}
</style>
