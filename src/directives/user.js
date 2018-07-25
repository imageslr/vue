// 根据用户类型显示元素

import Vue from 'vue'
import store from '@/store'

Vue.directive('user', {
  bind: function (el, { modifiers }) {
    const type = store.getters.userType
    if (modifiers.party && type === 'party') return
    if (modifiers.designer && type === 'designer') return
    el.parentNode.removeChild(el)
  }
})
