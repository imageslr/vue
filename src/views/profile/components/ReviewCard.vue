<i18n>
{
  "zh": {
    "noReviews": "暂未收到评价",
    "viewAll": "查看所有评价"
  },
  "en": {
    "noReviews": "No received reviews",
    "viewAll": "View all reviews"
  }
}
</i18n>

<template>
  <div class="card">
    <div
      v-for="(review, index) in reviews"
      v-if="index < 5"
      :key="review.id"
      class="review-item">
      <div class="review-item__user">
        <router-link :to="'/profile?uid=' + review.user.id">
          <my-avatar
            :avatar-url="review.user.avatar_url"
            class="review-item__user-avatar" />
        </router-link>
        <div class="review-item__user-info">
          <router-link
            :to="'/profile?uid=' + review.user.id"
            class="f-14 bold">{{ review.user.name }}</router-link>
          <el-rate
            v-model="review.score"
            :colors="['#00A0DC', '#00A0DC', '#00A0DC']"
            class="review-item__user-rate"
            disabled />
          <p
            v-t="review.created_at"
            class="m0 f-12 black-45" />
        </div>
      </div>
      <p
        v-t="review.content"
        class="m0 mt-4 f-12 black-45" />
    </div>
    <div class="center">
      <el-button
        v-if="reviews.length"
        type="text">{{ $t('viewAll') }} </el-button>
    </div>
    <p
      v-t="$t('noReviews')"
      v-if="!reviews.length"
      class="m0 p-12 f-12 black-45 center"/>
  </div>
</template>

<script>
import { getReceivedReviewsByUID } from '@/api/review'
export default {
  props: {
    uid: {
      type: String | Number,
      required: true
    }
  },
  data () {
    return {
      reviews: []
    }
  },
  created () {
    this.getReviews()
  },
  methods: {
    getReviews () {
      getReceivedReviewsByUID(this.uid).then(({ data: { reviews } }) => {
        this.reviews = reviews
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  & > div {
    border-top: 1px solid rgba(0, 0, 0, 0.15);
    &:first-child {
      border-top: none;
    }
  }
}
.review-item {
  padding: 10px 12px;
  &__user {
    display: flex;
    align-items: flex-start;
    &-avatar {
      width: 56px;
      height: 56px;
      margin-right: 8px;
      // border: none;
      // border-radius: 0;
      // box-shadow: none;
      // background: none;
    }
    &-rate /deep/ .el-rate__icon {
      margin-right: 0;
    }
  }
}
</style>
