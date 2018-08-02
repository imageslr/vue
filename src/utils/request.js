import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import i18n from '@/lang' // 初始化语言包

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // request timeout
})

const DEFAULT_ERROR_MESSAGE = {
  '400': ['参数错误', 'Wrong parameters'],
  // '401': ['未登录', 'Unauthorized'],
  // '403': ['无权限', 'Permission denied'],
  // '404': ['资源未找到', 'Resource not found'],
  // '409': ['信息冲突或已被占用', 'Confilic request'],
  '429': ['请求太过频繁', 'Too many requests'],
  '500': ['服务器内部错误', 'Internal error']
}

// request拦截器
service.interceptors.request.use(
  config => {
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
    console.log('网络响应错误', error.response)
    const response = error.response
    if (!response) {
      Message({
        message: i18n.locale === 'zh' ? '网络错误' : 'Network error',
        type: 'error',
        duration: 3500,
        showClose: true
      })
    } else {
      const { config, status } = response
      // TODO 401/403重定向
      let errMsg
      if (config.errMsg) {
        errMsg = { ...DEFAULT_ERROR_MESSAGE, ...config.errMsg }
      } else {
        errMsg = { ...DEFAULT_ERROR_MESSAGE }
      }
      showErrMsg(errMsg, status)
    }
    return Promise.reject(error)
  }
)

// 根据当前界面语言，显示错误信息
// 其中一种语言缺少的时候，显示另一种
function showErrMsg (errMsgArray, status) {
  if (errMsgArray[status]) {
    let errMsg =
      i18n.locale === 'zh' ? errMsgArray[status][0] : errMsgArray[status][1]
    Message({
      message: errMsg,
      type: 'error',
      duration: 5000,
      showClose: true
    })
  }
}

export default service
