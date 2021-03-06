import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import i18n from '@/lang' // 初始化语言包

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 20000 // request timeout
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Accept-Language'] = getLocale() // 国际化，后端根据语言要求返回对应错误信息
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}` // 让每个请求携带token
    }
    return config
  },
  error => {
    // Do something with request error
    console.error('网络请求错误', error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const response = error.response
    if (axios.isCancel(error)) {
      // 是被取消的请求的话，不输出错误信息
    } else if (!response) {
      // console.error(error)
      let msg
      if (error.message && error.message.indexOf('timeout') !== -1) {
        msg = getErrMsg('timeout')
      } else {
        msg = getErrMsg('networkError')
      }
      Message({
        message: msg,
        type: 'error',
        duration: 3500,
        showClose: true
      })
    } else {
      // console.error('网络响应错误', error.response)
      if (response.status === 401) {
        store.dispatch('SIGN_OUT').then(() => {
          router.push({
            path: '/signin',
            query: { returnUrl: router.history.current.fullPath } // 设置returnUrl参数，登录成功后跳转
          })
        })
      } else if (response.status === 403) {
        router.replace('/403')
      } else if (response.status === 429) {
        Message({
          message: getErrMsg(429),
          type: 'error',
          duration: 3500,
          showClose: true
        })
      } else if (response.data) {
        let errmsg = ''
        if (response.data.errors) {
          errmsg = Object.values(response.data.errors)[0] // 表单错误
        } else if (response.data.message) {
          errmsg = response.data.message
        }
        if (errmsg) {
          Message({
            message: errmsg,
            type: 'error',
            duration: 3500,
            showClose: true
          })
        }
      }
    }
    return Promise.reject(error)
  }
)

function getErrMsg (key) {
  const ERR_MESSAGES = {
    zh: {
      timeout: '网络超时，请刷新重试',
      networkError: '网络错误',
      429: '请求过于频繁，请过一分钟再试'
    },
    en: {
      timeout: 'Timeout, please refresh and try again',
      networkError: 'Network error',
      429: 'Too many requests. Please try again after one minute'
    }
  }
  return ERR_MESSAGES[i18n.locale][key]
}

function getLocale () {
  return i18n.locale === 'zh' ? 'zh-CN' : i18n.locale // 将zh换成标准语言编码以适配后台服务器
}

export default service

export const BASE_API = process.env.BASE_API
