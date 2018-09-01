<i18n>
{
  "en": {
    "平台入驻设计师": "Designers in our platform",
    "查看主页": "View Profile",
    "设计师作品": "Designer works",
    "业主发布的项目": "Party projects",
    "设计费": "Design fees",
    "进行中": "Processing",
    "已完成": "Completed"
  }
}
</i18n>

<template>
  <div>
    <el-carousel
      :autoplay="false"
      trigger="click"
      height="500px">
      <el-carousel-item
        v-for="work in works"
        :key="work.id"
        :work="work"
        class="work-list-item">
        <img
          :src="work.photo_urls[0]"
          class="work-list-item__img">
        <p
          class="work-list-item__title"
          v-text="work.title + ' —— ' + work.user.name" />
      </el-carousel-item>
    </el-carousel>
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
      <el-card
        :header="$t('业主发布的项目')"
        shadow="hover"
        class="mt-24">
        <ul class="project-list">
          <li
            v-for="project in projects"
            :key="project.id"
            class="project-list-item">
            <el-tag v-if="isProcessing(project)">{{ $t('进行中') }}</el-tag>
            <el-tag
              v-else
              type="info">{{ $t('已完成') }}</el-tag>
            <router-link
              :to="`/project/${project.id}`"
              class="project-list-item__title"
              v-text="project.title" />
            <span
              class="black-65 bold"
              v-text="$t('设计费') + '：' + project.payment"/>
          </li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<script>
import { Project } from '@/services/constants'
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters(['works', 'designers', 'projects']),
  created () {
    this.$store.dispatch('getIndexWorks')
    this.$store.dispatch('getIndexProjects')
    this.$store.dispatch('getIndexDesigners')
  },
  methods: {
    isProcessing (project) {
      // eslint-disable-next-line
      return project.status == Project.STATUS_TENDERING || project.status == Project.STATUS_WORKING
    }
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
.work-list-item {
  &__img {
    width: 100%;
  }
  &__title {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 30px 80px;
    font-size: 30px;
    font-weight: 400;
    line-height: 1.5em;
    color: #fff;
    vertical-align: middle;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
  }
}
.project-list {
  margin: 0;
  list-style-type: circle;
  &-item {
    margin-bottom: 8px;
    &__title {
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
