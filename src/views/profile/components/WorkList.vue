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
        class="card work-card">
        <el-dropdown
          v-if="isCurrentUser"
          class="work-card__dropdown"
          trigger="click">
          <el-button
            type="text"
            icon="el-icon-arrow-down"/>
          <el-dropdown-menu
            slot="dropdown">
            <el-dropdown-item @click.native="onEdit(index)">{{ $t('编辑') }}</el-dropdown-item>
            <el-dropdown-item @click.native="onDelete(index)">{{ $t('删除') }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-carousel
          :autoplay="false"
          class="work-card__carousel"
          trigger="click">
          <el-carousel-item
            v-for="(photo, index) in work.photo_urls"
            :key="photo"
            @click.native="onPreview(work.photo_urls, index)">
            <img
              :src="photo"
              class="work-card__carousel-item">
          </el-carousel-item>
        </el-carousel>
        <div class="work-card__info">
          <p
            class="work-card__info-title"
            v-text="work.title" />
          <p
            class="work-card__info-description"
            v-text="work.description" />
          <el-button
            :class="{'is-liked': work.liked}"
            type="text"
            class="work-card__info-like-btn"
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
import { getWorksByUID, deleteWorkById, likeWorkById, unlikeWorkById } from '@/api/work'
export default {
  data () {
    return {
      works: [],
      currentPage: 0,
      loading: false,
      nomore: false,
      error: false // 标记上次加载是不是出错了，防止网络错误加载失败时不停地触发事件
    }
  },
  computed: {
    busy () {
      return this.loading || this.nomore || this.error
    },
    pageUID () {
      return this.$route.query.uid || this.$uid()
    },
    isCurrentUser () {
      return this.pageUID == this.$uid() // eslint-disable-line
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
      return getWorksByUID(this.pageUID, this.currentPage + 1).then(({ data }) => {
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
    onPreview (urls, index) {
      this.$refs.preview.open(urls, index)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.work-card {
  position: relative;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  &__dropdown {
    position: absolute;
    right: 12px;
    top: 12px;
    .el-button {
      padding-top: 0;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  &__carousel {
    flex: 1;
    height: 300px;
    &-item {
      width: 100%;
      cursor: pointer;
    }
  }
  &__info {
    width: 250px;
    padding: 16px;
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
    &-like-btn {
      color: rgba(0, 0, 0, 0.65);
      &.is-liked {
        color: #0077b5;
      }
      &:hover {
        color: #3392c4;
      }
    }
  }
}
.preview-dialog {
  .el-carousel__item {
    text-align: center;
    img {
      height: 100%;
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
