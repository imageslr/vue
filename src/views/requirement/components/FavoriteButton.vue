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
import { favoriteReqById, unfavoriteReqById } from '@/api/requirement'
export default {
  props: {
    reqDetail: {
      type: Object,
      default () {
        return {
          id: undefined,
          is_favorite: false,
          favorite_num: 0
        }
      }
    }
  },
  methods: {
    onFavorite () {
      favoriteReqById(this.reqDetail.id).then(({ data: { favorite_num } }) => {
        this.reqDetail.is_favorite = true
        this.reqDetail.favorite_num = favorite_num
      })
    },
    onUnfavorite () {
      unfavoriteReqById(this.reqDetail.id).then(({ data: { favorite_num } }) => {
        this.reqDetail.is_favorite = false
        this.reqDetail.favorite_num = favorite_num
      })
    }
  }
}
</script>

<style>
</style>
