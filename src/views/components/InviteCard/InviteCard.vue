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
    <h1 class="card__header">
      {{ $t('header') }}
      <el-input
        :placeholder="$t('searchPlaceholder')"
        suffix-icon="el-icon-search"
        size="small"
        class="card__header-search"
        @click.native="searchDialogVisible = true"/>
    </h1>
    <div class="card__content">
      <alert
        :title="$t('alertText', { num: totalInvitedNum })"
        type="info" />
      <empty v-if="!invitedDesigners.length" />
      <transition-group
        v-else
        tag="div"
        name="fade"
        class="list pt1 pb2">
        <div
          v-for="(designer, index) in invitedDesigners"
          :key="designer.id"
          class="list-item">
          <router-link :to="'/profile?uid=' + designer.id">
            <avatar
              :avatar-url="designer.avatar_url"
              class="list-item__avatar"/>
          </router-link>
          <div class="list-item__info">
            <p class="m0 mb-4 bold f-14">
              <router-link
                :to="'/profile?uid=' + designer.id"
                class="black-85">{{ designer.real_name }}</router-link>
              <span
                v-t="designer.title"
                class="ml1 black-45" />
            </p>
            <p
              v-t="designer.introduction"
              class="m0 f-14 black-45 ellipsis-1" />
          </div>
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
    </div>
    <search-dialog
      :visible.sync="searchDialogVisible"
      @invited="onInvited"
      @recalled="onRecalled"/>
  </div>
</template>

<script>
import { getInvitedDesignersByReqId, recall } from '@/api/requirement'
import SearchDialog from './SearchDialog'
export default {
  components: { SearchDialog },
  props: {
    // 需求id
    reqId: {
      type: String | Number,
      default: null
    }
  },
  data () {
    return {
      totalInvitedNum: 0,
      invitedDesigners: [],
      searchDialogVisible: false
    }
  },
  created () {
    this.getInvitedDesigners()
  },
  methods: {
    getInvitedDesigners () {
      getInvitedDesignersByReqId(this.reqId).then(({ data }) => {
        this.totalInvitedNum = data.total
        this.invitedDesigners = this.invitedDesigners.concat(data.users)
      })
    },
    onRecall (index) {
      const { reqId, invitedDesigners } = this
      const uid = invitedDesigners[index].id
      recall(reqId, uid).then(() => {
        this.invitedDesigners.splice(index, 1)
      })
    },
    // 在搜索框里邀请了某名设计师
    onInvited (designer) {
      this.invitedDesigners.unshift(designer)
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
  &__avatar {
    width: 48px;
    height: 48px;
    margin-right: 24px;
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
</style>
