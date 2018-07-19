<template>
  <div
    v-if="designers.length"
    class="card p2">
    <h2 class="m0 f-15 bold">{{ $t('words.recommendation') }}</h2>
    <el-scrollbar>
      <ul class="list-reset recommend-list">
        <li
          v-for="designer in designers"
          :key="designer.id"
          class="recommend-list-item"
        >
          <router-link :to="'profile?uid=' + designer.id">
            <avatar
              :avatar-url="designer.avatar_url"
              class="recommend-list-item__avatar"/>
          </router-link>
          <router-link :to="'profile?uid=' + designer.id">
            <h3 class="m0 mt-4 mb-4 f-13 ellipsis-1 black">{{ designer.real_name }}</h3>
          </router-link>
          <p class="m0 mb1 f-12 black-60 ellipsis-1">{{ designer.title }}</p>
          <el-button
            size="mini"
            class="linear primary"
          >{{ $t('words.follow') }}</el-button>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { getRecommendedDesignersByUID } from '@/api/user'
export default {
  data () {
    return {
      designers: []
    }
  },
  created () {
    const uid = this.$store.getters.uid
    getRecommendedDesignersByUID(uid).then(({ data: { users } }) => {
      this.designers = users
    })
  }
}
</script>

<style lang="scss" scoped>
.recommend-list {
  white-space: nowrap;
}
.recommend-list-item {
  display: inline-block;
  width: 147px;
  padding: 16px;
  margin-right: 16px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  &__avatar {
    width: 54px;
    height: 54px;
  }
  & .el-button {
    width: 100px;
  }
  &:last-child {
    margin-right: 0;
  }
}
</style>
