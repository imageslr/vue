<template>
  <div>
    <activity-card
      :activity="activity"
      default-show-reply-list
      style="margin: 24px auto; width: 600px;"
      @preview="onPreview" />
    <my-multi-preview ref="preview"/>
  </div>
</template>

<script>
import ActivityCard from '@/views/components/ActivityList/ActivityCard'
import { getActivityById } from '@/api/activity'
export default {
  components: { ActivityCard },
  data () {
    return {
      activity: {
        id: 0,
        content: '加载中',
        photo_urls: [],
        like_count: 0,
        reply_count: 0,
        created_at: '',
        liked: false,
        user: {
          id: 0,
          avatar_url: '',
          name: '加载中',
          follower_count: 0,
          following: false
        }
      }
    }
  },
  created () {
    this.activity.id = parseInt(this.$route.params.id) // 评论列表组件需要使用
    getActivityById(this.$route.params.id).then(({ data }) => {
      this.activity = data
    })
  },
  methods: {
    onPreview (e) {
      this.$refs.preview.open(e.urls, e.index)
    }
  }
}
</script>

<style>
</style>
