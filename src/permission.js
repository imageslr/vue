import router from './router'
import store from './store'
import i18n from './lang' // 初始化语言包
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

function hasPermission (userType, permissionRoles) {
  if (!permissionRoles) return true
  return permissionRoles.indexOf(userType) >= 0
}

const whiteList = [
  '/',
  '/signup',
  '/signup/email',
  '/signin',
  // '/profile',
  '/search',
  '/square',
  '/reset'
] // 免登录白名单
const grayList = [] // 免登陆灰名单：白名单的子集，如果query里没有uid参数，则必须登录

// 路由前权限判断
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  // 判断是否有token
  if (store.getters.token) {
    // 如果需要重定向至主页时重定向
    if (to.path === '/signin') {
      // next({ path: '/feed' })
      // NProgress.done() // 如果当前页面就是feed，那跳转到其他页面再next到feed时不会触发afterEach钩子
      next()
    } else {
      // 如果不需要重定向，判断是否获取到用户信息
      if (!store.getters.hasUserInfo) {
        store
          .dispatch('GET_USER_INFO') // 获取用户信息
          .then(() => next())
          .catch(() => {
            store.dispatch('SIGN_OUT').then(() => {
              Message.error(i18n.t('errmsgs.getUserInfoFailed'))
              next({ path: '/' })
              // NProgress.done()
            })
          })
      } else {
        // 如果已经获取到了用户信息，判断是否有权限访问
        // 每次路由前都要做这个判断，因为用户可能切换账号但是不刷新页面，也就不会生成新的路由表
        if (hasPermission(store.getters.userType, to.meta.roles)) {
          next()
        } else {
          next({ path: '/404', replace: true })
          NProgress.done() // need hack
        }
      }
    }
  } else {
    // 没有登录
    if (grayList.indexOf(to.path) !== -1 && !to.query.uid) {
      // 在免登录灰名单，query中没有uid时要求登录
      next({
        path: '/signin',
        query: { returnUrl: to.fullPath } // 设置returnUrl参数，登录成功后跳转
      })
      NProgress.done() // hack
    } else if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/signin',
        query: { returnUrl: to.fullPath } // 设置returnUrl参数，登录成功后跳转
      })
      NProgress.done() // 如果当前页面就是signin，那跳转到其他页面再next到signin时不会触发afterEach钩子
    }
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
  window.scrollTo(0, 0) // 滚动回顶部 router的scroll-behavior是没用的
})
