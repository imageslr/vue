<i18n>
{
  "zh": {
    "types":  {
      "conceptPlanning": "概念规划",
      "cityDesign": "城市设计",
      "architecturalDesign": "建筑设计",
      "landscapeDesign": "景观设计",
      "interiorDesign": "室内设计"
    },
    "features": {
      "residence": "住宅",
      "business": "商业",
      "office": "办公",
      "publicSpace": "公共空间",
      "school": "学校",
      "retail": "零售",
      "restaurant": "餐厅",
      "hotel": "酒店",
      "club": "会所",
      "gardenSquare": "花园广场"
    },
    "deliveryTimes": {
      "afterOneMonth": "一个月后",
      "afterThreeMonth": "三个月后",
      "afterSixMonth": "六个月后"
    },
    "findTimes": {
      "9to12": "9~12天",
      "12to20": "12~20天",
      "oneMonth": "一个月内"
    },
    "designDepthes": [
      "概念方案", "方案设计", "方案设计+初步设计"
    ],
    "designModes": [{
      "value": "free",
      "label": "自由式",
      "description": "所有设计师均可报名参与该项目"
    },{
      "value": "invite",
      "label": "邀请设计师",
      "description": "只有收到邀请的设计师可以参与项目；设计师可以接受或拒绝邀请；可以将设计费以不同份额发放给多名设计师"
    },{
      "value": "specify",
      "label": "指定设计师",
      "description": "只有被指定的设计师可以参与项目；设计师可以接受或拒绝；每名设计师都会获得设计费"
    }]
  },
  "en": {
    "我是业主": "I am party",
    "我想找设计公司、设计师来帮我做项目": "I'm looking for designer or company to do projects",
    "在最专业、最国际化的建筑、规划、景观、室内设计平台遇见最专业的设计师": "Meet the most professional designers in the most professional and international architecture, planning, landscape, interior design platform",
    "完善详实的项目信息，是精准匹配设计师、得到理想成果的必要条件。": "Perfecting detailed project information is a necessary condition for accurately matching designers and achieving ideal results.",
    "给项目起一个标题吧": "Project title",
    "最多50字": "50 characters at most",
    "最多200字": "200 characters at most",
    "项目的类型是？": "Project types",
    "项目的功能是？": "Project features",
    "项目关键字": "Project keywords",
    "项目设计深度要求": "Design depth",
    "项目描述": "Project description",
    "比如项目的面积、施工预算、动工时间、您倾向的风格和色彩等等": "Such as the project area, construction budget, start time, your preferred style and color, etc.",
    "项目的交付时间": "Delivery time",
    "希望用多长时间找设计师？": "How long do you want to find a designer?",
    "希望付给设计师的费用是多少？": "How much would you want to pay for the designer?",
    "上传附件": "Upload file",
    "招标模式": "Bidding mode",
    "申请备注": "Application remark",
    "向管理员留言，说明一些重要信息": "Leave a message to the administrator explaining some important information",
    "项目通过审核后设计师才可以查看与报名此项目": "After the project is approved, the designer can view and register this project.",
    "其他": "Other",
    "提交项目信息": "Publish the project",
    "只能上传一个文件，最大不得超过50MB": "Allow upload only one file of which size is less than 50MB",
    "只能上传一个文件": "Allow upload only one file",
    "上传文件大小不能超过50MB！": "File max size is 50MB",
    "正在上传附件，请稍后": "File uploading, please wait",
    "请填写此项": "Please enter this field",
    "请选择此项": "Please select this field",
    "输入框不能为空": "Please enter the input field",
    "最多可以添加10个关键字": "Can only add 10 keywords",
    "不能有相同的关键字": "Each keyword must be distinct",
    "您的招标模式为“邀请设计师”，您必须邀请至少一名设计师参与项目": "Your bidding mode is \"Invite Designers\". You have to invite at least one designer to participate the project.",
    "您的招标模式为“指定设计师”，您必须邀请至少一名设计师参与项目": "Your bidding mode is \"Specify Designers\". You have to invite at least one designer to participate the project.",
    "types":  {
      "conceptPlanning": "Concept Planning",
      "cityDesign": "City Design",
      "architecturalDesign": "Architectural Design",
      "landscapeDesign": "Landscape Design",
      "interiorDesign": "Interior Design"
    },
    "features": {
      "residence": "Residence",
      "business": "Business",
      "office": "Office",
      "publicSpace": "Public Space",
      "school": "School",
      "retail": "Retail",
      "restaurant": "Restaurant",
      "hotel": "Hotel",
      "club": "Club",
      "gardenSquare": "Garden Square"
    },
    "deliveryTimes": {
      "afterOneMonth": "After one month",
      "afterThreeMonth": "After three month",
      "afterSixMonth": "After six month"
    },
    "findTimes": {
      "9to12": "9~12 days",
      "12to20": "12~20 days",
      "oneMonth": "In one month"
    },
    "designDepthes": [
      "Conceptual scheme", "Scheme design", "Scheme design + Preliminary design"
    ],
    "designModes": [{
      "value": "free",
      "label": "Free",
      "description": "All designers can apply for the project"
    },{
      "value": "invite",
      "label": "Invite designers",
      "description": "Only the designer who receives the invitation can participate in the project; the designer can accept or reject the invitation; the payment can be distributed to multiple designers in different shares."
    },{
      "value": "specify",
      "label": "Specify designers",
      "description": "Only designated designers can participate in the project; designers can accept or reject; each designer receives payment"
    }]
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card">
      <div class="border-bottom center p-24">
        <h1
          v-t="'我是业主'"
          class="m0 color-primary"/>
        <p
          v-t="'我想找设计公司、设计师来帮我做项目'"
          class="m0 p1 black-65 f-13"/>
        <p
          v-t="'完善详实的项目信息，是精准匹配设计师、得到理想成果的必要条件。'"
          class="m0 p0 black-45 f-12" />
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="top"
        class="form"
        size="small">
        <el-form-item
          :label="$t('给项目起一个标题吧')"
          prop="title">
          <el-input
            v-model="form.title"
            :placeholder="$t('最多200字')"
            maxlength="200"/>
        </el-form-item>
        <el-form-item
          :label="$t('项目的类型是？')"
          prop="types">
          <el-checkbox
            v-for="type in types"
            v-model="form.types"
            :label="$t(`types.${type}`)"
            :key="type"/><el-checkbox v-model="formOthers.types.checked">
              {{ $t('其他') }}
              <el-input
                v-if="formOthers.types.checked"
                v-model="formOthers.types.input"
                :placeholder="$t('最多50字')"
                maxlength="50"/>
            </el-checkbox>
        </el-form-item>
        <el-form-item
          :label="$t('项目的功能是？')"
          prop="features">
          <el-checkbox
            v-for="feature in features"
            v-model="form.features"
            :label="$t(`features.${feature}`)"
            :key="feature"/><el-checkbox v-model="formOthers.features.checked">
              {{ $t('其他') }}
              <el-input
                v-if="formOthers.features.checked"
                v-model="formOthers.features.input"
                :placeholder="$t('最多50字')"
                maxlength="50"/>
            </el-checkbox>
        </el-form-item>
        <el-form-item
          :label="$t('项目关键字')"
          prop="keywords">
          <div
            v-for="(keyword, index) in form.keywords"
            :key="index"
            class="keyword-item">
            <el-input
              v-model="form.keywords[index]"
              :placeholder="$t('最多50字')"
              maxlength="50" />
            <el-button @click.prevent="removeKeyword(index)">{{ $t('g.delete') }}</el-button>
          </div>
          <el-button
            v-if="form.keywords.length < 10"
            @click="addKeyword">{{ $t('添加关键字') }}</el-button>
        </el-form-item>
        <el-form-item
          :label="$t('项目描述')"
          prop="description">
          <el-input
            v-model="form.description"
            :rows="7"
            :placeholder="$t('比如项目的面积、施工预算、动工时间、您倾向的风格和色彩等等')"
            type="textarea"/>
          <my-upload
            ref="upload"
            :max-size="50"
            type="project_file"
            @start="onUploadStart"
            @success="onUploadSuccess"
            @error="onUploadError"
            @remove="onUploadRemove"/>
        </el-form-item>
        <el-form-item
          :label="$t('项目设计深度要求')"
          prop="depth">
          <el-radio-group v-model="form.depth">
            <el-radio
              v-for="depth in $t('designDepthes')"
              :label="depth"
              :key="depth"/>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('项目的交付时间')"
          prop="delivery_time">
          <el-radio-group v-model="form.delivery_time">
            <el-radio
              v-for="time in deliveryTimes"
              :label="$t(`deliveryTimes.${time}`)"
              :key="time"/><el-radio
                label="other">
                {{ $t('其他') }}
                <el-input
                  v-if="form.delivery_time === 'other'"
                  v-model="formOthers.delivery_time.input"
                  :placeholder="$t('最多50字')"
                  maxlength="50"/>
              </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('希望用多长时间找设计师？')"
          prop="find_time">
          <el-radio-group v-model="form.find_time">
            <el-radio
              v-for="time in findTimes"
              :label="$t(`findTimes.${time}`)"
              :key="time" /><el-radio
                label="other">
                {{ $t('其他') }}
                <el-input
                  v-if="form.find_time === 'other'"
                  :placeholder="$t('最多50字')"
                  v-model="formOthers.find_time.input"
                  maxlength="50"/>
              </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('希望付给设计师的费用是多少？')"
          prop="payment">
          <el-input
            v-model="form.payment"
            maxlength="200" />
        </el-form-item>
        <el-form-item
          :label="$t('招标模式')"
          prop="mode">
          <el-radio-group v-model="form.mode">
            <el-radio
              v-for="mode in $t('designModes')"
              :key="mode.value"
              :label="mode.value">
              <el-tooltip
                :content="mode.description"
                effect="dark"
                placement="top-start">
                <span>
                  {{ mode.label }}
                  <i class="el-icon-info" />
                </span>
              </el-tooltip>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('申请备注')"
          prop="remark">
          <el-input
            v-model="form.remark"
            :rows="7"
            :placeholder="$t('向管理员留言，说明一些重要信息')"
            type="textarea"/>
        </el-form-item>
      </el-form>
      <p
        v-t="'项目通过审核后设计师才可以查看与报名此项目'"
        class="m0 pb-24 center f-14 black-45" />
    </div>
    <invite-card
      v-if="needInvite"
      ref="inviteCard"
      class="mt-24"/>
    <el-button
      :loading="publishing"
      class="block w-100 shadow mt-24"
      type="primary"
      @click="onSubmit">{{ $t('提交项目信息') }}</el-button>
  </div>
</template>

<script>
import { publishProject } from '@/api/project'
import InviteCard from '@/views/components/InviteCard'
export default {
  components: { InviteCard },
  data () {
    const getCheckBoxValidator = (field) => {
      return (rule, value, callback) => {
        let formOther = this.formOthers[field]
        if (!value.length && !formOther.checked) {
          callback(new Error(this.$t('请选择此项')))
        } else if (formOther.checked && !formOther.input) {
          callback(new Error(this.$t('输入框不能为空')))
        } else {
          callback()
        }
      }
    }
    const getRadioValidator = (field) => {
      return (rule, value, callback) => {
        let formOther = this.formOthers[field]
        if (!value) {
          callback(new Error(this.$t('请选择此项')))
        } else if (value === 'other' && !formOther.input) {
          callback(new Error(this.$t('输入框不能为空')))
        } else {
          callback()
        }
      }
    }
    return {
      types: [
        'conceptPlanning',
        'cityDesign',
        'architecturalDesign',
        'landscapeDesign',
        'interiorDesign'
      ],
      features: [
        'residence',
        'business',
        'office',
        'publicSpace',
        'school',
        'retail',
        'restaurant',
        'hotel',
        'club',
        'gardenSquare'
      ],
      deliveryTimes: [
        'afterOneMonth',
        'afterThreeMonth',
        'afterSixMonth'
      ],
      findTimes: [
        '9to12',
        '12to20',
        'oneMonth'
      ],
      // “其他”表项：是否选择、输入框内容
      formOthers: {
        types: {
          checked: false,
          input: ''
        },
        features: {
          checked: false,
          input: ''
        },
        delivery_time: {
          input: ''
        },
        find_time: {
          input: ''
        }
      },
      form: {
        title: '',
        types: [],
        features: [],
        keywords: [],
        depth: '',
        description: '',
        project_file_url: null,
        delivery_time: '',
        payment: '',
        find_time: '',
        mode: '',
        remark: ''
      },
      rules: {
        title: { required: true, message: this.$t('请填写此项') },
        types: { required: true, validator: getCheckBoxValidator('types') },
        features: { required: true, validator: getCheckBoxValidator('features') },
        keywords: [{
          type: 'array',
          max: 10,
          message: this.$t('最多可以添加10个关键字'),
          defaultField: { required: true, type: 'string', max: 50, message: this.$t('输入框不能为空') }
        }, {
          validator: (rule, value, callback) => {
            const s = new Set(value)
            if (s.size !== value.length) {
              callback(new Error(this.$t('不能有相同的关键字')))
            } else {
              callback()
            }
          }
        }],
        depth: { required: true, message: this.$t('请选择此项') },
        description: { required: true, message: this.$t('请填写此项'), whitespace: true },
        delivery_time: { required: true, validator: getRadioValidator('delivery_time') },
        payment: { required: true, message: this.$t('请填写此项') },
        find_time: { required: true, validator: getRadioValidator('find_time') },
        mode: { required: true, message: this.$t('请选择此项') }

      },
      publishing: false,
      uploading: false
    }
  },
  computed: {
    language () {
      return this.$store.getters.language
    },
    needInvite () {
      return this.form.mode === 'invite' || this.form.mode === 'specify'
    }
  },
  watch: {
    // 语言更改时清空多选框
    language () {
      this.form.types = []
      this.form.features = []
    },
    'form.keywords' () {
      this.$refs.form.validateField('keywords')
    }
  },
  methods: {
    onSubmit () {
      if (this.uploading) {
        return this.$message.warning(this.$t('正在上传附件，请稍后'))
      }

      if (this.needInvite && !this.$refs.inviteCard.invitedDesigners.length) {
        if (this.form.mode === 'invite') {
          this.$message.warning(this.$t('您的招标模式为“邀请设计师”，您必须邀请至少一名设计师参与项目'))
        }
        if (this.form.mode === 'specify') {
          this.$message.warning(this.$t('您的招标模式为“指定设计师”，您必须邀请至少一名设计师参与项目'))
        }
      }

      this.$refs.form.validate(valid => {
        if (valid) {
          this.publishing = true
          publishProject(this.getFormData()).then(({ data: { id } }) => {
            this.publishing = false
            this.$router.replace(`/publish/result?id=${id}`)
          }).catch(() => {
            this.publishing = false
          })
        }
      })
    },
    getFormData () {
      let form = this.$_.cloneDeep(this.form)

      // 为多选或单选添加“其他”项
      const formOthers = this.formOthers
      formOthers.types.checked && form.types.push(formOthers.types.input)
      formOthers.features.checked && form.features.push(formOthers.features.input)
      form.delivery_time === 'other' && (form.delivery_time = formOthers.delivery_time.input)
      form.find_time === 'other' && (form.find_time = formOthers.find_time.input)

      // 如果需要邀请用户，添加受邀用户id数组
      if (this.needInvite) form.invited_user_ids = this.$refs.inviteCard.invitedDesigners.map(v => v.id)

      return form
    },
    addKeyword () {
      this.form.keywords.push('')
    },
    removeKeyword (index) {
      this.form.keywords.splice(index, 1)
    },
    onUploadStart () {
      this.uploading = true
    },
    onUploadSuccess (data) {
      this.uploading = false
      this.form.project_file_url = data.path
    },
    onUploadError () {
      this.uploading = false
    },
    onUploadRemove () {
      this.form.project_file_url = null
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
  /deep/ .el-input__inner,
  /deep/ .el-textarea__inner {
    border-color: rgb(220, 223, 230);
    &:focus {
      border-color: #0077b5;
    }
  }
  .el-checkbox {
    margin: 0;
    width: 33%;
    font-weight: 400;
  }
  .el-radio-group {
    display: block;
    .el-radio {
      width: 50%;
      margin: 0;
      line-height: 32px;
      font-weight: 400;
      .el-input {
        width: 300px;
      }
    }
  }
  .keyword-item {
    margin-bottom: 8px;
    .el-input {
      width: 300px;
      margin-right: 8px;
    }
  }
}
</style>
