<i18n>
{
  "zh": {
    "loadmore": "加载更多"
  },
  "en": {
    "loadmore": "Load more"
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
      <activity-card
        v-for="(activity, index) in activities"
        :activity="activity"
        :key="activity.id"
        :show-action-button="showActionButton"
        class="activity-card"
        @preview="onPreview"
        @follow="onToggleFollow($event, true)"
        @unfollow="onToggleFollow($event, false)"
        @deleted="onDeleted(index)"/>
    </transition-group>
    <my-loader
      :loading="loading"
      :error="error"
      :btn-text="$t('loadmore')"
      :on-reload="onReload" />
    <p
      v-t="$t('g.nomore')"
      v-if="nomore"
      class="no-more"/>
    <my-multi-preview ref="preview"/>
  </div>
</template>

<script>
import ActivityCard from './ActivityCard'
export default {
  components: { ActivityCard },
  props: {
    showActionButton: {
      type: Boolean,
      default: false
    },
    getActivities: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      activities: [],
      currentPage: 0,
      loading: false,
      nomore: false,
      error: false // 标记上次加载是不是出错了，防止网络错误加载失败时不停地触发事件
    }
  },
  computed: {
    busy () {
      return this.loading || this.nomore || this.error
    }
  },
  methods: {
    onReachBottom () {
      this.loading = true
      return this.getActivities(this.currentPage + 1).then(({ data }) => {
        let { data: activities, meta: { pagination } } = data
        this.loading = false
        this.activities.push.apply(this.activities, activities)
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
    onPreview (e) {
      this.$refs.preview.open(e.urls, e.index)
    },
    onDeleted (index) {
      this.activities.splice(index, 1)
    },
    onToggleFollow (uid, following) {
      this.activities.forEach(({ user }) => {
        if (user.id === uid) {
          user.following = following
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.activity-card {
  margin-bottom: 8px;
}
.no-more {
  margin: 16px 0 0;
  text-align: center;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
