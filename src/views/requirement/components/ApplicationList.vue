<i18n>
{
  "zh": {
    "designer": "设计师",
    "appliedAt": "投标时间",
    "status": "状态",
    "action": "操作",
    "viewDetail": "查看详情"
  },
  "en": {
    "designer": "Designer",
    "appliedAt": "Applied at",
    "status": "Status",
    "action": "Action",
    "viewDetail": "View detail"
  }
}
</i18n>

<template>
  <div
    v-loading="loading"
    class="list-container">
    <el-table
      :empty-text="$t('g.empty')"
      :data="users"
      style="width: 100%;">
      <el-table-column
        :label="$t('designer')">
        <template slot-scope="scope">
          <designer-visit-card :user="scope.row" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('appliedAt')"
        width="250"
        prop="applied_at"/>
      <el-table-column
        :label="$t('status')"
        width="150">
        <template slot-scope="scope">
          已通过
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('action')"
        width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="onViewDetail($index)">
            {{ $t('viewDetail') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :total="total"
      :page-size="pageSize"
      class="mt2 center"
      background
      layout="prev, pager, next"
      @current-change="getDesigners"/>
  </div>
</template>

<script>
import Requirement from '@/models/requirement'
import DesignerVisitCard from '@/views/components/DesignerVisitCard'
import { getApplyDesignersByReqId } from '@/api/requirement'
export default {
  components: { DesignerVisitCard },
  props: {
    reqDetail: {
      type: Object,
      default () {
        return Requirement.parse()
      }
    }
  },
  data () {
    return {
      users: [],
      loading: true,
      total: 0,
      pageSize: 20,
      currentPage: 1
    }
  },
  created () {
    this.getDesigners()
  },
  methods: {
    getDesigners () {
      this.loading = true
      this.users = []
      const start = (this.currentPage - 1) * this.pageSize
      return getApplyDesignersByReqId(start).then(({ data }) => {
        this.loading = false
        this.users = data.users
        this.total = data.total
      }).catch(() => {
        this.loading = false
      })
    },
    onViewDetail (index) {
      console.log(index)
    }
  }

}
</script>

<style lang="scss" scoped>
.list-item__designer {
  display: flex;
  align-items: center;
  &-avatar {
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }
}
</style>
