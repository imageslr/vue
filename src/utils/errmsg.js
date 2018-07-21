import i18n from '@/lang'
import { Message } from 'element-ui'

// 输出表单错误信息
export function plsEnter (name) {
  return i18n.t('errmsgs.plsEnter', { name })
}
export function plsCheck (name) {
  return i18n.t('errmsgs.plsCheck', { name })
}
export function lenBetween (name, min, max) {
  return i18n.t('errmsgs.lenBetween', { name, min, max })
}
export function maxLen (name, max) {
  return i18n.t('errmsgs.maxLen', { name, max })
}
export function minLen (name, min) {
  return i18n.t('errmsgs.minLen', { name })
}

// 显示错误信息，res是async-validator的错误信息对象
export function showErrMessage (res) {
  Message.error(res[0].message)
}
