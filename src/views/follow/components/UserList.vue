<template>
  <div
    class="list-container">
    <my-empty v-if="!users.length" />
    <transition-group
      v-else
      tag="div"
      name="fade-transform-x"
      class="list">
      <user-list-item
        v-for="(user, index) in users"
        :key="user.id"
        :user="user"
        @follow="onFollow(index)"
        @unfollow="onUnfollow(index)"
      />
    </transition-group>
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
      this.users[index].is_following = true
    },
    onUnfollow (index) {
      this.users[index].is_following = false
    }
  }
}
</script>
