<i18n>
{
  "zh": {
    "delete": "删除"
  },
  "en": {
    "delete": "Delete"
  }
}
</i18n>

<template>
  <div class="card activity-card">
    <div class="activity-card__header">
      <router-link :to="'/profile?uid=' + user.id">
        <avatar
          :avatar-url="user.avatar_url"
          class="activity-card__header-avatar"/>
      </router-link>
      <div class="activity-card__header-text">
        <router-link :to="'/profile?uid=' + user.id">
          <p class="m0 f-15 bold black inline-block">{{ user.real_name }}</p>
        </router-link>
        <p class="m0 f-13 bold black-65">{{ followerNum+' '+$t('g.follower') }}</p>
        <p class="m0 f-13 bold black-65">{{ $t('g.published_at') + ' ' + activity.created_at }}</p>
      </div>
      <template v-if="showActionButton">
        <el-dropdown
          v-if="isPublisher"
          trigger="click"
          @command="onClickCommand">
          <el-button
            type="text"
            class="activity-card__header-cancel-follow-button"
            icon="el-icon-arrow-down"/>
          <el-dropdown-menu
            slot="dropdown">
            <el-dropdown-item command="delete">{{ $t('delete') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          v-else-if="isFollowing"
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
          @click="onToggleFollow('follow')">{{ $t('g.follow') }}</el-button>
      </template>
    </div>
    <div class="activity-card__content">
      <p class="activity-card__content-text">{{ activity.content }}</p>
      <el-carousel
        v-if="activity.photo_urls.length"
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
    <div class="activity-card__action-btns">
      <el-button
        :class="{'is-liked': activity.is_liked}"
        type="text"
        @click="onToggleLike">{{ $t('g.like') + likeNumStr }}</el-button>
      <el-button type="text">{{ $t('g.comment') + commentNumStr }}</el-button>
    </div>
  </div>
</template>

<script>
import { followUserByUID, unfollowUserByUID } from '@/api/follow'
import { likeActivityById, unlikeActivityById, deleteActivityById } from '@/api/activity'
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
          is_liked: false,
          user: {
            id: '',
            avatar_url: '',
            real_name: '',
            follower_num: 0,
            is_following: false
          }
        }
      }
    },
    showActionButton: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      followBtnLoading: false,
      unfollowBtnLoading: false
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
    },
    isPublisher () {
      return this.$store.getters.uid === this.activity.user.id
    },
    isFollowing () {
      return this.activity.user.is_following
    }
  },
  methods: {
    onToggleLike () {
      const liked = this.activity.is_liked
      const fn = liked ? unlikeActivityById : likeActivityById
      fn(this.activity.id).then(({ data: { like_num } }) => {
        this.activity.is_liked = !liked
        this.activity.like_num = like_num
      })
    },
    onClickCommand (command) {
      if (command === 'unfollow') {
        this.onToggleFollow('unfollow')
      }
      if (command === 'delete') {
        deleteActivityById(this.activity.id).then(() => {
          this.$emit('deleted', this.activity)
        })
      }
    },
    onToggleFollow (action) {
      this[`${action}BtnLoading`] = true
      const fn = action === 'follow' ? followUserByUID : unfollowUserByUID
      fn(this.activity.user.id).then(() => {
        this[`${action}BtnLoading`] = false
        this.activity.user.is_following = action === 'follow'
      }).catch(() => {
        this[`${action}BtnLoading`] = false
      })
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
        height: 250px;
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
      color: #0077b5;
    }
    &:hover {
      color: #3392c4;
    }
  }
}
</style>
