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
        @deleted="onDeleted(index)"/>
    </transition-group>
    <my-preview
      :visible.sync="preview.visible"
      :src="preview.src"
      :width="preview.width" />
    <my-loader
      :loading="loading"
      :error="error"
      :btn-text="$t('loadmore')"
      :on-reload="onReload" />
    <p
      v-t="$t('g.nomore')"
      v-if="nomore"
      class="no-more"/>
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
      preview: {
        visible: false,
        src: '',
        width: '50%'
      },
      activities: [],
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
      let start = this.activities.length
      return this.getActivities(start).then(({ data }) => {
        this.loading = false
        const { activities } = data
        this.activities.push.apply(this.activities, activities)
        this.nomore = !activities.length
      }).catch(() => {
        this.error = true
        this.loading = false
      })
    },
    onReload () {
      this.error = false
    },
    onPreview (e) {
      if (e.target.tagName === 'IMG') {
        this.preview.visible = true
        this.preview.src = e.target.src
        this.preview.width = e.target.width + 'px'
      }
    },
    onDeleted (index) {
      this.activities.splice(index, 1)
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
