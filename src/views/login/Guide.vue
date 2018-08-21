<i18n>
{
  "zh": {
    "party": {
      "title": "我是甲方",
      "features": ["发布需求", "找设计师", "与专业人士交流", "关注他人动态"]
    },
    "designer": {
      "title": "我是设计师",
      "features": ["查找、承接需求", "发布自己的作品动态", "拥有自己的线上工作室",  "与专业人士社交"]
    }
  },
  "en": {
    "party": {
      "title": "I'm a Party",
      "features": [
        "Publish Projects",
        "Find Designers",
        "Communicate with Professionals",
        "Follow Others' Activities"
      ]
    },
    "designer": {
      "title": "I'm a Designer",
      "features": [
        "Find and Tender for Projects",
        "Publish Your Works",
        "Have Your Own Online Studio",
        "Socialize with Professionals"
      ]
    },
    "登录": "Sign in",
    "注册": "Sign up"
  }
}
</i18n>

<template>
  <div class="container both-center">
    <div class="item">
      <el-card shadow="hover">
        <icon
          :scale="6"
          name="user-tie"/>
        <div class="title">{{ $t('party.title') }}</div>
        <div class="feature">
          <div
            v-for="feat in $t('party.features')"
            :key="feat">{{ feat }}</div>
        </div>
        <div class="center mt1">
          <router-link
            to="/signin?type=party"
            class="mr1">
            <el-button plain>{{ $t('登录') }}</el-button>
          </router-link>
          <router-link :to="{ path: '/signup', query: { type: 'party' }}">
            <el-button plain>{{ $t('注册') }}</el-button>
          </router-link>
        </div>
      </el-card>
    </div>
    <div class="item">
      <el-card shadow="hover">
        <icon
          :scale="6"
          name="user"/>
        <div class="title">{{ $t('designer.title') }}</div>
        <div class="feature">
          <div
            v-for="feat in $t('designer.features')"
            :key="feat">{{ feat }}</div>
        </div>
        <div class="center mt1">
          <router-link
            to="/signin?type=designer"
            class="mr1">
            <el-button plain>{{ $t('登录') }}</el-button>
          </router-link>
          <router-link :to="{ path: '/signup', query: { type: 'designer' }}">
            <el-button plain>{{ $t('注册') }}</el-button>
          </router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/user'
import 'vue-awesome/icons/user-tie'
export default {

}
</script>

<style lang="scss" scoped>
.container {
  width: 665px;
  .item {
    box-sizing: border-box;
    width: 50%;
    float: left;
    padding: 0 40px;
    .el-card {
      text-align: center;
      .fa-icon {
        color: #353535;
      }
      .title {
        margin-top: 16px;
        font-size: 20px;
      }
      .feature {
        padding-top: 8px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
        div {
          line-height: 24px;
        }
      }
    }
  }
}
a {
  text-decoration: none;
}
</style>
