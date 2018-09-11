<i18n>
{
  "en": {
    "交付列表": "Delivery list",
    "下载附件": "Download file",
    "交付于": "Delivered at",
    "查看备注": "View remark",
    "备注": "Remark"
  }
}
</i18n>

<template>
  <div
    v-loading="loading"
    class="card">
    <h3
      v-t="'交付列表'"
      class="mt0 mb2" />
    <my-empty v-if="!deliveries.length" />
    <div
      v-else
      class="list">
      <div
        v-for="item in deliveries"
        :key="item.id"
        class="list-item">
        <router-link :to="'/profile?uid=' + item.user.id">
          <my-avatar
            :avatar-url="item.user.avatar_url"
            class="list-item__avatar"/>
        </router-link>
        <div class="list-item__info">
          <router-link
            :to="'/profile?uid=' + item.user.id"
            class="bold black-85">{{ item.user.name }}</router-link>
          <p>
            <span class="color-primary">{{ $t('g.following') }}</span>
            <span v-text="item.user.following_count" />
            <span class="color-primary">{{ $t('g.fans') }}</span>
            <span v-text="item.user.follower_count" />
          </p>
          <p v-text="item.user.title" />
          <p v-text="item.user.introduction" />
        </div>
        <div class="black-45 f-14">
          <div
            v-t="'交付于'"
            class="m0 mb-4" />
          <div
            class="m0"
            v-text="item.created_at" />
        </div>
        <div class="list-item__action">
          <el-button
            :disabled="!item.remark"
            type="text"
            @click="onViewDetail(item)">
            {{ $t('查看备注') }}
          </el-button>
          <el-button
            :disabled="!item.file_url"
            type="text"
            @click="onDownloadFile(item)" >
            {{ $t('下载附件') }}
          </el-button>
        </div>
      </div>
      <el-pagination
        :current-page.sync="currentPage"
        :page-count="pageCount"
        background
        layout="prev, pager, next"
        class="mt2 center"
        @current-change="getItems"/>
    </div>
    <el-dialog
      :visible.sync="dialog.visible"
      :title="$t('备注')">
      <p v-text="dialog.remark" />
    </el-dialog>
  </div>
</template>

<script>
/* eslint eqeqeq: "off" */
import { getDeliveriesByProjectId } from '@/api/project'
export default {
  props: {
    // 项目详情
    project: {
      type: Object,
      validator (value) {
        return Array.isArray(value.deliveries)
      },
      required: true
    }
  },
  data () {
    return {
      deliveries: [],
      currentPage: 1,
      pageCount: 1,
      loading: false,
      dialog: {
        remark: '',
        visible: false
      }
    }
  },
  created () {
    this.deliveries = this.project.deliveries
  },
  methods: {
    getItems (page = 1) {
      this.loading = true
      getDeliveriesByProjectId(this.project.id, page)
        .then(({ data: { data, meta: { pagination } } }) => {
          this.loading = false
          this.deliveries = data
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
        })
    },
    onViewDetail (item) {
      this.dialog.visible = true
      this.dialog.remark = item.remark
    },
    onDownloadApplicationFile (item) {
      window.open(item.file_url)
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
