<i18n>
{
  "en": {
    "标记所有通知为已读": "Mark all as read",
    "清空所有通知": "Delete all notifications",
    "标记成功": "Successfully marked all notifications as read"
  }
}
</i18n>

<template>
  <div class="container">
    <my-loader
      :loading="loading"
      :error="error"
      :btn-text="$t('g.reload')"
      :on-reload="getNotifications" />
    <template v-if="!loading && !error" >
      <template v-if="notifications.length">
        <div class="button-area">
          <el-button
            :loading="markButtonLoading"
            size="small"
            @click="markAllAsRead">{{ $t('标记所有通知为已读') }} </el-button>
            <!-- <el-button
            v-if="type === 'all'"
            :loading="deleteButtonLoading"
            size="small"
            @click="deleteAll">{{ $t('清空所有通知') }} </el-button> -->
        </div>
        <transition-group
          tag="div"
          name="fade">
          <notification-item
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
            class="notification-item" />
        </transition-group>
        <el-pagination
          :current-page="currentPage"
          :page-count="pageCount"
          style="text-align: center; padding: 16px 0;"
          background
          layout="prev, pager, next"
          @current-change="onCurrentPageChange"/>
      </template>
      <empty v-else />
    </template>
  </div>
</template>

<script>
import NotificationItem from './components/NotificationItem'
import Empty from './components/Empty'
export default {
  components: { NotificationItem, Empty },
  data () {
    return {
      pageCount: 0,
      loading: false,
      error: false,
      markButtonLoading: false,
      deleteButtonLoading: false
    }
  },
  computed: {
    notifications () {
      return this.$store.getters.notifications
    },
    type () {
      return this.$route.query.type || 'unread'
    },
    currentPage () {
      return parseInt(this.$route.query.p) || 1
    }
  },
  created () {
    this.getNotifications()
  },
  methods: {
    getNotifications () {
      this.error = false
      this.loading = true
      this.$store.dispatch('getNotifications', {
        type: this.type,
        page: this.currentPage
      })
        .then(pagination => {
          this.loading = false
          this.pageCount = pagination.total_pages
        }).catch(() => {
          this.loading = false
          this.error = true
        })
    },
    markAllAsRead () {
      this.markButtonLoading = true
      this.$store.dispatch('markAllAsRead').then(() => {
        this.markButtonLoading = false
        this.$message.success(this.$t('标记成功'))
      }).catch(() => {
        this.markButtonLoading = false
      })
    },
    deleteAll () {
      this.deleteButtonLoading = true
      this.$store.dispatch('deleteAllNotifications').then(() => {
        this.deleteButtonLoading = false
      }).catch(() => {
        this.deleteButtonLoading = false
      })
    },
    onCurrentPageChange (page) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: this.type,
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
  padding: 24px 40px;
}
.notification-item {
  width: 600px;
  margin-bottom: 16px;
}
.button-area {
  position: fixed;
  right: 60px;
  top: 76px;
}
</style>
