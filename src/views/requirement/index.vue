<i18n>
{
  "zh": {
    "apply": "我要投标",
    "cancelApply": "取消投标",
    "supplementReq": "补充需求",
    "cancelPublish": "取消发布",
    "confirmCancelPublish": "此操作将取消发布该需求并不可恢复，是否确认？",
    "cancelSuccess": "取消成功",
    "canceledAlertText": "该需求已于 {time} 被甲方取消，无法进行操作",
    "publisher": "发布者",
    "publishedAt": "发布时间",
    "applicationDeadline": "申请截止日期",
    "canOpen": "允许公开设计成果",
    "yes": "是",
    "no": "否",
    "applicationSituation": "投标情况",
    "applicationSituationText": "该需求可接受 {max} 名设计师投标，目前还剩 {remain} 个投标名额",
    "applicationSituationTextUnlimited": "该需求目前已有 {current} 名设计师投标，投标名额无限制",
    "price": "需求预算",
    "description": "需求详情",
    "supplementDescription": "需求补充",
    "supplementAt": "补充于",
    "downloadFile": "下载附件",
    "rewardSettings": "奖项设置"
  },
  "en": {
    "apply": "Apply",
    "cancelApply": "Cancel apply",
    "supplementReq": "Supplement requirement",
    "cancelPublish": "Cancel publish",
    "confirmCancelPublish": "This operation will unpublish the requirement and is not recoverable. Is it confirmed?",
    "cancelSuccess": "Successfully canceled",
    "canceledAlertText": "The requirement has been canceled at {time}",
    "publisher": "Publisher",
    "publishedAt": "Published at",
    "applicationDeadline": "Application deadline",
    "canOpen": "Can open design result",
    "yes": "Yes",
    "no": "No",
    "applicationSituation": "Application situation",
    "applicationSituationText": "The requirement accepts max {max} designers to apply，{remain} places remaining",
    "applicationSituationTextUnlimited": "There are currently {current} designers applying for this requirement, and there is no limit on the number of application.",
    "price": "Requirement price",
    "description": "Requirement description",
    "supplementDescription": "Supplement description",
    "supplementAt": "Supplement at",
    "downloadFile": "Download file",
    "rewardSettings": "Reward setting"
  }
}
</i18n>

<template>
  <div>
    <div class="req-header card">
      <alert
        v-if="isCanceled"
        :title="$t('canceledAlertText', {time: reqDetail.canceled_at})"
        type="warning"
        class="mb2"/>
      <div class="req-header__title-area">
        <h1 class="req-header__title">{{ reqDetail.title }}</h1>
        <favorite-button
          v-user.designer
          :req-detail.sync="reqDetail" />
        <el-button
          v-user.designer
          v-if="reqDetail.is_participating"
          size="mini"
          @click="onCancelApply"
        >{{ $t('cancelApply') }}</el-button>
        <el-button
          v-user.designer
          v-else
          :disabled="!canApply"
          type="primary"
          size="mini"
          @click="onApply"
        >{{ $t('apply') }}</el-button>
        <el-button
          v-user.party
          v-if="isPublisher && canSupplement"
          size="mini"
          @click="uploadDialogVisible = true"
        >{{ $t('supplementReq') }}</el-button>
        <el-button
          v-user.party
          v-if="isPublisher && canCancel"
          size="mini"
          @click="onCancelPublish"
        >{{ $t('cancelPublish') }}</el-button>
      </div>
      <div class="overflow-hidden">
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
          <req-progress
            :req-detail="reqDetail"
            class="req-header__progress"/>
        </div>
      </div>
      <steps
        :req-detail="reqDetail"
        class="req-header__steps" />
    </div>
    <loader
      :loading="loading"
      :error="error"
      :on-reload="getReqDetail" />
    <div class="main-container">
      <card :title="$t('description')">
        <div class="pre-wrap">{{ reqDetail.tender_description }}</div>
        <alert
          v-if="reqDetail.tender_document_url"
          class="mt-12"><a :href="reqDetail.tender_document_url">{{ $t('downloadFile') }}</a></alert>
      </card>
      <card
        v-if="reqDetail.supplement_description"
        :title="$t('supplementDescription')">
        <div class="pre-wrap">{{ reqDetail.supplement_description }}</div>
        <alert
          v-if="reqDetail.supplement_document_url"
          class="mt-12"><a :href="reqDetail.supplement_document_url">{{ $t('downloadFile') }}</a></alert>
        <p class="m0 mt1 f-12 black-65">{{ $t('supplementAt') }}：{{ reqDetail.supplement_at }}</p>
      </card>
      <card :title="$t('rewardSettings')">
        <reward-setting-item
          v-for="(item, index) in reqDetail.reward_settings"
          :key="index"
          :order="index+1"
          :num="item.num"
          :bonus="item.bonus"
        />
      </card>
      <card
        v-if="isPublisher"
        :title="$t('applicationSituation')">
        <alert
          :title="applicationSituationText"
          type="warning" />
        <application-list
          :req-detail.sync="reqDetail"
          class="mt1" />
      </card>
    </div>
    <upload-dialog
      :req-detail.sync="reqDetail"
      :type="uploadDialogType"
      :visible.sync="uploadDialogVisible" />
  </div>
</template>

<script>
/* eslint eqeqeq: "off" */
import Requirement from '@/models/requirement'
import Steps from './components/Steps'
import FavoriteButton from './components/FavoriteButton'
import ReqProgress from './components/ReqProgress'
import RewardSettingItem from './components/RewardSettingItem'
import UploadDialog from './components/UploadDialog'
import ApplicationList from './components/ApplicationList'
import { getReqDetailById, cancelRequirementById } from '@/api/requirement'
export default {
  components: {
    Steps,
    FavoriteButton,
    ReqProgress,
    RewardSettingItem,
    UploadDialog,
    ApplicationList
  },
  data () {
    return {
      loading: false,
      error: false,
      uploadDialogVisible: false,
      reqDetail: Requirement.parse()
    }
  },
  computed: {
    // 需求id
    id () {
      return this.$route.params.id
    },
    // 投标情况的说明文字
    applicationSituationText () {
      if (this.reqDetail.max_apply_num == 0) {
        return this.$t('applicationSituationTextUnlimited', { current: this.reqDetail.current_apply_num })
      } else {
        return this.$t('applicationSituationText', {
          max: this.reqDetail.max_apply_num,
          remain: this.reqDetail.max_apply_num - this.reqDetail.current_apply_num
        })
      }
    },
    // 上传对话框类型：补充需求 / 报名投标
    uploadDialogType () {
      return this.$store.getters.userType === 'party' ? 'supplement' : 'apply'
    },
    // 当前登录用户（设计师）能否报名
    canApply () {
      return this.reqDetail.can_apply && this.reqDetail.status == 1000
    },
    // 当前登录用户（甲方）是否是发布人
    isPublisher () {
      return this.reqDetail.user.id == this.$store.getters.uid
    },
    // 能否补充需求
    canSupplement () {
      return this.reqDetail.status == 1000 && !!this.reqDetail.supplement_description
    },
    // 能否取消发布
    canCancel () {
      return this.reqDetail.status == 1000 || this.reqDetail.status == 1010
    },
    // 是否已被取消
    isCanceled () {
      return this.reqDetail.status == 500
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
    },
    onApply () {

    },
    onCancelApply () {

    },
    onCancelPublish () {
      this.$confirm(this.$t('confirmCancelPublish'), this.$t('g.notice'), {
        confirmButtonText: this.$t('g.confirmBtn'),
        cancelButtonText: this.$t('g.cancelBtn'),
        type: 'warning'
      }).then(() => {
        cancelRequirementById(this.reqDetail.id).then(() => {
          this.reqDetail.status = 500
          this.reqDetail.canceled_at = this.$dayjs().format('YYYY-MM-DD HH:mm:ss')
          this.$message({
            type: 'success',
            message: this.$t('cancelSuccess')
          })
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.req-header {
  width: 100%;
  padding: 24px calc((100% - 1000px) / 2);
  &__title-area {
    display: flex;
    align-content: center;
    margin: 0 0 16px;
    vertical-align: middle;
  }
  &__title {
    flex: 1;
    margin: 0;
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
  &__steps {
    margin-top: 32px;
  }
}
.main-container {
  .card {
    margin-bottom: 24px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.alert {
  font-size: 14px;
}
</style>
