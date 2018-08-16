import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import i18n from '@/lang' // 初始化语言包

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // request timeout
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Accept-Language'] = i18n.locale // 国际化，后端根据语言要求返回对应错误信息
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
      console.error(error)
      let msg
      if (error.message && error.message.indexOf('timeout') !== -1) {
        msg =
          i18n.locale === 'zh'
            ? '网络超时，请刷新重试'
            : 'Timeout, please refresh and try again'
      } else {
        msg = i18n.locale === 'zh' ? '网络错误' : 'Network error'
      }
      Message({
        message: msg,
        type: 'error',
        duration: 3500,
        showClose: true
      })
    } else {
      console.error('网络响应错误', error.response)
      if (response.status === 401) {
        store.dispatch('SIGN_OUT').then(() => {
          router.push({ path: '/signin' })
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

export default service
