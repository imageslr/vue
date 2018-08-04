<i18n>
{
  "zh": {
    "publishHeader": "填写需求信息",
    "title": "需求标题",
    "type": "需求类型",
    "audition": "海选",
    "shortlist": "入围",
    "invitation": "邀标",
    "price": "需求预算",
    "description": "需求详情",
    "uploadFile": "上传附件",
    "fileFormat": "附件格式",
    "biddingNum": "应标名额",
    "rewardNum": "中奖人数",
    "one": "一人",
    "multi": "多人",
    "rewardNum": "中奖人数",
    "rewardSettings": "奖项设置",
    "noEmptyField": "奖项设置不能有空项",
    "tenderDate": "投标日期",
    "answerDate": "答疑日期",
    "designResult": "设计成果",
    "allowOpen": "允许公开",
    "notAllowOpen": "禁止公开",
    "placeholders": {
      "title": "请输入需求标题",
      "biddingNum": "请输入最多申请竞标人数，输入 0 表示无限制",
      "description": "请输入需求详情",
      "tenderDate": "请选择投标截止日期",
      "answerDate": "请选择答疑日期"
    },
    "tipsTitle": "说明",
    "tips": [
      ["海选", "所有人均可申请竞标，均可投标。"],
      ["入围", "所有人均可申请竞标，但只有经过筛选的人才能投标。"],
      ["邀标", "需求不公开，仅对被邀请的设计师可见，只有被邀请的设计师可以投标。"]
    ],
    "tooltips": {
      "tenderDate": "投标截止日期必须在一个月之后",
      "answerDate": "答疑时间必须在一个月之内"
    }
  },
  "en": {
    "publishHeader": "Fill in the project information",
    "title": "Project title",
    "type": "Project type",
    "audition": "Audition",
    "shortlist": "Shortlist",
    "invitation": "Invitation",
    "price": "Project price",
    "description": "Project description",
    "uploadFile": "Upload file",
    "fileFormat": "File format",
    "rewardNum": "",
    "one": "One",
    "multi": "Multi",
    "biddingNum": "Bidding number",
    "rewardNum": "Reward number",
    "rewardSettings": "Reward setting",
    "noEmptyField": "Reward setting must not have empty field",
    "tenderDate": "Tender date",
    "answerDate": "Answer date",
    "designResult": "Design result",
    "allowOpen": "Allow to open",
    "notAllowOpen": "Not allow to open",
    "placeholders": {
      "title": "Please enter project title",
      "biddingNum": "Please enter max competitive bidding number, 0 meanse unlimited",
      "description": "Please enter project description",
      "tenderDate": "Please select a tender due date",
      "answerDate": "Please select an answer Date"
    },
    "tipsTitle": "Tips",
    "tips": [
      ["Audition", "Everyone can apply for a bid and submit a tender."],
      ["Shortlist", "Everyone can apply for a bid，but only shortlisted designers can tender."],
      ["Invitation", "The project is not public, only visible to and accept the tender from the invited designer."]
    ],
    "tooltips": {
      "tenderDate": "The tender due date must be one month later",
      "answerDate": "Q&A time must be with in one month"
    }
  }
}
</i18n>

<template>
  <div class="card">
    <h1 class="card__header">{{ $t('publishHeader') }}</h1>
    <el-form
      :model="form"
      :label-position="labelPosition"
      :label-width="labelWidth"
      class="form hide-asterisk"
      size="small">
      <el-form-item :label="$t('type')">
        <el-radio-group
          v-model="form.type"
          @change="$emit('changeReqType', $event)">
          <el-radio label="1">{{ $t('audition') }}</el-radio>
          <el-radio label="2">{{ $t('shortlist') }}</el-radio>
          <el-radio label="3">{{ $t('invitation') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('title')">
        <el-input
          :placeholder="$t('placeholders.title')"
          v-model="form.title"/>
      </el-form-item>
      <el-form-item :label="$t('price')">
        <el-input
          v-model.number="form.price">
          <template slot="prepend">￥</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('description')">
        <el-input
          v-model="form.description"
          :rows="7"
          :placeholder="$t('placeholders.description')"
          type="textarea"/>
        <el-upload
          :file-list="form.fileList"
          class="form__uploader"
          action="">
          <el-button>{{ $t('uploadFile') }}</el-button>
          <p
            v-t="uploadTip"
            slot="tip"
            class="inline ml-12 black-45"/>
        </el-upload>
      </el-form-item>
      <el-form-item :label="$t('biddingNum')">
        <el-input
          v-model="form.biddingNum"
          :placeholder="$t('placeholders.biddingNum')"
          type="number"
          class="form-item--short"/>
      </el-form-item>
      <el-form-item :label="$t('rewardNum')">
        <el-radio-group v-model="form.rewardNum">
          <el-radio label="1">{{ $t('one') }}</el-radio>
          <el-radio label="x">{{ $t('multi') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="form.rewardNum === 'x'"
        :label="$t('rewardSettings')">
        <reward-setting v-model="form.rewardSettings"/>
      </el-form-item>
      <el-form-item :label="$t('tenderDate')">
        <el-tooltip
          :content="$t('tooltips.tenderDate')"
          placement="right">
          <el-date-picker
            v-model="form.tenderDate"
            :placeholder="$t('placeholders.tenderDate')"
            :picker-options="datePickerOptions.tenderDate"
            type="date"
            value-format="yyyy-MM-dd"
            class="form-item--short"/>
        </el-tooltip>
      </el-form-item>
      <el-form-item :label="$t('answerDate')">
        <el-tooltip
          :content="$t('tooltips.answerDate')"
          placement="right">
          <el-date-picker
            v-model="form.answerDate"
            :placeholder="$t('placeholders.answerDate')"
            :picker-options="datePickerOptions.answerDate"
            type="date"
            value-format="yyyy-MM-dd"
            class="form-item--short"/>
        </el-tooltip>
      </el-form-item>
      <el-form-item :label="$t('designResult')">
        <el-radio-group v-model="form.canOpen">
          <el-radio label="1">{{ $t('allowOpen') }}</el-radio>
          <el-radio label="0">{{ $t('notAllowOpen') }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <my-divider margin="32" />
    <div class="card__tips">
      <p
        v-t="$t('tipsTitle')"
        class="m0 mb-12 f-14 bold black-45" />
      <div
        v-for="tip in $t('tips')"
        :key="tip[0]"
        class="card__tips-item">
        <p
          v-t="tip[0]"
          class="m0 mb-4 f-12 bold black-45" />
        <p
          v-t="tip[1]"
          class="m0 f-12 black-45" />
      </div>
    </div>
  </div>
</template>

<script>
import RewardSetting from './RewardSetting'
import Validator from 'async-validator'
import { plsEnter, plsCheck, maxLen, showErrMessage } from '@/utils/errmsg'
export default {
  components: { RewardSetting },
  data () {
    return {
      form: {
        title: '',
        type: '',
        price: '',
        description: '',
        biddingNum: '',
        rewardNum: '', // 1：一个人；x：多个人
        rewardSettings: [ // 默认是一到三等奖，按照下标排列
          { num: '', bonus: '' },
          { num: '', bonus: '' },
          { num: '', bonus: '' }
        ],
        tenderDate: '',
        answerDate: '',
        canOpen: '1',
        fileList: [{ name: '招标说明书.docx' }]
      },
      rules: {
        type: { required: true, message: plsCheck(this.$t('type')) },
        title: [
          { required: true, message: plsEnter(this.$t('title')) },
          { max: 50, message: maxLen(this.$t('title'), 50) }
        ],
        price: { required: true, type: 'number', message: plsEnter(this.$t('price')) },
        description: { required: true, message: plsEnter(this.$t('description')) },
        biddingNum: { required: true, message: this.$t('placeholders.biddingNum') },
        rewardNum: { required: true, message: plsCheck(this.$t('rewardNum')) },
        rewardSettings: {
          validator: (rule, value, callback) => {
            if (this.form.rewardNum === 'x' && value.some(e => !e.num || !e.bonus)) {
              callback(new Error(this.$t('noEmptyField')))
            } else {
              callback()
            }
          }
        },
        tenderDate: { required: true, message: plsCheck(this.$t('tenderDate')) }, // TODO 投标日期在一个月之后？
        answerDate: { required: true, message: plsCheck(this.$t('answerDate')) }
      },
      datePickerOptions: {
        tenderDate: {
          disabledDate (time) {
            let curDate = (new Date()).getTime()
            let oneMonthAfter = curDate + 30 * 24 * 3600 * 1000
            return time.getTime() < oneMonthAfter
          }
        },
        answerDate: {
          disabledDate (time) {
            let curDate = (new Date()).getTime()
            let oneMonthAfter = curDate + 30 * 24 * 3600 * 1000
            return time.getTime() < Date.now() || time.getTime() > oneMonthAfter
          }
        }
      }
    }
  },
  computed: {
    labelPosition () {
      const { language } = this.$store.getters
      return language === 'zh' ? 'left' : 'top'
    },
    labelWidth () {
      const { language } = this.$store.getters
      return language === 'zh' ? '80px' : ''
    },
    uploadTip () {
      return this.$t('fileFormat') + ': ' + ['png', 'jpeg', 'doc', 'docx', 'pdf', 'zip', 'rar'].join('、')
    }
  },
  methods: {
    validate (cb) {
      const validator = new Validator(this.rules)
      validator.validate(this.form, res => {
        if (res) {
          showErrMessage(res)
          cb(false) // eslint-disable-line
        } else {
          cb(true) // eslint-disable-line
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 800px;
  position: relative;
  left: 50%;
  margin-left: -400px;
  padding-top: 32px;
  &__uploader {
    margin-top: 12px;
    width: 500px;
  }
  &-item--short {
    width: 360px;
  }
}
.card__tips {
  padding: 24px 80px;
  &-item {
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
