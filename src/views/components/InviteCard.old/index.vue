<i18n>
{
  "zh": {
    "header": "邀请设计师",
    "invitedAt": "邀请时间",
    "invite": "邀请",
    "recall": "撤回",
    "searchPlaceholder": "搜索你想要邀请的设计师",
    "alertText": "已邀请 {num} 人"
  },
  "en": {
    "header": "Invite designers",
    "invitedAt": "Invited at",
    "invite": "Invite",
    "recall": "Recall",
    "searchPlaceholder": "Search designers to invite",
    "alertText": "Has invited {num} people"
  }
}
</i18n>

<template>
  <div class="card">
    <div class="card__header">
      <h1 class="card__header-title">{{ $t('header') }}</h1>
      <el-input
        :placeholder="$t('searchPlaceholder')"
        suffix-icon="el-icon-search"
        size="small"
        class="card__header-search"
        @click.native="searchDialogVisible = true"/>
    </div>
    <div class="card__content">
      <my-alert
        :title="$t('alertText', { num: total })"
        type="info" />
      <my-loader
        :loading="loading"
        :error="error"
        :on-reload="getInvitedDesigners" />
      <template v-if="!loading">
        <my-empty v-if="!invitedDesigners.length" />
        <transition-group
          v-else
          tag="div"
          name="fade-transform-x"
          class="list pt1 pb2">
          <div
            v-for="(designer, index) in invitedDesigners"
            :key="designer.id"
            class="list-item">
            <designer-visit-card
              :user="designer"
              class="list-item__info" />
            <div class="list-item__time black-45 f-14">
              <p
                v-t="$t('invitedAt')"
                class="m0 mb-4" />
              <p
                v-t="designer.invited_at"
                class="m0" />
            </div>
            <el-button
              plain
              size="small"
              class="list-item__action"
              @click="onRecall(index)">{{ $t('recall') }}</el-button>
          </div>
        </transition-group>
        <el-pagination
          :current-page.sync="currentPage"
          :total="total"
          :page-size="20"
          background
          layout="prev, pager, next"
          @current-change="onPageChange"/>
      </template>
    </div>
    <search-dialog
      :visible.sync="searchDialogVisible"
      @invited="onInvited"
      @recalled="onRecalled"/>
  </div>
</template>

<script>
import { getInvitedDesignersByReqId, recall } from '@/api/project'
import SearchDialog from './SearchDialog'
import DesignerVisitCard from '@/views/components/DesignerVisitCard'
export default {
  components: { SearchDialog, DesignerVisitCard },
  props: {
    // 需求id
    reqId: {
      type: String | Number,
      default: null
    }
  },
  data () {
    return {
      total: 0,
      invitedDesigners: [],
      searchDialogVisible: false,
      loading: false,
      error: false,
      pageCount: 0,
      currentPage: 1
    }
  },
  created () {
    this.getInvitedDesigners()
  },
  methods: {
    getInvitedDesigners () {
      this.loading = true
      this.error = false
      this.invitedDesigners = []
      const start = (this.currentPage - 1) * 20
      getInvitedDesignersByReqId(this.reqId, start).then(({ data }) => {
        this.loading = false
        this.total = data.total
        this.invitedDesigners = data.users
      }).catch(() => {
        this.loading = false
        this.error = true
      })
    },
    onPageChange (page) {
      this.getInvitedDesigners()
    },
    onRecall (index) {
      const { reqId, invitedDesigners } = this
      const uid = invitedDesigners[index].id
      recall(reqId, uid).then(() => {
        this.invitedDesigners.splice(index, 1)
      })
    },
    // 在搜索框里邀请了某名设计师后的数据同步
    onInvited (designer) {
      if (this.currentPage == 1) { // eslint-disable-line
        this.invitedDesigners.unshift(designer)
      }
    },
    // 在搜索框里取消邀请了某名设计师
    onRecalled (designer) {
      this.invitedDesigners = this.invitedDesigners.filter(e => {
        return e.id !== designer.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card__header {
  position: relative;
  &-title {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
  }
  &-search {
    position: absolute;
    right: 16px;
    top: 12px;
    width: 210px;
  }
}
.card__content {
  padding: 16px 32px 0;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e9e9e9;
  &:last-child {
    border-bottom: none;
    margin-bottom: none;
  }
  &__info {
    flex: 1;
    overflow: hidden;
    margin-right: 24px;
  }
  &__time {
    margin-right: 100px;
  }
}
// 组件的样式
.el-pagination {
  padding: 16px 0;
  text-align: center;
}
.loader {
  padding: 24px 0;
}
</style>
