// 全局安装一些常用的自定义组件
import MyDivider from './Divider.vue'
import MyLangSelect from './LangSelect.vue'
import MyAvatar from './Avatar.vue'
import MyPreview from './Preview.vue'
import MyMultiPreview from './MultiPreview.vue'
import MyLoader from './Loader.vue'
import MySvgIcon from './SvgIcon.vue'
import MyAlert from './Alert.vue'
import MyEmpty from './Empty.vue'
import MyProgress from './Progress.vue'
import MyCard from './Card.vue'
import MyBadgeStatus from './BadgeStatus.vue'
import MyUpload from './Upload.vue'
import MyMultiUpload from './MultiUpload.vue'
import MyInviteAlert from './InviteAlert.vue'
const components = {
  MyDivider,
  MyLangSelect,
  MyAvatar,
  MyPreview,
  MyMultiPreview,
  MyLoader,
  MySvgIcon,
  MyAlert,
  MyEmpty,
  MyProgress,
  MyCard,
  MyBadgeStatus,
  MyUpload,
  MyMultiUpload,
  MyInviteAlert
}
const install = function (Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
export default install
