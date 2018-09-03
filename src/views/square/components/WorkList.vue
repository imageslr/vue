<i18n>
{
  "en": {
    "加载更多": "Load more",
    "编辑": "Edit",
    "删除": "Delete",
    "确认删除该作品？": "Is it confirmed to delete the work?"
  }
}
</i18n>

<template>
  <div
    v-infinite-scroll="onReachBottom"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="200">
    <transition-group
      tag="div"
      name="fade-transform-y">
      <div
        v-for="(work, index) in works"
        :key="work.id"
        class="work-card">
        <div class="work-card__header">
          <router-link :to="'/profile?uid=' + work.user.id">
            <my-avatar
              :avatar-url="work.user.avatar_url"
              class="work-card__header-avatar"/>
          </router-link>
          <div class="work-card__header-text">
            <router-link :to="'/profile?uid=' + work.user.id">
              <p class="m0 f-15 bold black inline-block">{{ work.user.name }}</p>
            </router-link>
            <p class="m0 f-13 bold black-65">{{ splittedFollowerCount(work.user.follower_count) +' '+$t('g.follower') }}</p>
            <p class="m0 f-13 bold black-65">{{ $t('g.published_at') + ' ' + work.created_at }}</p>
          </div>
          <el-dropdown
            v-if="$uid() == work.user.id"
            trigger="click">
            <el-button
              type="text"
              class="work-card__header-dropdown"
              icon="el-icon-arrow-down"/>
            <el-dropdown-menu
              slot="dropdown">
              <el-dropdown-item @click.native="onEdit(index)">{{ $t('编辑') }}</el-dropdown-item>
              <el-dropdown-item @click.native="onDelete(index)">{{ $t('删除') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown
            v-else-if="work.user.following"
            trigger="click"
            @command="onUnfollow">
            <el-button
              type="text"
              class="work-card__header-dropdown"
              icon="el-icon-arrow-down"/>
            <el-dropdown-menu
              slot="dropdown">
              <el-dropdown-item :command="index">{{ $t('g.cancelFollow') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            v-else
            :loading="followLoadings[index]"
            plain
            round
            type="primary"
            class="work-card__header-follow-button"
            size="small"
            @click="onFollow(index)">{{ $t('g.follow') }}</el-button>
        </div>
        <div class="work-card__content">
          <el-carousel
            :autoplay="false"
            class="work-card__content-carousel"
            trigger="click">
            <el-carousel-item
              v-for="(photo, index) in work.photo_urls"
              :key="photo"
              @click.native="onPreview(work.photo_urls, index)">
              <img
                :src="photo"
                class="work-card__content-carousel-item">
            </el-carousel-item>
          </el-carousel>
          <div class="work-card__content-info">
            <p
              class="work-card__content-info-title"
              v-text="work.title" />
            <p
              class="work-card__content-info-description"
              v-text="work.description" />
          </div>
        </div>
        <div class="work-card__action-btn">
          <el-button
            :class="{'is-liked': work.liked}"
            type="text"
            @click="onToggleLike(index)">{{ likeCountStr(work.like_count) }}</el-button>
        </div>
      </div>
    </transition-group>
    <my-loader
      :loading="loading"
      :error="error"
      :btn-text="$t('加载更多')"
      :on-reload="onReload" />
    <p
      v-t="$t('g.nomore')"
      v-if="nomore"
      class="no-more"/>
    <my-multi-preview ref="preview"/>
  </div>
</template>

<script>
import { getWorks, deleteWorkById, likeWorkById, unlikeWorkById } from '@/api/work'
import { splitNumber } from '@/utils'
export default {
  data () {
    return {
      works: [],
      currentPage: 0,
      loading: false,
      nomore: false,
      error: false, // 标记上次加载是不是出错了，防止网络错误加载失败时不停地触发事件
      followLoadings: {}
    }
  },
  computed: {
    busy () {
      return this.loading || this.nomore || this.error
    }
  },
  methods: {
    likeCountStr (count) {
      return count ? `${this.$t('g.like')} (${count})` : this.$t('g.like')
    },
    onToggleLike (index) {
      const work = this.works[index]
      const liked = work.liked
      const fn = liked ? unlikeWorkById : likeWorkById
      fn(work.id).then(({ data: { like_count } }) => {
        work.liked = !liked
        work.like_count = like_count
      })
    },
    onReachBottom () {
      this.loading = true
      return getWorks(this.currentPage + 1).then(({ data }) => {
        let { data: works, meta: { pagination } } = data
        this.loading = false
        this.works.push.apply(this.works, works)
        this.currentPage = pagination.current_page
        this.nomore = pagination.total_pages <= pagination.current_page
      }).catch(() => {
        this.error = true
        this.loading = false
      })
    },
    onReload () {
      this.error = false
    },
    onFollow (index) {
      if (this.followLoadings[index]) return
      this.$set(this.followLoadings, index, true)
      let user = this.works[index].user
      console.log('user', user)
      this.$store.dispatch('FOLLOW', user.id).then(() => {
        this.followLoadings[index] = false
        this.works.forEach(({ user: v }) => {
          if (v.id === user.id) {
            v.following = true
            v.follower_count++
          }
        })
      }).catch(() => {
        this.followLoadings[index] = false
      })
    },
    onUnfollow (index) {
      let user = this.works[index].user
      this.$store.dispatch('UNFOLLOW', user.id).then(() => {
        this.works.forEach(({ user: v }) => {
          if (v.id === user.id) {
            v.following = false
            v.follower_count--
          }
        })
      })
    },
    onEdit (index) {
      const { id } = this.works[index]
      this.$router.push(`/work/${id}/edit`)
    },
    onDelete (index) {
      this.$confirm(this.$t('确认删除该作品？'), this.$t('g.notice'), {
        confirmButtonText: this.$t('g.confirmBtn'),
        cancelButtonText: this.$t('g.cancelBtn'),
        type: 'warning'
      }).then(() => {
        deleteWorkById(this.works[index].id).then(() => {
          this.works.splice(index, 1)
          this.$message.success(this.$t('g.successfullyDeleted'))
        })
      }).catch(() => {})
    },
    onPreview (urls, index) {
      this.$refs.preview.open(urls, index)
    },
    splittedFollowerCount (count) {
      return splitNumber(count)
    }
  }
}
</script>

<style lang="scss" scoped>
.work-card {
  padding: 16px 16px 0;
  margin-bottom: 16px;
  box-shadow: none;
  border: 1px solid rgba($color: #000000, $alpha: 0.1);
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
    &-dropdown {
      padding-top: 0;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  &__content {
    display: flex;
    align-items: flex-start;
    margin-top: 8px;
    &-carousel {
      flex: 1;
      &-item {
        width: 100%;
        cursor: pointer;
      }
    }
    &-info {
      width: 200px;
      padding: 0 16px;
      &-title {
        margin: 0 0 12px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
      }
      &-description {
        margin: 0;
        font-size: 14px;
        line-height: 1.71em;
        white-space: pre-wrap;
        word-wrap: break-word;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  &__action-btn .el-button {
    color: rgba(0, 0, 0, 0.65);
    &.is-liked {
      color: #0077b5;
    }
    &:hover {
      color: #3392c4;
    }
  }
}
.no-more {
  margin: 16px 0 0;
  text-align: center;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
