<i18n>
{
  "en": {
    "搜索项目、设计师": "Search projects or designers",
    "登录": "Sign in",
    "马上加入": "Sign up",
    "项目": "Project",
    "设计师": "Designer",
    "甲方": "Party",
    "业主入口": "Party entrance",
    "设计师入口": "Designer entrance"
  }
}
</i18n>

<template>
  <el-menu
    class="navbar"
    mode="horizontal"
    background-color="#283E4A">
    <icon
      name="app-logo"
      @click.native="$router.push('/')"/>
    <div
      v-if="isRoot"
      :class="{links: !isSignIn}">
      <router-link to="/signin?type=designer">
        <el-button
          class="line-btn ml-12"
          plain>{{ $t('设计师入口') }}</el-button>
      </router-link>
      <router-link to="/signin?type=party">
        <el-button
          class="line-btn ml-24"
          plain>{{ $t('业主入口') }}</el-button>
      </router-link>
    </div>
    <el-autocomplete
      v-else
      v-model="keyword"
      :fetch-suggestions="onInputKeyword"
      :placeholder="$t('搜索项目、设计师')"
      class="search"
      popper-class="search-popover"
      select-when-unmatched
      @select="onSelectItem">
      <template slot-scope="{ item }">
        <span class="search__value">{{ item.value }}</span>
        <el-tag type="info">{{ item.label }}↵ </el-tag>
      </template>
    </el-autocomplete>
    <navbar-menu
      v-if="isSignIn"
      class="links"/>
    <div
      v-else-if="!isRoot"
      class="links">
      <router-link to="/signin">
        <el-button
          class="signin-btn"
          type="text">{{ $t('登录') }}</el-button>
      </router-link>
      <router-link to="/signup">
        <el-button
          class="line-btn signup-btn"
          plain>{{ $t('马上加入') }}</el-button>
      </router-link>
    </div>
  </el-menu>
</template>

<script>
/* eslint-disable */
import NavbarMenu from './NavbarMenu'
export default {
  components: { NavbarMenu },
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    isRoot () {
      return this.$route.path === '/'
    },
    isSignIn () {
      return this.$store.getters.isSignIn
    }
  },
  methods: {
    onInputKeyword (keyword, cb) {
      if (!keyword) cb([])
      else {
        cb([{
          value: keyword,
          type: 'project',
          label: this.$t('项目')
        }, {
          value: keyword,
          type: 'designer',
          label: this.$t('设计师')
        }, {
          value: keyword,
          type: 'party',
          label: this.$t('甲方')
        }])
      }
    },
    onSelectItem (item) {
      if (!item.value) return // 有可能在没有输入时按回车
      this.$router.push({
        path: '/search',
        query: {
          type: item.type,
          keyword: item.value
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 52px;
  padding: 0 calc((100% - 1000px) / 2);
  .fa-icon {
    width: 34px;
    height: 34px;
    margin-right: 16px;
    color: #fff;
    outline: none;
    cursor: pointer;
  }
  .search {
    width: 280px;
  }
  .links {
    flex: 1;
    text-align: right;
    outline: none;
    .signin-btn {
      color: #fff;
    }
    .signup-btn {
      margin-left: 24px;
    }
  }
  .line-btn {
    background: none;
    color: #fff;
    &:hover,
    &:focus,
    &:active {
      border-color: #aaa;
    }
  }
}
</style>
<style lang="scss">
.search-popover {
  .el-autocomplete-suggestion__wrap {
    padding: 4px 0;
  }
  li {
    padding: 4px 20px;
    display: flex;
    align-items: center;
    .search__value {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
