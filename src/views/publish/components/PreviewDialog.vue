<i18n>
{
  "zh": {
    "modes": {
      "free": "自由式",
      "invite": "邀请设计师",
      "specify": "指定设计师"
    }
  },
  "en": {
    "确认并提交": "Preview and submit",
    "确认项目信息": "Confirm project information",
    "同意平台协议": "Agree platform agreement",
    "发布项目成功": "Successfully publish project",
    "项目标题": "Project title",
    "项目的类型是？": "Project types",
    "项目的功能是？": "Project features",
    "项目描述": "Project description",
    "项目关键字": "Project keywords",
    "项目设计深度要求": "Design depth",
    "项目的交付时间": "Delivery time",
    "希望用多长时间找设计师？": "How long do you want to find a designer?",
    "希望付给设计师的费用是多少？": "How much would you want to pay for the designer?",
    "下载附件": "Download file",
    "招标模式": "Bidding mode",
    "申请备注": "Application remark",
    "邀请设计师": "Invited designers",
    "无": " ",
    "我同意上述平台协议": "I agree the above agreement",
    "下一步": "Next",
    "提 交": "Submit",
    "上一步": "Back",
    "modes": {
      "free": "Free",
      "invite": "Invite designers",
      "specify": "Specify designers"
    }
  }
}
</i18n>

<template>
  <el-dialog
    :title="$t('确认并提交')"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="project-preview-dialog">
    <el-steps
      :active="step"
      simple
      finish-status="success">
      <el-step :title="$t('确认项目信息')" />
      <el-step :title="$t('同意平台协议')" />
      <el-step :title="$t('发布项目成功')" />
    </el-steps>
    <template v-if="step === 0">
      <div class="project-info">
        <h3 v-t="'项目标题'" />
        <p>{{ form.title }}</p>
        <h3 v-t="'项目的类型是？'" />
        <p>{{ form.types.join('/') }}</p>
        <h3 v-t="'项目的功能是？'" />
        <p>{{ form.features.join('/') }}</p>
        <h3 v-t="'项目关键字'" />
        <template v-if="form.keywords.length">
          <el-tag
            v-for="keyword in form.keywords"
            :key="keyword"
            type="info"
            class="mr1">{{ keyword }}</el-tag>
        </template>
        <p
          v-t="'无'"
          v-else />
        <h3 v-t="'项目描述'" />
        <p
          class="pre-wrap"
          v-text="form.description" />
        <my-alert
          v-if="form.project_file_url"
          class="mt-12">
          <a
            :href="form.project_file_url"
            target="_blank">{{ $t('下载附件') }}</a>
        </my-alert>
        <h3 v-t="'项目设计深度要求'" />
        <p v-text="form.depth" />
        <h3 v-t="'项目的交付时间'" />
        <p v-text="form.delivery_time" />
        <h3 v-t="'希望用多长时间找设计师？'" />
        <p v-text="form.find_time" />
        <h3 v-t="'希望付给设计师的费用是多少？'" />
        <p v-text="form.payment" />
        <h3 v-t="'招标模式'" />
        <p v-text="$t(`modes.${form.mode}`)" />
        <h3 v-t="'申请备注'" />
        <p v-text="form.remark || $t('无')" />
        <template v-if="invitedDesigners.length">
          <h3 v-t="'邀请设计师'" />
          <router-link
            v-for="designer in invitedDesigners"
            :key="designer.id"
            :to="'/profile?uid=' + designer.id"
            target="_blank">
            <my-avatar
              :avatar-url="designer.avatar_url"
              class="avatar" />
          </router-link>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="center">
        <p class="pre-wrap m0"> {{ agreement }}</p>
        <el-checkbox
          v-model="agree"
          class="m1">{{ $t('我同意上述平台协议') }}</el-checkbox>
      </div>
    </template>
    <div class="center pt1">
      <el-button
        v-if="step === 0"
        type="primary"
        @click="step = 1">{{ $t('下一步') }}</el-button>
      <el-button
        v-if="step === 1"
        :loading="publishing"
        type="primary"
        @click="onSubmit">{{ $t('提 交') }}</el-button>
      <el-button
        v-if="step === 1"
        @click="step = 0">{{ $t('上一步') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { publishProject } from '@/api/project'
import agreement from '@/services/agreements'
export default {
  data () {
    return {
      step: 0, // 当前在哪一步：0. 预览项目信息；1. 同意用户协议
      form: {
        types: [],
        features: [],
        keywords: []
        // ...
      },
      invitedDesigners: [],
      agree: false, // 是否同意条款
      publishing: false,
      visible: false
    }
  },
  computed: {
    agreement () {
      return agreement
    }
  },
  methods: {
    show (form, invitedDesigners = []) {
      Object.assign(this.$data, this.$options.data(), {
        form, invitedDesigners, visible: true
      })
    },
    onSubmit () {
      if (!this.agree) {
        return this.$message.warning(this.$t('您必须同意平台协议，才能发布项目'))
      }

      let { form } = this
      if (this.form.mode !== 'free') {
        form = { ...form, invited_designer_ids: this.invitedDesigners.map(v => v.id) }
      }

      this.publishing = true
      publishProject(form).then(({ data: { id } }) => {
        this.publishing = false
        this.$router.push(`/publish/result?id=${id}`)
      }).catch(() => {
        this.publishing = false
      })
    }
  }
}
</script>

<style lang="scss">
.project-preview-dialog {
  .el-dialog__header {
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  .el-dialog__body {
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>

<style lang="scss" scoped>
.el-steps {
  padding: 12px 16px;
  /deep/ .el-step__title {
    font-size: 14px;
  }
}
.avatar {
  width: 32px;
  margin: 0 8px 8px 0;
}
</style>
