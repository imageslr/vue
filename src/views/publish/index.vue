<i18n>
{
  "zh": {
    "header": "我是业主",
    "subheader": "我想找设计公司、设计师来帮我做项目",
    "slogan": "在最专业、最国际化的建筑、规划、景观、室内设计平台遇见最专业的设计师",
    "title": "给项目起一个标题吧",
    "titleTip": "项目标题最多50字",
    "type": "项目的类型是？",
    "feature": "项目的功能是？",
    "area": "项目的面积有多大？",
    "areaTip": "请尽可能精准的描述。比如建筑面积200平方米，套内面积160平方米。小区占地2000亩，建筑面积20万平米，其中住宅17万，商业三万，之外景观绿化率需要多少百分比等等",
    "deliveryTime": "项目的交付时间",
    "payment": "希望付给设计师的费用是多少？",
    "description": "项目其他描述和需求",
    "descriptionTip": "比如项目的施工预算、动工时间、您倾向的风格和色彩，希望设计师做到哪种程度等等",
    "uploadFile": "上传附件",
    "fileFormat": "附件格式",
    "findTime": "希望用多长时间找设计师？",
    "remark": "申请备注",
    "publishTip": "项目发布前会核实身份证以及公司营业执照",
    "other": "其他",
    "maxLength50": "最多50字",
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
    "header": "I am party",
    "subheader": "I'm looking for designer or company to do projects",
    "slogan": "Meet the most professional designers in the most professional and international architecture, planning, landscape, interior design platform",
    "title": "Project title",
    "type": "Project type",
    "price": "Project price",
    "description": "Project description",
    "uploadFile": "Upload file",
    "最大不得超过10M": "Max file size is 10M",
    "fileFormat": "File format"
  }
}
</i18n>

<template>
  <div class="main-container">
    <div class="card">
      <div class="border-bottom center p-24">
        <h1
          v-t="$t('header')"
          class="m0 color-primary"/>
        <p
          v-t="$t('subheader')"
          class="m0 p1 black-65 f-13"/>
        <p
          v-t="$t('slogan')"
          class="m0 p0 black-45 f-12" />
      </div>
      <el-form
        :model="form"
        label-position="top"
        class="form"
        size="small">
        <el-form-item
          :label="$t('title')"
          prop="title">
          <el-input
            v-model="form.title"
            :placeholder="$t('titleTip')"/>
        </el-form-item>
        <el-form-item
          :label="$t('type')"
          prop="types">
          <el-checkbox
            v-for="type in types"
            v-model="form.types"
            :label="type"
            :key="type">
            {{ $t(`types.${type}`) }}
          </el-checkbox><el-checkbox v-model="others.type.checked">
            {{ $t('other') }}
            <el-input
              v-if="others.type.checked"
              v-model="others.type.input"
              :placeholder="$t('maxLength50')"
              maxlength="50"/>
          </el-checkbox>
        </el-form-item>
        <el-form-item
          :label="$t('feature')"
          prop="features">
          <el-checkbox
            v-for="feature in features"
            v-model="form.features"
            :label="feature"
            :key="feature">
            {{ $t(`features.${feature}`) }}
          </el-checkbox><el-checkbox v-model="others.feature.checked">
            {{ $t('other') }}
            <el-input
              v-if="others.feature.checked"
              v-model="others.feature.input"
              :placeholder="$t('maxLength50')"
              maxlength="50"/>
          </el-checkbox>
        </el-form-item>
        <el-form-item :label="$t('area')">
          <el-input
            v-model="form.area"
            :rows="5"
            :placeholder="$t('areaTip')"
            type="textarea"/>
        </el-form-item>
        <el-form-item :label="$t('deliveryTime')">
          <el-radio
            v-for="time in deliveryTimes"
            v-model="form.deliveryTime"
            :label="time"
            :key="time">
            {{ $t(`deliveryTimes.${time}`) }}
          </el-radio><el-radio
            v-model="form.deliveryTime"
            label="other">
            {{ $t('other') }}
            <el-input
              v-if="form.deliveryTime === 'other'"
              v-model="others.deliveryTime.input"
              :placeholder="$t('maxLength50')"
              maxlength="50"/>
          </el-radio>
        </el-form-item>
        <el-form-item :label="$t('payment')">
          <el-input
            v-model="form.payment"
            maxlength="200" />
        </el-form-item>
        <el-form-item :label="$t('description')">
          <el-input
            v-model="form.description"
            :rows="5"
            :placeholder="$t('descriptionTip')"
            type="textarea"/>
          <el-upload
            :file-list="form.fileList"
            class="form__uploader"
            action="">
            <el-button>{{ $t('uploadFile') }}</el-button>
            <p
              v-t="$t('最大不得超过10M')"
              slot="tip"
              class="inline ml-12 black-45"/>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('findTime')">
          <el-radio
            v-for="time in findTimes"
            v-model="form.findTime"
            :label="time"
            :key="time">
            {{ $t(`findTimes.${time}`) }}
          </el-radio><el-radio
            v-model="form.findTime"
            label="other">
            {{ $t('other') }}
            <el-input
              v-if="form.findTime === 'other'"
              :placeholder="$t('maxLength50')"
              v-model="others.findTime.input"
              maxlength="50"/>
          </el-radio>
        </el-form-item>
        <el-form-item :label="$t('remark')">
          <el-input
            v-model="form.remark"
            :rows="5"
            type="textarea"/>
        </el-form-item>
      </el-form>
      <p
        v-t="$t('publishTip')"
        class="m0 pb-24 center f-14 black-45" />
    </div>
    <el-button
      :loading="loading"
      class="block w-100 shadow mt-24"
      type="primary"
      @click="onSubmit">{{ $t('g.publish') }}</el-button>
  </div>
</template>

<script>
import { publishProject } from '@/api/project'
export default {
  data () {
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
      others: {
        type: {
          checked: false,
          input: ''
        },
        feature: {
          checked: false,
          input: ''
        },
        deliveryTime: {
          input: ''
        },
        findTime: {
          input: ''
        }
      },
      form: {
        title: '',
        types: [],
        features: [],
        area: '',
        deliveryTime: '',
        payment: '',
        description: '',
        project_file_id: '',
        findTime: '',
        remark: ''
      },
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      const editor = this.$refs.editor
      const form = editor.form
      const body = {
        ...form,
        user_id: this.$store.getters.uid
      }
      editor.validate(valid => {
        if (valid) {
          publishProject(body).then(({ data: { req_id } }) => {
            this.loading = false
            this.$router.replace(`/publish/result?id=${req_id}`)
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.loading = false
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
  .el-checkbox {
    margin: 0;
    width: 33%;
    font-weight: 400;
  }
  .el-radio {
    margin: 0;
    width: 50%;
    font-weight: 400;
    .el-input {
      width: 300px;
    }
  }
}
</style>
