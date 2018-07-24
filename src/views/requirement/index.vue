<i18n>
{
  "zh": {
    "favorite": "收藏",
    "apply": "我要投标",
    "publisher": "发布者",
    "publishedAt": "发布时间",
    "applicationDeadline": "申请截止日期",
    "canOpen": "允许公开设计成果",
    "yes": "是",
    "no": "否",
    "applicationSituation": "投标情况",
    "unlimited": "无限制",
    "price": "需求预算"
  },
  "en": {
    "favorite": "Favorite",
    "apply": "Apply",
    "publisher": "Publisher",
    "publishedAt": "Published at",
    "applicationDeadline": "Application deadline",
    "canOpen": "Can open design result",
    "yes": "Yes",
    "no": "No",
    "applicationSituation": "Application situation",
    "unlimited": "Unlimited",
    "price": "Requirement price"
  }
}
</i18n>

<template>
  <div>
    <div class="req-header card">
      <h1 class="req-header__title">{{ reqDetail.title }}</h1>
      <div class="req-header__info">
        <div class="req-header__info-item mb1">
          <span class="req-header__info-item-title">{{ $t('publisher') }}: </span>
          <router-link :to="'/profile?uid='+reqDetail.user.id">{{ reqDetail.user.real_name }}</router-link>
        </div>
        <div class="req-header__info-item">
          <span class="req-header__info-item-title">{{ $t('publishedAt') }}: </span>
          {{ reqDetail.created_at }}
        </div>
        <div class="req-header__info-item">
          <span class="req-header__info-item-title">{{ $t('applicationDeadline') }}: </span>{{ reqDetail.apply_due_date }}
        </div>
        <div class="req-header__info-item">
          <span class="req-header__info-item-title">{{ $t('canOpen') }}: </span>
          {{ reqDetail.can_open ? $t('yes') : $t('no') }}
        </div>
      </div>
      <div class="req-header__sub">
        <p
          v-t="$t('price')"
          class="req-header__sub-title mb-4" />
        <span class="req-header__price">￥{{ reqDetail.price }}</span>
      </div>
      <div class="req-header__sub">
        <p
          v-t="$t('applicationSituation')"
          class="req-header__sub-title" />
        <my-progress
          :percentage="progressPercentage"
          :text="progressText"
          class="req-header__progress"/>
      </div>
    </div>
    <loader
      :loading="loading"
      :error="error"
      :on-reload="getReqDetail" />
  </div>
</template>

<script>
import { getReqDetailById } from '@/api/requirement'
export default {
  data () {
    return {
      loading: false,
      error: false,
      reqDetail: {
        current_apply_num: 0,
        max_apply_num: 0,
        user: {

        }
      }
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    progressPercentage () {
      // 申请人数无限制的时候，进度条显示在0%或50%
      if (this.reqDetail.max_apply_num == 0) { // eslint-disable-line eqeqeq
        if (this.reqDetail.current_apply_num) {
          return 50
        } else {
          return 0
        }
      } else {
        return 100 * this.reqDetail.current_apply_num / this.reqDetail.max_apply_num
      }
    },
    progressText () {
      let current = this.reqDetail.current_apply_num
      let max
      if (this.reqDetail.max_apply_num == 0) { // eslint-disable-line eqeqeq
        max = this.$t('unlimited')
      } else {
        max = this.reqDetail.max_apply_num
      }
      return current + '/' + max
    }
  },
  created () {
    this.getReqDetail()
  },
  methods: {
    getReqDetail () {
      this.loading = true
      this.error = false
      getReqDetailById(this.id).then(({ data }) => {
        this.loading = false
        this.reqDetail = data
      }).catch(() => {
        this.loading = false
        this.error = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.req-header {
  width: 100%;
  padding: 24px calc((100% - 1000px) / 2);
  overflow: hidden;
  &__title {
    margin: 0 0 16px;
    font-size: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }
  &__info {
    float: left;
    width: 600px;
    height: 54px;
    &-item {
      display: inline-block;
      width: 290px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      &-title {
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  &__sub {
    float: right;
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    height: 54px;
    &-title {
      flex: 1;
      margin: 0;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      text-align: right;
    }
  }
  &__price {
    margin: 0;
    font-size: 24px;
    line-height: 28px;
  }
  &__progress {
    width: 180px;
  }
}
</style>
