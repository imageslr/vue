// 全局安装一些常用的自定义组件
import Divider from './Divider.vue'
import LangSelect from './LangSelect.vue'
import Avatar from './Avatar.vue'
const components = {
  Divider,
  LangSelect,
  Avatar
}
const install = function (Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
export default install
