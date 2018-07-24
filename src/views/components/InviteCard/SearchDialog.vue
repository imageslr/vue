<i18n>
{
  "zh": {
    "invite": "邀请",
    "recall": "撤回",
    "dialogTitle": "搜索设计师",
    "searchPlaceholder": "搜索你想要邀请的设计师"
  },
  "en": {
    "invite": "Invite",
    "recall": "Recall",
    "dialogTitle": "Search designers",
    "searchPlaceholder": "Search designers to invite"
  }
}
</i18n>

<template>
  <el-dialog
    :visible="visible"
    :title="$t('dialogTitle')"
    @update:visible="$emit('update:visible', $event)"
    @closed="onClosed"
  >
    <el-input
      :placeholder="$t('searchPlaceholder')"
      v-model="searchText"
      suffix-icon="el-icon-search"
      size="small"
      @input="onSearch"/>
    <div>
      <loader
        :loading="loading"
        class="mt2 md2"/>
      <template v-if="!loading">
        <empty v-if="!designers.length"/>
        <div
          v-else
          class="list">
          <div
            v-for="(designer, index) in designers"
            :key="designer.id"
            class="list-item">
            <router-link :to="'/profile?uid=' + designer.id">
              <avatar
                :avatar-url="designer.avatar_url"
                class="list-item__avatar"/>
            </router-link>
            <div class="list-item__info">
              <p class="m0 bold f-14">
                <router-link
                  :to="'/profile?uid=' + designer.id"
                  class="black-85">{{ designer.real_name }}</router-link>
              </p>
              <p
                v-t="designer.title"
                class="m0 f-14 black-45 ellipsis-1" />
            </div>
            <el-button
              v-if="designer._is_invited"
              plain
              type="info"
              size="mini"
              class="list-item__action"
              @click="onRecall(index)">{{ $t('recall') }}</el-button>
            <el-button
              v-else
              plain
              type="primary"
              size="mini"
              class="list-item__action"
              @click="onInvite(index)">{{ $t('invite') }}</el-button>
          </div>
        </div>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import { invite, recall } from '@/api/requirement'
import { searchDesignersByName } from '@/api/user'
import _ from '@/utils/lodash'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchText: '',
      loading: false,
      designers: []
    }
  },
  methods: {
    onSearch: _.debounce(function (value) {
      this.loading = true
      searchDesignersByName(value, {
        requirement_id: this.reqId
      }).then(({ data: { users } }) => {
        this.loading = false
        this.designers = users
      }).catch(() => {
        this.loading = false
      })
    }, 500),
    onInvite (index) {
      const { reqId, designers } = this
      const designer = designers[index]
      const uid = designers[index].id
      invite(reqId, uid).then(() => {
        designer._is_invited = true
        this.$emit('invited', designer)
      })
    },
    onRecall (index) {
      const { reqId, designers } = this
      const designer = designers[index]
      const uid = designers[index].id
      recall(reqId, uid).then(() => {
        designer._is_invited = false
        this.$emit('recalled', designer)
      })
    },
    onClosed () {
      // Object.assign(this.$data, this.$options.data()) // 重置data
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e9e9e9;
  &:last-child {
    border-bottom: none;
    margin-bottom: none;
  }
  &__avatar {
    width: 48px;
    height: 48px;
    margin-right: 24px;
  }
  &__info {
    flex: 1;
    overflow: hidden;
    margin-right: 24px;
  }
}
</style>
