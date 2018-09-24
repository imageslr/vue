<i18n>
{
  "en": {
    "收到的评价": "Received Reviews",
    "暂未收到评价": "No received reviews",
    "查看所有评价": "View all reviews"
  }
}
</i18n>

<template>
  <div class="card review-card">
    <div
      v-for="(review, index) in reviews"
      v-if="index < 5"
      :key="review.id"
      class="review-item">
      <div class="review-item__user">
        <router-link :to="'/profile?uid=' + review.reviewer.id">
          <my-avatar
            :avatar-url="review.reviewer.avatar_url"
            class="review-item__user-avatar" />
        </router-link>
        <div class="review-item__user-info">
          <router-link
            :to="'/profile?uid=' + review.reviewer.id"
            class="f-14 bold">{{ review.reviewer.name }}</router-link>
          <span
            v-t="`g.${review.reviewer.type}`"
            class="f-14 black-45" />
          <p
            class="m0 f-12 black-45"
            v-text="review.created_at" />
        </div>
      </div>
      <p
        class="m0 mt-4 f-12 black-45"
        v-text="review.content" />
    </div>
    <el-button
      v-if="reviews.length"
      type="text"
      class="center w-100"
      @click="$emit('clickBtn')">{{ $t('查看所有评价') }} </el-button>
    <p
      v-t="$t('暂未收到评价')"
      v-if="!reviews.length"
      class="m0 p-12 f-12 black-45 center"/>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.review-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px 12px;
  &__user {
    display: flex;
    align-items: flex-start;
    &-avatar {
      width: 36px;
      height: 36px;
      margin-right: 8px;
    }
    &-rate /deep/ .el-rate__icon {
      margin-right: 0;
    }
  }
}
</style>
