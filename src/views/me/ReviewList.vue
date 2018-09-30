<i18n>
{
  "en": {
    "我收到的评价": "Received Reviews",
    "我发表的评价": "Posted Reviews",
    "确认删除该评价？": "Is it confirmed to delete the review?",
    "您还未收到用户评价": "You have not received review yet",
    "您还未发表过评价": "You have not posted review yet",
    "您可以邀请用户发表评价，这些评价将展示在您的个人主页上": "You can invite users to post reviews that will appear on your profile.",
    "其他用户可以邀请您评价，您的评价将展示在他们的个人主页上": "Other users can invite you to review and your reviews will appear on their profile",
    "立即邀请": "Invite now",
    "我的评价": "My review",

    "取消置顶": "Unstick",
    "置顶": "Stick"
  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="type === 'received' ? '我收到的评价' : '我发表的评价'"
      class="mt0" />
    <my-loader
      v-if="loading || error"
      :loading="loading"
      :error="error"
      :btn-text="$t('g.reload')"
      :on-reload="getReviews" />
    <my-empty-page-template
      v-else-if="!reviews.length"
      :title="$t(type === 'received' ? '您还未收到用户评价' : '您还未发表过评价')">
      <p
        v-if="type === 'received'"
        class="f-16 black-65">
        {{ $t('您可以邀请用户发表评价，这些评价将展示在您的个人主页上') }}
        <router-link to="/me/review/invite">
          <el-button
            style="padding-bottom: 0; font-size: 16px"
            type="text">{{ $t('立即邀请') }}</el-button>
        </router-link>
      </p>
      <p
        v-t="'其他用户可以邀请您评价，您的评价将展示在他们的个人主页上'"
        v-else
        class="f-16 black-65" />
    </my-empty-page-template>
    <div
      v-else
      class="user-list">
      <user-list-item
        v-for="review in reviews"
        :user="type === 'received' ? review.reviewer : review.user"
        :key="review.id">
        <p
          v-if="type === 'received'"
          slot="content"
          v-text="review.content" />
        <p
          v-else
          slot="content">{{ $t('我的评价') }}：{{ review.content }}</p>
        <div slot="action">
          <el-button
            v-if="type === 'received'"
            type="text"
            size="small"
            @click="onToggleStick(review)">
            {{ review.order_id == 1 ? $t('取消置顶') : $t('置顶') }}
          </el-button>
          <el-button
            :loading="deletings[review.id]"
            type="text"
            size="small"
            @click="onDelete(review.id)">
            {{ $t('g.delete') }}
          </el-button>
        </div>
      </user-list-item>
      <el-pagination
        :current-page.sync="currentPage"
        :page-count="pageCount"
        background
        layout="prev, pager, next"
        class="mt2 center"
        @current-change="onChangePage"/>
    </div>
  </div>
</template>

<script>
import UserListItem from '@/views/components/UserListItem'
import {
  getReceivedReviewsByUID,
  getPostedReviewsByUID,
  deleteReviewById,
  stickReviewById,
  unstickReviewById
} from '@/api/review'
export default {
  components: { UserListItem },
  data () {
    return {
      reviews: [],
      pageCount: 1,
      currentPage: 1,
      loading: false,
      error: false,
      deletings: {}
    }
  },
  computed: {
    type () {
      return this.$route.params.type
    }
  },
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    this.getReviews()
  },
  methods: {
    getReviews () {
      this.loading = true
      this.error = false
      const { currentPage } = this
      const fetch = this.type === 'received' ? getReceivedReviewsByUID : getPostedReviewsByUID
      fetch(this.$uid(), currentPage)
        .then(({ data: { data: reviews, meta: { pagination } } }) => {
          this.loading = false
          this.reviews = reviews
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
          this.error = true
        })
    },
    onDelete (id) {
      this.$confirm(this.$t('确认删除该评价？'), this.$t('g.notice'), {
        confirmButtonText: this.$t('g.confirmBtn'),
        cancelButtonText: this.$t('g.cancelBtn'),
        type: 'warning'
      }).then(() => {
        if (this.deletings[id]) return
        this.$set(this.deletings, id, true)
        deleteReviewById(id).then(() => {
          this.deletings[id] = false
          this.reviews = this.reviews.filter(v => v.id !== id)
          this.$message.success(this.$t('g.successfullyDeleted'))
        }).catch(() => {
          this.deletings[id] = false
        })
      }).catch(() => {})
    },
    onToggleStick (review) {
      const fn = review.order_id ? unstickReviewById : stickReviewById
      fn(review.id).then(({ data }) => {
        this.reviews = this.reviews.map(v => {
          if (v.id === data.id) return data
          else return v
        })
        this.$message.success(this.$t('g.successfulOperation'))
      }).catch(() => {})
    },
    onChangePage (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          p: page
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 24px 32px;
}
</style>
