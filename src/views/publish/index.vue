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
    }
  },
  "en": {
    "我是业主": "I am party",
    "我想找设计公司、设计师来帮我做项目": "I'm looking for designer or company to do projects",
    "在最专业、最国际化的建筑、规划、景观、室内设计平台遇见最专业的设计师": "Meet the most professional designers in the most professional and international architecture, planning, landscape, interior design platform",
    "给项目起一个标题吧": "Project title",
    "最多50字": "50 characters at most",
    "最多200字": "200 characters at most",
    "项目的类型是？": "Project type",
    "项目的功能是？": "Project feature",
    "项目的面积有多大？": "Project area",
    "请尽可能精准的描述。比如建筑面积200平方米，套内面积160平方米。小区占地2000亩，建筑面积20万平米，其中住宅17万，商业三万，之外景观绿化率需要多少百分比等等": "Please describe it as accurately as possible. For example, the building area is 200 square meters and the inner cover area is 160 square meters.",
    "项目的其他描述和需求": "Project description",
    "比如项目的施工预算、动工时间、您倾向的风格和色彩，希望设计师做到哪种程度等等": "Such as the construction budget of the project, the time of construction, the style and color you are inclined to, the degree of hope for the designer, etc.",
    "项目的交付时间": "Delivery time",
    "希望用多长时间找设计师？": "How long do you want to find a designer?",
    "希望付给设计师的费用是多少？": "How much would you want to pay for the designer?",
    "上传附件": "Upload file",
    "只能上传一个文件，最大不得超过10M": "Allow upload only one file of which size is less than 10M",
    "只能上传一个文件": "Allow upload only one file",
    "上传文件大小不能超过10MB！": "File max size is 10M",
    "正在上传附件，请稍后": "File uploading, please wait",
    "申请备注": "Application remark",
    "项目发布前会核实身份证以及公司营业执照": "The identity card and company business license will be verified before the project is published.",
    "其他": "Other",
    "请填写此项": "Please enter this field",
    "请选择此项": "Please select this field",
    "输入框不能为空": "Please enter the input field",
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
    }
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
          v-t="'在最专业、最国际化的建筑、规划、景观、室内设计平台遇见最专业的设计师'"
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
          :label="$t('项目的面积有多大？')"
          prop="area">
          <el-input
            v-model="form.area"
            :rows="7"
            :placeholder="$t('请尽可能精准的描述。比如建筑面积200平方米，套内面积160平方米。小区占地2000亩，建筑面积20万平米，其中住宅17万，商业三万，之外景观绿化率需要多少百分比等等')"
            type="textarea"/>
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
          :label="$t('希望付给设计师的费用是多少？')"
          prop="payment">
          <el-input
            v-model="form.payment"
            maxlength="200" />
        </el-form-item>
        <el-form-item
          :label="$t('项目的其他描述和需求')"
          prop="description">
          <el-input
            v-model="form.description"
            :rows="7"
            :placeholder="$t('比如项目的施工预算、动工时间、您倾向的风格和色彩，希望设计师做到哪种程度等等')"
            type="textarea"/>
          <el-upload
            :on-exceed="onExceed"
            :on-remove="onRemove"
            :http-request="onUpload"
            :limit="1"
            action=""
            class="form__uploader">
            <el-button
              :loading="uploading"
              :disabled="!!form.project_file_id">{{ $t('上传附件') }}</el-button>
            <p
              v-t="'只能上传一个文件，最大不得超过10M'"
              slot="tip"
              class="inline ml-12 black-45"/>
          </el-upload>
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
          :label="$t('申请备注')"
          prop="remark">
          <el-input
            v-model="form.remark"
            :rows="7"
            type="textarea"/>
        </el-form-item>
      </el-form>
      <p
        v-t="'项目发布前会核实身份证以及公司营业执照'"
        class="m0 pb-24 center f-14 black-45" />
    </div>
    <el-button
      :loading="publishing"
      class="block w-100 shadow mt-24"
      type="primary"
      @click="onSubmit">{{ $t('g.publish') }}</el-button>
  </div>
</template>

<script>
import { publishProject } from '@/api/project'
import { upload } from '@/api/upload'
var UPLOAD_SOURCE = null
export default {
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
        area: '',
        delivery_time: '',
        payment: '',
        description: '',
        project_file_id: null,
        find_time: '',
        remark: ''
      },
      rules: {
        title: { required: true, message: this.$t('请填写此项') },
        types: { required: true, validator: getCheckBoxValidator('types') },
        features: { required: true, validator: getCheckBoxValidator('features') },
        area: { required: true, message: this.$t('请填写此项'), whitespace: true },
        delivery_time: { required: true, validator: getRadioValidator('delivery_time') },
        payment: { required: true, message: this.$t('请填写此项') },
        description: { required: true, message: this.$t('请填写此项'), whitespace: true },
        find_time: { required: true, validator: getRadioValidator('find_time') }
      },
      publishing: false,
      uploading: false
    }
  },
  methods: {
    beforeFileUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过10MB！')
      }
      return isLt10M
    },
    onUpload (file) {
      if (UPLOAD_SOURCE) UPLOAD_SOURCE.cancel('取消上传') // 每次上传文件前先取消旧的上传请求
      UPLOAD_SOURCE = this.$axios.CancelToken.source()
      this.uploading = true
      file.onProgress({ percent: 50 }) // 传一个percent参数，显示loading
      upload('project_file', file.file, { cancelToken: UPLOAD_SOURCE.token })
        .then(({ data }) => {
          this.uploading = false
          file.onSuccess()
          this.form.project_file_id = data.id
        }).catch(error => {
          this.uploading = false
          file.onError()
          console.error(error)
        })
    },
    onRemove () {
      this.form.project_file_id = null
    },
    onExceed () {
      this.$message.error(this.$t('只能上传一个文件'))
    },
    onSubmit () {
      if (this.uploading) {
        return this.$message.warning(this.$t('正在上传附件，请稍后'))
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
      const formOthers = this.formOthers
      formOthers.types.checked && form.types.push(formOthers.types.input)
      formOthers.features.checked && form.features.push(formOthers.features.input)
      form.delivery_time === 'other' && (form.delivery_time = formOthers.delivery_time.input)
      form.find_time === 'other' && (form.find_time = formOthers.find_time.input)
      return form
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
}
</style>
