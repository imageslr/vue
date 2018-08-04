<template>
  <div
    v-if="designers.length"
    class="card p2">
    <h2 class="m0 f-15 bold">{{ $t('g.recommendation') }}</h2>
    <el-scrollbar>
      <transition-group
        tag="ul"
        name="fade"
        class="list-reset recommend-list">
        <li
          v-for="(designer, index) in designers"
          :key="designer.id"
          class="recommend-list-item">
          <router-link :to="'profile?uid=' + designer.id">
            <my-avatar
              :avatar-url="designer.avatar_url"
              class="recommend-list-item__avatar"/>
          </router-link>
          <router-link :to="'profile?uid=' + designer.id">
            <h3 class="m0 mt-4 mb-4 f-13 ellipsis-1 black">{{ designer.name }}</h3>
          </router-link>
          <p class="m0 mb1 f-12 black-65 ellipsis-1">{{ designer.title }}</p>
          <el-button
            :loading="designer._loading"
            size="mini"
            class="linear primary"
            @click="onFollow(index)"
          >{{ $t('g.follow') }}</el-button>
        </li>
      </transition-group>
    </el-scrollbar>
  </div>
</template>

<script>
import { getRecommendedDesigners } from '@/api/user'
export default {
  data () {
    return {
      designers: [/* ..., _loading: false */]
    }
  },
  created () {
    getRecommendedDesigners().then(({ data: { data } }) => {
      this.designers = data.map(designer => {
        return { ...designer, _loading: false }
      })
    })
  },
  methods: {
    onFollow (index) {
      this.designers[index]._loading = true
      this.$store.dispatch('FOLLOW', this.designers[index].id).then(() => {
        this.designers[index]._loading = false
        this.designers.splice(index, 1)
      }).catch(() => {
        this.designers[index]._loading = false
      })
    } }
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
