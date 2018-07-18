<template>
  <div class="card activity-card">
    <div class="activity-card__header">
      <avatar
        :avatar-url="user.avatar_url"
        class="activity-card__header-avatar"/>
      <div class="activity-card__header-text">
        <p class="m0 f-15 bold">{{ user.real_name }}</p>
        <p class="m0 f-13 bold black-60">{{ followerNum+' '+$t('words.follower') }}</p>
        <p class="m0 f-13 bold black-60">{{ $t('words.published_at') + ' ' + activity.created_at }}</p>
      </div>
      <el-button
        v-if="showFollowButton && !user._is_following"
        class="activity-card__header-follow-button"
        size="small">{{ $t('words.follow') }}</el-button>
      <el-dropdown
        v-if="showFollowButton && user._is_following"
        trigger="click">
        <el-button
          type="text"
          class="cancel-follow-button"
          icon="el-icon-arrow-down"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{ $t('words.cancelFollow') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="activity-card__content">
      <p class="activity-card__content-text">{{ activity.content }}</p>
      <el-carousel
        :autoplay="false"
        class="activity-card__content-carousel"
        trigger="click"
        height="250px"
        @click.native="$emit('preview', $event)">
        <el-carousel-item
          v-for="photo in activity.photo_urls"
          :key="photo">
          <img
            :src="photo"
            class="activity-card__content-carousel-item">
        </el-carousel-item>
      </el-carousel>
      <p/>
    </div>
    <divider/>
    <div>
      <el-button
        :class="{'is-liked': activity._is_liked}"
        type="text">{{ $t('words.like') + likeNumStr }}</el-button>
      <el-button type="text">{{ $t('words.comment') + commentNumStr }}</el-button>
    </div>
  </div>
</template>

<script>
import { splitNumber } from '@/utils'
export default {
  props: {
    activity: {
      type: Object,
      default () {
        return {
          id: 0,
          created_at: '',
          content: '',
          photo_urls: [],
          like_num: 0,
          comment_num: 0,
          _is_liked: false,
          user: {
            avatar_url: '',
            real_name: '',
            follower_num: 0,
            _is_following: false
          }
        }
      }
    },
    showFollowButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    user () {
      return this.activity.user
    },
    followerNum () {
      return splitNumber(this.activity.user.follower_num)
    },
    likeNumStr () {
      return this.activity.like_num ? ` (${this.activity.like_num})` : ''
    },
    commentNumStr () {
      return this.activity.comment_num ? ` (${this.activity.comment_num})` : ''
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
  }
  &__content {
    &-text {
      margin: 8px 0;
      font-size: 15px;
      line-height: 21px;
    }
    &-carousel {
      &-item {
        height: 250px;
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
  .el-button {
    color: rgba(0, 0, 0, 0.6);
    &.is-liked {
      color: #0077b5;
    }
    &:hover {
      color: #3392c4;
    }
  }
}
.cancel-follow-button {
  padding-top: 0;
  color: rgba(0, 0, 0, 0.6);
}
</style>
