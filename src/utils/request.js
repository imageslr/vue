import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['TOKEN'] = store.getters.token // 让每个请求携带token
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
    const res = response.data
    if (response.statusCode < 200 || response.statusCode >= 300) {
      console.error('网络响应错误', response)
      // 发生错误时，如果服务器返回了错误信息，则显示
      if (res.message) {
        Message({
          message: res.message,
          type: 'error',
          duration: 5000,
          showClose: true
        })
      }
      return Promise.reject(response)
    } else {
      return response
    }
  },
  error => {
    // 发出请求，超时时走这个回调
    // TODO 404错误码走哪个？
    // console.error('网络响应错误', error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
