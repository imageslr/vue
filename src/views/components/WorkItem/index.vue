<template>
  <div class="work-card">
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
    <my-multi-preview ref="preview"/>
  </div>
</template>

<script>
import { splitNumber } from '@/utils'
export default {
  props: {
    work: {
      type: Object,
      default () {
        return {
          id: null,
          user: {}
        }
      }
    }
  },
  methods: {
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
  padding: 16px;
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
}
</style>
