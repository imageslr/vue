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
    "placeholders": {
      "title": "请输入需求标题",
      "biddingNum": "请输入最多申请竞标人数",
      "description": "请输入需求详情"
    },
    "tipsTitle": "说明",
    "tips": [
      ["海选", "所有人均可申请竞标，均可投标。"],
      ["入围", "所有人均可申请竞标，但只有经过筛选的人才能投标。"],
      ["邀标", "需求不公开，仅对被邀请的设计师可见，只有被邀请的设计师可以投标。"]
    ]
  },
  "en": {
    "publishHeader": "Fill in the requirement information",
    "title": "Requirement title",
    "type": "Requirement type",
    "audition": "Audition",
    "shortlist": "Shortlist",
    "invitation": "Invitation",
    "price": "Requirement price",
    "description": "Requirement description",
    "uploadFile": "Upload file",
    "fileFormat": "File format",
    "rewardNum": "",
    "one": "One",
    "multi": "Multi",
    "biddingNum": "Bidding number",
    "rewardNum": "Reward number",
    "rewardSettings": "Reward setting",
    "noEmptyField": "Reward setting must not have empty field",
    "placeholders": {
      "title": "Please enter requirement title",
      "biddingNum": "Please enter max competitive bidding number",
      "description": "Please enter requirement description"
    },
    "tipsTitle": "Tips",
    "tips": [
      ["Audition", "Everyone can apply for a bid and submit a tender."],
      ["Shortlist", "Everyone can apply for a bid，but only shortlisted designers can tender."],
      ["Invitation", "The demand is not public, only visible to and accept the tender from the invited designer."]
    ]
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
          style="width: 200px;"/>
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
    </el-form>
    <divider margin="32" />
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
        rewardNum: '', // 1, x
        rewardSettings: [
          { num: '', bonus: '' },
          { num: '', bonus: '' },
          { num: '', bonus: '' }
        ],
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
          cb(false)
        } else {
          cb(true)
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
