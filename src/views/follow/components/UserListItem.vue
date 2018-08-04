<template>
  <div
    class="list-item">
    <router-link :to="'/profile?uid=' + user.id">
      <my-avatar
        :avatar-url="user.avatar_url"
        class="list-item__avatar"/>
    </router-link>
    <div class="list-item__info">
      <p class="m0 mb-4 bold f-14">
        <router-link
          :to="'/profile?uid=' + user.id"
          class="black-85">{{ user.name }}</router-link>
        <span
          v-t="user.title"
          class="ml1 black-45" />
      </p>
      <p
        v-t="user.introduction"
        class="m0 f-14 black-45 ellipsis-1" />
    </div>
    <el-button
      v-if="user.following"
      :loading="loading"
      plain
      size="mini"
      class="list-item__action"
      @click="onCancelFollow">{{ $t('g.cancelFollow') }}</el-button>
    <el-button
      v-else
      :loading="loading"
      plain
      type="primary"
      size="mini"
      class="list-item__action"
      @click="onFollow">{{ $t('g.follow') }}</el-button>
  </div>
</template>

<script>
import { followUserByUID, unfollowUserByUID } from '@/api/follow'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    onFollow () {
      this.onToggle('follow')
    },
    onCancelFollow () {
      this.onToggle('unfollow')
    },
    onToggle (action) {
      this.loading = true
      const fn = action === 'follow' ? followUserByUID : unfollowUserByUID
      fn(this.user.id).then(() => {
        this.loading = false
        this.$emit(action)
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e9e9e9;
  &:last-child {
    // border-bottom: none;
    margin-bottom: none;
  }
  &__avatar {
    width: 48px;
    height: 48px;
    margin-right: 24px;
  }
  &__info {
    flex: 1;
    overflow: hidden;
    margin-right: 24px;
  }
}
</style>
