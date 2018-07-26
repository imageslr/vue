// 全局安装一些常用的自定义组件
import Divider from './Divider.vue'
import LangSelect from './LangSelect.vue'
import Avatar from './Avatar.vue'
import Preview from './Preview.vue'
import Loader from './Loader.vue'
import SvgIcon from './SvgIcon.vue'
import Alert from './Alert.vue'
import Empty from './Empty.vue'
import MyProgress from './MyProgress.vue'
import Card from './Card.vue'
import BadgeStatus from './BadgeStatus.vue'
const components = {
  Divider,
  LangSelect,
  Avatar,
  Preview,
  Loader,
  SvgIcon,
  Alert,
  Empty,
  MyProgress,
  Card,
  BadgeStatus
}
const install = function (Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
export default install
