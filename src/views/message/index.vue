<i18n>
{
  "en": {
    "私信": "Direct Messages"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card">
      <h1
        v-t="'私信'"
        class="m0 p2 f-16 bold border-bottom" />
      <div
        v-loading="initing"
        v-infinite-scroll="onReachBottom"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="200"
        class="list">
        <thread-item
          v-for="thread in threads"
          :key="thread.id"
          :thread="thread"
          class="thread-item" />
        <my-loader
          :loading="loading"
          :error="error"
          :btn-text="$t('g.reload')"
          :on-reload="onReload" />
      </div>
    </div>
  </div>
</template>

<script>
import ThreadItem from './components/ThreadItem'
export default {
  components: { ThreadItem },
  data () {
    return {
      currentPage: 1,
      initing: true, // 是否正在初始化
      loading: false, // 是否滚动到底部后正在加载
      error: false, // 是否加载出错
      nomore: false
    }
  },
  computed: {
    threads () {
      return this.$store.getters.threads
    },
    busy () {
      return this.initing || this.loading || this.nomore || this.error
    }
  },
  created () {
    this.getThreads().then(() => {
      this.initing = false
    }).catch(() => {
      this.initing = false
      this.error = true
    })
  },
  methods: {
    getThreads () {
      return this.$store.dispatch('getThreads', this.currentPage)
        .then((pagination) => {
          this.currentPage = pagination.current_page
          this.nomore = pagination.total_pages <= pagination.current_page
        })
    },
    onReachBottom () {
      this.loading = true
      this.getThreads().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.error = true
      })
    },
    onReload () {
      this.error = false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 550px;
  margin: 0 auto;
  .list {
    min-height: 700px;
  }
  .thread-item {
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
  }
}
</style>
