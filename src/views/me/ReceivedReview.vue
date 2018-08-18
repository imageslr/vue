<i18n>
{
  "en": {
    "我收到的用户评价": "Received User Reviews",
    "确认删除该评价？": "Is it confirmed to delete the review?"
  }
}
</i18n>

<template>
  <div class="container">
    <h2
      v-t="'我收到的用户评价'"
      class="mt0" />
    <my-loader
      v-if="loading || error"
      :loading="loading"
      :error="error"
      :btn-text="$t('g.reload')"
      :on-reload="getReviews" />
    <my-empty v-else-if="!reviews.length" />
    <div
      v-else
      class="user-list">
      <user-list-item
        v-for="(review, index) in reviews"
        :user="review.reviewer"
        :key="review.id">
        <p
          slot="content"
          v-text="review.content" />
        <el-button
          slot="action"
          :loading="deletings[review.id]"
          type="text"
          size="small"
          @click="onDelete(index)">
          {{ $t('g.delete') }}
        </el-button>
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
import { getReceivedReviewsByUID, deleteReviewById } from '@/api/review'
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
  created () {
    if (this.$route.query.p) this.currentPage = parseInt(this.$route.query.p)
    this.getReviews()
  },
  methods: {
    onDelete (index) {
      this.$confirm(this.$t('确认删除该评价？'), this.$t('g.notice'), {
        confirmButtonText: this.$t('g.confirmBtn'),
        cancelButtonText: this.$t('g.cancelBtn'),
        type: 'warning'
      }).then(() => {
        const id = this.reviews[index].id
        if (this.deletings[id]) return
        this.$set(this.deletings, id, true)
        deleteReviewById(id).then(() => {
          this.deletings[id] = false
          this.reviews.splice(index, 1)
          this.$message.success(this.$t('g.successfullyDeleted'))
        }).catch(() => {
          this.deletings[id] = false
        })
      }).catch(() => {})
    },
    getReviews () {
      this.loading = true
      this.error = false
      const { currentPage } = this
      getReceivedReviewsByUID(this.$uid(), currentPage)
        .then(({ data: { data: reviews, meta: { pagination } } }) => {
          this.loading = false
          this.reviews = reviews
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
          this.error = true
        })
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
