import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import Cookies from 'js-cookie'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: { ...enLocale, ...elementEnLocale },
  zh: { ...zhLocale, ...elementZhLocale }
}

const i18n = new VueI18n({
  locale: getLocale(), // set locale
  messages // set locale messages
})

export function getLocale () {
  return Cookies.get('language') || 'zh'
}

export function setLocale (language) {
  return Cookies.set('language', language)
}

export default i18n
