<i18n>
{
  "zh": {
    "inviteCountAlert": "已选择 {num} 人"
  },
  "en": {
    "邀请设计师": "Invite designers",
    "邀请时间": "Invited at",
    "邀请": "Invite",
    "取消邀请": "Cancel invite",
    "搜索设计师": "Search designers",
    "搜索你想要邀请的设计师": "Search designers to invite",
    "inviteCountAlert": "Has selected {num} people"
  }
}
</i18n>

<template>
  <div class="card">
    <div class="card__header">
      <h1 class="card__header-title">{{ $t('邀请设计师') }}</h1>
      <el-input
        :placeholder="$t('搜索你想要邀请的设计师')"
        suffix-icon="el-icon-search"
        size="small"
        class="card__header-search"
        @click.native="onShowDialog"/>
    </div>
    <div class="card__content">
      <my-alert
        :title="$t('inviteCountAlert', { num: invitedDesigners.length })"
        type="info" />
      <my-empty v-if="!invitedDesigners.length" />
      <transition-group
        v-else
        tag="div"
        name="fade-transform-x"
        class="user-list pt1 pb2">
        <div
          v-for="(user) in invitedDesigners"
          :key="user.id"
          class="user-list-item">
          <router-link :to="'/profile?uid=' + user.id">
            <my-avatar
              :avatar-url="user.avatar_url"
              class="user-list-item__avatar"/>
          </router-link>
          <div class="user-list-item__info">
            <router-link
              :to="'/profile?uid=' + user.id"
              class="bold black-85">{{ user.name }}</router-link>
            <p>
              <span class="color-primary">{{ $t('关注') }}</span>
              <span v-text="user.following_count" />
              <span class="color-primary">{{ $t('粉丝') }}</span>
              <span v-text="user.follower_count" />
            </p>
            <p v-text="user.title" />
            <p v-text="user.introduction" />
            <div class="mt1">
              <el-tag
                v-for="field in user.professional_fields"
                :key="field"
                size="mini"
                type="info"
                class="mr1">{{ field }}</el-tag>
            </div>
          </div>
          <el-button
            plain
            size="small"
            @click="onCancel(user)">{{ $t('取消邀请') }}</el-button>
        </div>
      </transition-group>
    </div>
    <el-dialog
      :visible.sync="dialog.visible"
      :title="$t('搜索设计师')" >
      <el-input
        ref="searchInput"
        :placeholder="$t('搜索你想要邀请的设计师')"
        v-model="dialog.searchText"
        suffix-icon="el-icon-search"
        size="small"
        @input="onSearch"/>
      <div>
        <my-loader
          v-if="dialog.loading"
          :loading="dialog.loading"/>
        <template v-else>
          <my-empty v-if="!dialog.designers.length"/>
          <template v-else>
            <div class="user-list">
              <div
                v-for="(user, index) in dialog.designers"
                :key="user.id"
                class="user-list-item">
                <router-link :to="'/profile?uid=' + user.id">
                  <my-avatar
                    :avatar-url="user.avatar_url"
                    class="user-list-item__avatar"/>
                </router-link>
                <div class="user-list-item__info">
                  <router-link
                    :to="'/profile?uid=' + user.id"
                    class="bold black-85">{{ user.name }}</router-link>
                  <p>
                    <span class="color-primary">{{ $t('g.following') }}</span>
                    <span v-text="user.following_count" />
                    <span class="color-primary">{{ $t('g.fans') }}</span>
                    <span v-text="user.follower_count" />
                  </p>
                  <p v-text="user.title" />
                  <p v-text="user.introduction" />
                  <div class="mt1">
                    <el-tag
                      v-for="field in user.professional_fields"
                      :key="field"
                      size="mini"
                      type="info"
                      class="mr1">{{ field }}</el-tag>
                  </div>
                </div>
                <el-button
                  v-if="user.invited"
                  plain
                  type="info"
                  size="mini"
                  @click="onCancel(user)">{{ $t('取消邀请') }}</el-button>
                <el-button
                  v-else
                  plain
                  type="primary"
                  size="mini"
                  @click="onInvite(index)">{{ $t('邀请') }}</el-button>
              </div>
            </div>
            <el-pagination
              :current-page.sync="dialog.currentPage"
              :total="dialog.total"
              :page-size="20"
              class="mt2 center"
              background
              layout="prev, pager, next"
              @current-change="fetchDesigners"/>
          </template>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { searchDesigners } from '@/api/user'
import _ from '@/utils/lodash'

var FETCHED_DESIGHERS = false // 在点开搜索框时搜索一次全部设计师

export default {
  data () {
    return {
      invitedDesigners: [],
      dialog: {
        searchText: '',
        loading: false,
        designers: [], // {invited: 是否被选择}
        total: 0,
        currentPage: 2,
        visible: false
      }
    }
  },
  methods: {
    fetchDesigners (page = 1) {
      const { dialog } = this
      dialog.loading = true
      searchDesigners(dialog.searchText, page)
        .then(({ data: { data: designers, meta: { pagination } } }) => {
          dialog.loading = false
          dialog.designers = designers
          dialog.total = pagination.total

          // 设置invited属性
          dialog.designers.forEach(v => {
            v.invited = this.isInvited(v)
          })
        }).catch(() => {
          dialog.loading = false
        })
    },
    onShowDialog () {
      this.dialog.visible = true
      this.$nextTick(() => this.$refs.searchInput.focus())
      if (!FETCHED_DESIGHERS) {
        FETCHED_DESIGHERS = true
        this.fetchDesigners()
      }
    },
    onSearch: _.debounce(function () {
      this.fetchDesigners()
      this.dialog.currentPage = 1
    }, 500),
    onInvite (index) {
      const designer = this.dialog.designers[index]
      designer.invited = true
      this.invitedDesigners.unshift(designer)
    },
    onCancel (designer) {
      this.invitedDesigners = this.invitedDesigners.filter(e => {
        return e.id !== designer.id
      })
      this.dialog.designers.some(v => {
        if (v.id === designer.id) {
          designer.invited = false
          return true
        } else {
          return false
        }
      })
    },
    isInvited (designer) {
      return this.invitedDesigners.some(v => v.id === designer.id)
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
</style>
