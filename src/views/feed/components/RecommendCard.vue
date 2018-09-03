<i18n>
{
  "en": {
    "推荐设计师": "Recommended designers"
  }
}
</i18n>

<template>
  <div
    v-if="designers.length"
    class="card p2">
    <h2 class="m0 f-15">{{ $t('推荐设计师') }}</h2>
    <el-scrollbar>
      <transition-group
        tag="ul"
        name="fade"
        class="list-reset recommend-list">
        <recommend-card-item
          v-for="designer in designers"
          :key="designer.id"
          :designer="designer"
          @follow="onFollow" />
      </transition-group>
    </el-scrollbar>
  </div>
</template>

<script>
import { getRecommendedDesigners } from '@/api/user'
import RecommendCardItem from './RecommendCardItem'
export default {
  components: { RecommendCardItem },
  data () {
    return {
      designers: []
    }
  },
  created () {
    getRecommendedDesigners().then(({ data: { data } }) => {
      this.designers = data
    })
  },
  methods: {
    onFollow (designer) {
      this.designers = this.designers.filter(v => v.id !== designer.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-list {
  white-space: nowrap;
  &-item {
    margin-right: 16px;
  }
}
</style>
