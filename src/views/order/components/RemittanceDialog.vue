<i18n>
{
  "en": {
    "汇款信息": "Remittance information",
    "以下是管理员录入的汇款信息：": "The following is the remittance information entered by the administrator:",
    "您填写的汇款信息为：": "The remittance information you filled out is:",
    "请准确填写以下汇款信息，以便工作人员录入：汇款单号、汇款行、汇款人姓名、汇款金额、汇款日期": "Please fill in the following remittance information accurately for the staff to enter: remittance slip number, remittance bank name, remitter name, remittance amount, remittance date",
    "汇款单号": "Remittance slip number",
    "汇款行": "Remittance bank name",
    "汇款人姓名": "Remitter name",
    "汇款金额": "Remittance amount",
    "汇款日期": "Remittance date",
    "信息录入于": "Information recorded in"
  }
}
</i18n>

<template>
  <el-dialog
    :visible.sync="visible"
    :title="$t('汇款信息')"
    @closed="onClosed">
    <template v-if="project.confirmed_remittance">
      <p
        v-t="'以下是管理员录入的汇款信息：'"
        class="mt0 black-45 f-14" />
      <el-table
        :data="tableData"
        :show-header="false"
        border
        stripe>
        <el-table-column
          prop="label"
          label="" />
        <el-table-column
          prop="value"
          label=" " />
      </el-table>
      <div class="f-14 black-45">
        <p v-t="'您填写的汇款信息为：'" />
        <p v-text="project.remittance" />
      </div>
    </template>
    <template v-else>
      <el-input
        v-model="content"
        :rows="5"
        :placeholder="$t('请准确填写以下汇款信息，以便工作人员录入：汇款单号、汇款行、汇款人姓名、汇款金额、汇款日期')"
        :maxlength="1000"
        type="textarea"/>
      <p
        v-t="'请准确填写以下汇款信息，以便工作人员录入：汇款单号、汇款行、汇款人姓名、汇款金额、汇款日期'"
        v-if="content"
        class="black-45 mb0" />
      <span slot="footer">
        <el-button @click="visible = false">{{ $t('g.cancelBtn') }}</el-button>
        <el-button
          :loading="submitting"
          :disabled="!content"
          type="primary"
          @click="onConfirm">{{ $t('g.confirmBtn') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { updateProjectRemittanceById } from '@/api/project'
export default {
  data () {
    return {
      project: {
        remittance: '',
        remittance_submitted_at: '',
        confirmed_remittance: null
      },
      visible: false,
      content: '',
      submitting: false
    }
  },
  computed: {
    tableData () {
      const { confirmed_remittance } = this.project

      if (!confirmed_remittance) return []

      const { number, bank, name, amount, remitted_at, created_at } = confirmed_remittance

      return [{
        label: this.$t('汇款单号'),
        value: number
      }, {
        label: this.$t('汇款行'),
        value: bank
      }, {
        label: this.$t('汇款人姓名'),
        value: name
      }, {
        label: this.$t('汇款金额'),
        value: amount
      }, {
        label: this.$t('汇款日期'),
        value: remitted_at
      }, {
        label: this.$t('信息录入于'),
        value: created_at
      }]
    }
  },
  methods: {
    show (project) {
      this.project = project
      this.content = project.remittance
      this.visible = true
    },
    onConfirm () {
      this.submitting = true
      updateProjectRemittanceById(this.project.id, this.content).then(({ data }) => {
        this.submitting = false
        this.visible = false
        this.$message.success(this.$t('提交成功'))

        // 直接修改对象的属性
        this.project.remittance = data.content
        this.project.remittance_submitted_at = data.remittance_submitted_at
      }).catch(() => {
        this.submitting = false
      })
    },
    onClosed () {
      Object.assign(this.$data, this.$options.data())
    }
  }
}
</script>

<style>
</style>
