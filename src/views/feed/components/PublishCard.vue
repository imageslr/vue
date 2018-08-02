<i18n>
{
  "zh": {
    "placeholder": "发照片或者动态",
    "photoBtn": "发照片"
  },
  "en": {
    "placeholder": "Publish photo or activity",
    "photoBtn": "Choose photo"
  }
}
</i18n>

<template>
  <div class="card">
    <el-input
      ref="input"
      v-model="textarea"
      :placeholder="$t('placeholder')"
      resize="none"
      autosize
      maxlength="200"
      class="publish-card__input"
      type="textarea"
      @focus="focus=true"
      @blur="focus=false"/>
    <div
      v-if="focus"
      class="publish-card__counter">{{ textarea.length }} / 200</div>
    <my-divider margin="12"/>
    <div class="clearfix p-12">
      <el-button
        round
        class="left publish-card__photo-btn"><icon name="camera-retro" />{{ $t('photoBtn') }}</el-button>
      <el-button
        :loading="publishBtnLoading"
        type="primary"
        class="right"
        @click="onPublish">{{ $t('g.publish') }}</el-button>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/camera-retro'
import { publishActivity } from '@/api/activity'
export default {
  data () {
    return {
      textarea: '',
      photoUrls: [],
      focus: false,
      publishBtnLoading: false
    }
  },
  methods: {
    onPublish () {
      if (this.textarea.length === 0) return
      this.publishBtnLoading = true
      const body = {
        uid: this.$store.getters.uid,
        content: this.textarea,
        photoUrls: this.photoUrls
      }
      publishActivity(body).then(({ data }) => {
        this.publishBtnLoading = false
        this.$emit('published', data)
        this.$refs.input.blur()
        this.textarea = ''
      }).catch(() => {
        this.publishBtnLoading = false
      })
    }
  }
}
</script>

<style>
.publish-card__photo-btn span {
  display: flex;
  align-items: center;
}
.publish-card__photo-btn .fa-icon {
  margin-right: 8px;
}
.publish-card__input {
  padding: 24px 12px;
}
.publish-card__input textarea {
  border: none;
  padding: 0px;
  font-size: 16px;
}
.publish-card__counter {
  position: absolute;
  right: 12px;
  bottom: 72px;
  color: rgba(0, 0, 0, 0.3);
}
</style>
