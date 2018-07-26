<i18n>
{
  "zh": {
    "favorite": "收藏",
    "unfavorite": "已收藏"
  },
  "en": {
    "favorite": "Favorite",
    "unfavorite": "Unfavorite"
  }
}
</i18n>

<template>
  <el-button
    v-if="reqDetail.is_favorite"
    icon="el-icon-star-off"
    size="mini"
    @click="onUnfavorite"
  >{{ $t('unfavorite') }} ({{ reqDetail.favorite_num }})</el-button>
  <el-button
    v-else
    icon="el-icon-star-off"
    size="mini"
    @click="onFavorite"
  >{{ $t('favorite') }} ({{ reqDetail.favorite_num }})</el-button>
</template>

<script>
import Requirement from '@/models/requirement'
import { favoriteReqById, unfavoriteReqById } from '@/api/requirement'
export default {
  props: {
    reqDetail: {
      type: Object,
      default () {
        return Requirement.parse()
      }
    }
  },
  methods: {
    onFavorite () {
      favoriteReqById(this.reqDetail.id).then(({ data: { favorite_num } }) => {
        this.$emit('update:reqDetail', { ...this.reqDetail, is_favorite: true, favorite_num })
      })
    },
    onUnfavorite () {
      unfavoriteReqById(this.reqDetail.id).then(({ data: { favorite_num } }) => {
        this.$emit('update:reqDetail', { ...this.reqDetail, is_favorite: false, favorite_num })
      })
    }
  }
}
</script>

<style>
</style>
