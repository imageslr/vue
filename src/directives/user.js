// 根据用户类型显示元素
import store from '@/store'

export default {
  install (Vue, options) {
    Vue.directive('user', {
      bind: function (el, { modifiers }, vnode) {
        const type = store.getters.userType
        if (modifiers.party && type === 'party') return
        if (modifiers.designer && type === 'designer') return
        el.parentNode.removeChild(el)
      }
    })
  }
}
