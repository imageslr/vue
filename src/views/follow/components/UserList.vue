<template>
  <div class="list">
    <user-list-item
      v-for="(user, index) in users"
      :key="user.id"
      :user="user"
      @follow="onFollow(index)"
      @unfollow="onUnfollow(index)"
    />
  </div>
</template>

<script>
import UserListItem from './UserListItem'
export default {
  components: { UserListItem },
  props: {
    users: {
      type: Array,
      default () { return [] }
    }
  },
  methods: {
    onFollow (index) {
      this.users[index].following = true // 为了方便，这里直接操作对象的属性
    },
    onUnfollow (index) {
      this.users[index].following = false
    }
  }
}
</script>
