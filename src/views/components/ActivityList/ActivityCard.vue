<i18n>
{
  "en": {
    "确认删除该动态？": "Is it confirmed to delete the activity?",
    "删除": "Delete"
  }
}
</i18n>

<template>
  <div class="card activity-card">
    <div class="activity-card__header">
      <router-link :to="'/profile?uid=' + user.id">
        <my-avatar
          :avatar-url="user.avatar_url"
          class="activity-card__header-avatar"/>
      </router-link>
      <div class="activity-card__header-text">
        <router-link :to="'/profile?uid=' + user.id">
          <p class="m0 f-15 bold black inline-block">{{ user.name }}</p>
        </router-link>
        <p class="m0 f-13 bold black-65">{{ splittedFollowerCount +' '+$t('g.follower') }}</p>
        <p class="m0 f-13 bold black-65">{{ $t('g.published_at') + ' ' + activity.created_at }}</p>
      </div>
      <template v-if="showActionButton">
        <el-dropdown
          v-if="$uid() == user.id"
          trigger="click"
          @command="onClickCommand">
          <el-button
            type="text"
            class="activity-card__header-cancel-follow-button"
            icon="el-icon-arrow-down"/>
          <el-dropdown-menu
            slot="dropdown">
            <el-dropdown-item command="delete">{{ $t('删除') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          v-else-if="user.following"
          trigger="click"
          @command="onClickCommand">
          <el-button
            type="text"
            class="activity-card__header-cancel-follow-button"
            icon="el-icon-arrow-down"/>
          <el-dropdown-menu
            slot="dropdown">
            <el-dropdown-item command="unfollow">{{ $t('g.cancelFollow') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          v-else
          :loading="followBtnLoading"
          plain
          round
          type="primary"
          class="activity-card__header-follow-button"
          size="small"
          @click="onFollow">{{ $t('g.follow') }}</el-button>
      </template>
    </div>
    <div class="activity-card__content">
      <p class="activity-card__content-text">{{ activity.content }}</p>
      <el-carousel
        v-if="activity.photo_urls.length"
        :autoplay="false"
        class="activity-card__content-carousel"
        trigger="click"
        height="250px">
        <el-carousel-item
          v-for="(photo, index) in activity.photo_urls"
          :key="photo"
          @click.native="$emit('preview', {urls: activity.photo_urls, index})">
          <img
            :src="photo"
            class="activity-card__content-carousel-item">
        </el-carousel-item>
      </el-carousel>
      <p/>
    </div>
    <my-divider/>
    <div class="activity-card__action-btns">
      <el-button
        :class="{'is-liked': activity.liked}"
        type="text"
        @click="onToggleLike">{{ $t('g.like') + likeCountStr }}</el-button>
      <el-button
        type="text"
        @click="showReplyList = !showReplyList">{{ $t('g.comment') + replyCountStr }}</el-button>
    </div>
    <reply-list
      v-if="showReplyList"
      :activity="activity"
      class="activity-card__reply-list" />
  </div>
</template>

<script>
import ReplyList from './ReplyList'
import { likeActivityById, unlikeActivityById, deleteActivityById } from '@/api/activity'
import { splitNumber } from '@/utils'
export default {
  components: { ReplyList },
  props: {
    activity: {
      type: Object,
      default () {
        return {
          id: 0,
          content: '',
          photo_urls: [],
          like_count: 0,
          reply_count: 0,
          created_at: '',
          liked: false,
          user: {
            id: '',
            avatar_url: '',
            name: '',
            follower_count: 0,
            following: false
          }
        }
      }
    },
    // 是否显示右上角的操作按钮：关注、取消关注或删除
    showActionButton: {
      type: Boolean,
      default: false
    },
    // 默认是否显示评论列表
    defaultShowReplyList: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      followBtnLoading: false,
      unfollowBtnLoading: false,
      showReplyList: false
    }
  },
  computed: {
    user () {
      return this.activity.user
    },
    splittedFollowerCount () {
      return splitNumber(this.activity.user.follower_count)
    },
    likeCountStr () {
      return this.activity.like_count ? ` (${this.activity.like_count})` : ''
    },
    replyCountStr () {
      return this.activity.reply_count ? ` (${this.activity.reply_count})` : ''
    }
  },
  created () {
    this.showReplyList = this.defaultShowReplyList
  },
  methods: {
    onToggleLike () {
      const liked = this.activity.liked
      const fn = liked ? unlikeActivityById : likeActivityById
      fn(this.activity.id).then(({ data: { like_count } }) => {
        this.activity.liked = !liked
        this.activity.like_count = like_count
      })
    },
    onFollow () {
      this.followBtnLoading = true
      this.$store.dispatch('FOLLOW', this.user.id).then(() => {
        this.followBtnLoading = false
        this.user.following = true
        this.user.follower_count++
        this.$emit('follow', this.user.id)
      }).catch(() => {
        this.followBtnLoading = false
      })
    },
    onUnfollow () {
      this.$store.dispatch('UNFOLLOW', this.user.id).then(() => {
        this.activity.user.following = false
        this.user.follower_count--
        this.$emit('unfollow', this.user.id)
      })
    },
    onClickCommand (command) {
      if (command === 'unfollow') {
        this.onUnfollow()
      }
      if (command === 'delete') {
        this.$confirm(this.$t('确认删除该动态？'), this.$t('g.notice'), {
          confirmButtonText: this.$t('g.confirmBtn'),
          cancelButtonText: this.$t('g.cancelBtn'),
          type: 'warning'
        }).then(() => {
          deleteActivityById(this.activity.id).then(() => {
            this.$emit('deleted', this.activity)
            this.$message.success(this.$t('g.successfullyDeleted'))
          })
        }).catch(() => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-card {
  padding: 16px 16px 0;
  &__header {
    display: flex;
    align-items: flex-start;
    &-avatar {
      width: 48px;
      height: 48px;
    }
    &-text {
      flex: 1;
      margin-left: 8px;
    }
    &-cancel-follow-button {
      padding-top: 0;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  &__content {
    &-text {
      margin: 8px 0;
      font-size: 15px;
      line-height: 21px;
    }
    &-carousel {
      &-item {
        // height: 250px;
        width: 100%;
        cursor: pointer;
      }
      /deep/ .el-carousel__indicators {
        width: 100%;
        text-align: center;
      }
    }
    .el-carousel__item {
      text-align: center;
    }
  }
  &__action-btns .el-button {
    color: rgba(0, 0, 0, 0.65);
    &.is-liked {
      color: #29b2fe;
    }
    &:hover {
      color: #3392c4;
    }
  }
  &__reply-list {
    // 撑满宽度
    margin-left: -16px;
    margin-right: -16px;
  }
}
</style>
