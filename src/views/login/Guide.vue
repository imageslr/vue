<i18n>
{
  "en": {
    "平台入驻设计师": "Designers in our platform",
    "查看主页": "View Profile"
  }
}
</i18n>

<template>
  <div class="main-container">
    <el-card
      :header="$t('平台入驻设计师')"
      shadow="hover">
      <el-scrollbar>
        <ul class="list-reset designer-list">
          <li
            v-for="designer in designers"
            :key="designer.id"
            class="designer-list-item">
            <router-link :to="'profile?uid=' + designer.id">
              <my-avatar
                :avatar-url="designer.avatar_url"
                class="designer-list-item__avatar"/>
            </router-link>
            <router-link :to="'profile?uid=' + designer.id">
              <h3 class="m0 mt1 mb1 f-13 ellipsis-1 black">{{ designer.name }}</h3>
            </router-link>
            <p class="m0 mb1 f-12 black-65 ellipsis-1">{{ designer.title || $t('设计师') }}</p>
            <router-link :to="'profile?uid=' + designer.id">
              <el-button
                size="mini"
              >{{ $t('查看主页') }}</el-button>
            </router-link>
          </li>
        </ul>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script>
import { getIndexDesigners } from '@/api/index'
export default {
  data () {
    return {
      designers: []
    }
  },
  created () {
    getIndexDesigners().then(({ data: { data } }) => {
      this.designers = data
    })
  }
}
</script>

<style lang="scss" scoped>
.designer-list {
  white-space: nowrap;
  margin: 0;
  &-item {
    display: inline-block;
    width: 147px;
    padding: 16px;
    margin-right: 16px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    &:last-child {
      margin-right: 0;
    }
    &__avatar {
      width: 54px;
      height: 54px;
    }
  }
}
</style>
