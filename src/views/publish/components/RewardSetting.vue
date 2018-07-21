<i18n>
{
  "zh": {
    "num": "{order}等奖人数",
    "bonus": "{order}等奖奖金",
    "maxSettingNum": "您最多只能添加五个奖项类别",
    "minSettingNum": "至少要有一个奖项类别",
    "addReward": "添加奖项类别",
    "delete": "删除"
  },
  "en": {
    "num": "The {order} Prize Number",
    "bonus": "The {order} Prize Bonus",
    "maxSettingNum": "You can only add up to five prize categories",
    "minSettingNum": "At least one prize category",
    "addReward": "Add reward",
    "delete": "Delete"
  }
}
</i18n>

<template>
  <div>
    <div
      v-for="(item, index) in value"
      :key="index"
      class="reward-setting-item">
      <el-input
        v-model.number="item.num"
        :placeholder="placeholders.num[index]"
        type="number"
        class="reward-setting-item__input"/>
      <el-input
        v-model.number="item.bonus"
        :placeholder="placeholders.bonus[index]"
        type="number"
        class="reward-setting-item__input">
        <template slot="prepend">￥</template>
      </el-input>
      <!-- 最多添加5个 -->
      <el-button
        v-if="index != 0 && index + 1 === value.length"
        @click.prevent="onRemoveReward">{{ $t('delete') }}</el-button>
      <el-button
        v-if="index != 4 && index + 1 === value.length"
        type="primary"
        plain
        @click="onAddReward">{{ $t('addReward') }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    placeholders () {
      const { value } = this
      return {
        num: value.map((v, index) => {
          return this.$t('num', { order: this.$t('ordinalNum')[index] })
        }),
        bonus: value.map((v, index) => {
          return this.$t('bonus', { order: this.$t('ordinalNum')[index] })
        })
      }
    }
  },
  methods: {
    onAddReward () {
      this.$emit('input', [...this.value, { num: '', bonus: '' }])
    },
    onRemoveReward (index) {
      this.$emit('input', this.value.slice(0, this.value.length - 1))
    }
  }
}
</script>

<style lang="scss" scoped>
.reward-setting-item {
  margin-bottom: 22px;
  &:last-child {
    margin-bottom: 0;
  }
  &__input {
    margin-right: 12px;
    width: 200px;
  }
}
</style>
