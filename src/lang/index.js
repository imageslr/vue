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
  messages, // set locale messages
  silentTranslationWarn: true
})

export function getLocale () {
  return Cookies.get('language') || 'en'
}

export function setLocale (language) {
  return Cookies.set('language', language)
}

// Hot updates
if (module.hot) {
  module.hot.accept(['./en', './zh'], function () {
    i18n.setLocaleMessage('zh', require('./zh').default)
    i18n.setLocaleMessage('en', require('./en').default)
    // Or the following hot updates via $i18n property
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('ja', require('./ja').default)
  })
}

export default i18n
