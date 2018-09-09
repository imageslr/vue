<i18n>
{
  "zh": {
    "status": {
      "0": "未查看",
      "1": "接受",
      "2": "拒绝"
    }
  },
  "en": {
    "邀请列表": "Invitation list",
    "邀请于": "Invited at",
    "状态": "Status",
    "status": {
      "0": "Not viewd",
      "1": "Accepted",
      "2": "Declined"
    }
  }
}
</i18n>

<template>
  <div
    v-loading="loading"
    class="card">
    <h3
      v-t="'邀请列表'"
      class="mt0 mb2" />
    <my-empty v-if="!applications.length" />
    <div
      v-else
      class="list">
      <div
        v-for="application in applications"
        :key="application.id"
        class="list-item">
        <router-link :to="'/profile?uid=' + application.user.id">
          <my-avatar
            :avatar-url="application.user.avatar_url"
            class="list-item__avatar"/>
        </router-link>
        <div class="list-item__info">
          <router-link
            :to="'/profile?uid=' + application.user.id"
            class="bold black-85">{{ application.user.name }}</router-link>
          <p>
            <span class="color-primary">{{ $t('g.following') }}</span>
            <span v-text="application.user.following_count" />
            <span class="color-primary">{{ $t('g.fans') }}</span>
            <span v-text="application.user.follower_count" />
          </p>
          <p v-text="application.user.title" />
          <p v-text="application.user.introduction" />
        </div>
        <div class="black-45 f-14">
          <div
            v-t="'邀请于'"
            class="m0 mb-4" />
          <div
            class="m0"
            v-text="application.created_at" />
        </div>
        <div class="list-item__action">
          <el-button
            type="text">
            {{ $t('一个操作') }}
          </el-button>
          <el-button
            disabled
            type="text" >
            {{ $t('又一个操作') }}
          </el-button>
        </div>
      </div>
      <el-pagination
        :current-page.sync="currentPage"
        :page-count="pageCount"
        background
        layout="prev, pager, next"
        class="mt2 center"
        @current-change="getInvitations"/>
    </div>
  </div>
</template>

<script>
/* eslint eqeqeq: "off" */
import { getInvitationsByProjectId } from '@/api/project'
export default {
  props: {
    // 项目详情
    project: {
      type: Object,
      validator (value) {
        return Array.isArray(value.invitations)
      },
      required: true
    }
  },
  data () {
    return {
      invitations: [],
      currentPage: 1,
      pageCount: 1,
      loading: false
    }
  },
  created () {
    this.invitations = this.project.invitations
  },
  methods: {
    getInvitations (page = 1) {
      this.loading = true
      getInvitationsByProjectId(this.project.id, page)
        .then(({ data: { data, meta: { pagination } } }) => {
          this.loading = false
          this.invitations = data
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  &-item {
    display: flex;
    align-items: flex-start;
    padding: 16px;
    font-size: 14px;
    &__avatar {
      width: 48px;
      height: 48px;
      margin-right: 24px;
    }
    &__info {
      flex: 1;
      overflow: hidden;
      margin-right: 24px;
      p {
        margin: 4px 0 0;
        color: rgba(0, 0, 0, 0.45);
        font-size: 12px;
      }
    }
    &__action {
      margin-left: 100px;
      .el-button {
        padding: 0;
      }
    }
  }
}
</style>
