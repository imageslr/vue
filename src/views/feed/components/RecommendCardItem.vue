<i18n>
{
  "en": {
    "设计师": "Designer"
  }
}
</i18n>

<template>
  <li class="recommend-list-item">
    <router-link :to="'profile?uid=' + designer.id">
      <my-avatar
        :avatar-url="designer.avatar_url"
        class="recommend-list-item__avatar"/>
    </router-link>
    <router-link :to="'profile?uid=' + designer.id">
      <h3 class="m0 mt-4 mb-4 f-13 ellipsis-1 black">{{ designer.name }}</h3>
    </router-link>
    <p class="m0 mb1 f-12 black-65 ellipsis-1">{{ designer.title || $t('设计师') }}</p>
    <el-button
      :loading="loading"
      size="mini"
      class="linear primary"
      @click="onFollow"
    >{{ $t('g.follow') }}</el-button>
  </li>
</template>

<script>
export default {
  props: {
    designer: {
      type: Object,
      default () {
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
    onFollow (index) {
      this.loading = true
      this.$store.dispatch('FOLLOW', this.designer.id).then(() => {
        this.loading = false
        this.$emit('follow', this.designer)
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-list-item {
  display: inline-block;
  width: 147px;
  padding: 16px;
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
