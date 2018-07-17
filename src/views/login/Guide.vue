<template>
  <div class="container both-center">
    <div class="item">
      <router-link :to="{ path: '/signup', query: { type: 'party' }}">
        <el-card shadow="hover">
          <icon
            :scale="6"
            name="user-tie"/>
          <div class="title">{{ $t('guide.party.title') }}</div>
          <div class="feature">
            <div
              v-for="feat in $t('guide.party.features')"
              :key="feat">{{ feat }}</div>
          </div>
        </el-card>
      </router-link>
    </div>
    <div class="item">
      <router-link :to="{ path: '/signup', query: { type: 'designer' }}">
        <el-card shadow="hover">
          <icon
            :scale="6"
            name="user"/>
          <div class="title">{{ $t('guide.designer.title') }}</div>
          <div class="feature">
            <div
              v-for="feat in $t('guide.designer.features')"
              :key="feat">{{ feat }}</div>
          </div>
        </el-card>
      </router-link>
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
