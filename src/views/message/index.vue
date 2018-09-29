<i18n>
{
  "en": {
    "私信": "Direct Messages",
    "加载更多": "Load more"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card">
      <h1
        v-t="'私信'"
        class="m0 p2 f-16 bold border-bottom" />
      <div class="chatbox-container">
        <div
          v-loading="initing"
          class="thread-list">
          <my-empty v-if="nodata"/>
          <thread-item
            v-for="thread in threads"
            :key="thread.id"
            :thread="thread"
            :class="{'is-active': thread.id == currentThreadId}"
            class="thread-list-item"
            @click.native="currentThreadId = thread.id" />
          <my-loader
            :loading="loading"
            :error="error"
            :btn-text="$t('g.reload')"
            :on-reload="onReload" />
          <el-button
            v-if="!busy"
            type="text"
            size="mini"
            class="w-100 mt-12 center"
            @click="onLoadMore">{{ $t('加载更多') }}</el-button>
        </div>
        <chat
          v-if="currentThreadId"
          :thread-id="currentThreadId"
          class="chat" />
      </div>
    </div>
  </div>
</template>

<script>
import ThreadItem from './components/ThreadItem'
import Chat from './Chat'
export default {
  components: { ThreadItem, Chat },
  data () {
    return {
      currentPage: 0,
      currentThreadId: null,
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
    },
    nodata () {
      return !this.initing && !this.loading && !this.threads.length
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
      return this.$store.dispatch('getThreads', this.currentPage + 1)
        .then((pagination) => {
          this.currentPage = pagination.current_page
          this.nomore = pagination.total_pages <= pagination.current_page
        })
    },
    onLoadMore () {
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
  width: 800px;
  margin: 0 auto;
  .chatbox-container {
    height: 500px;
    .thread-list {
      float: left;
      width: 300px;
      height: 100%;
      overflow-y: scroll;
    }
    .chat {
      float: right;
      width: 500px;
      height: 100%;
    }
  }
  .thread-list-item {
    border-bottom: 1px solid #f2f2f2;
    cursor: pointer;
    &:hover,
    &.is-active {
      background-color: #f2f2f2;
    }
  }
}
</style>
