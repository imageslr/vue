<i18n>
{
  "zh": {
    "tip1": "设计师广场包含设计师们近一个月的热门动态（依据点赞数与评论数排列）与作品集。"
  },
  "en": {
    "tip1": "Designer Plaza contains the trending activities of designers for nearly a month (according to the number of likes and comments) and their works.",
    "设计师广场": "Designer Plaza",
    "亚里士多德": "Aristotle",
    "热门动态": "Trending activities",
    "欣赏作品": "Appreciate works",
    "想要更精确地查找设计师？": "Want to find a designer more accurately?",
    "试试这个搜索页": "Try this search"
  }
}
</i18n>
<template>
  <div>
    <div class="banner">
      <h1
        v-t="'设计师广场'"
        class="banner__title" />
      <div class="banner__sub">
        <p v-text="'人们为了生活来到城市，为了更好的生活而留在城市。'" />
        <p v-text="'Men come to city to live, they stay in the city to live well.'" />
        <p
          class="right-align"
          v-text="'——' + $t('亚里士多德')" />
      </div>
    </div>
    <div class="wrap-container">
      <div class="main-container">
        <div class="left-container">
          <el-tabs
            :value="type"
            type="card"
            @tab-click="onNavigate">
            <el-tab-pane
              :label="$t('热门动态')"
              name="activity"/>
            <el-tab-pane
              :label="$t('欣赏作品')"
              name="work"/>
          </el-tabs>
          <activity-list
            v-if="type === 'activity'"
            :get-activities="getActivities"
            show-action-button
            class="activity-list"/>
          <work-list v-else />
        </div>
        <div class="right-container">
          <div
            v-t="'tip1'"
            class="tip" />
          <div class="tip">
            {{ $t('想要更精确地查找设计师？') }}
            <router-link to="/search?type=designer">{{ $t('试试这个搜索页') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActivityList from '@/views/components/ActivityList'
import WorkList from './components/WorkList'
import { getTrendingActitivies } from '@/api/activity'
export default {
  components: { ActivityList, WorkList },
  computed: {
    type () {
      return this.$route.query.type || 'activity'
    }
  },
  methods: {
    getActivities (page) {
      return getTrendingActitivies(page)
    },
    onNavigate ({ name }) {
      this.$router.push({
        path: this.$route.path,
        query: {
          type: name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  padding: 40px 0;
  line-height: 1.5;
  &__title {
    margin: 0;
    font-size: 40px;
    font-weight: 300;
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
  }
  &__sub {
    margin: 0 auto 10px;
    width: 430px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.65);
    > p {
      margin: 0;
    }
  }
}
.wrap-container {
  min-height: calc(100vh - 70px);
  background-color: #fff;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
  .main-container {
    padding: 40px 0;
    &::after {
      display: table;
      content: "";
      clear: both;
    }
    .left-container {
      float: left;
      width: 75%;
    }
    .right-container {
      float: right;
      width: 25%;
      padding-left: 24px;
      padding-top: 56px;
    }
  }
}
.activity-list /deep/ .activity-card {
  margin-bottom: 16px;
  box-shadow: none;
  border: 1px solid rgba($color: #000000, $alpha: 0.1);
  /deep/ .reply-input-area {
    border-left: none;
    border-right: none;
  }
}
.tip {
  padding: 8px 10px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #444d56;
  line-height: 1.5;
  border: solid 1px rgba($color: #000000, $alpha: 0.1);
  border-radius: 3px;
}
</style>
