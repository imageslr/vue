// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Vue.config.productionTip = false

import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // NProgress样式
import i18n from './lang' // 初始化语言包
import GlobalComponents from '@/components/global-install'
import Icon from 'vue-awesome/components/Icon'

// 注册组件库，注册一些常用的全局组件
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(GlobalComponents)
Vue.component('icon', Icon)
Icon.register({
  'app-logo': {
    width: 33,
    height: 30,
    d:
      'M32.1911465,12.7680856 L28.1461523,5.74510048 C27.9758659,5.44944207 27.660647,5.26723368 27.3194559,5.26723886 L25.8331595,5.26723886 L23.0675319,0.477014847 C22.897113,0.181840601 22.5821673,4.12080375e-06 22.2413295,0 L14.1318654,0 C13.791458,-7.49994409e-06 13.4768378,0.18136967 13.3062628,0.475956382 L12.5656902,1.75489952 L7.035952,1.75578157 C6.69516456,1.75583611 6.38028443,1.93766583 6.20989071,2.23279642 L2.15515867,9.25574629 C1.98474495,9.55092605 1.98474495,9.91459622 2.15515867,10.209776 L2.89343793,11.4885074 L0.127810285,16.2787314 C-0.0426034283,16.5739112 -0.0426034283,16.9375814 0.127810285,17.2327611 L4.18254233,24.2557463 C4.35296126,24.5509205 4.66790688,24.732757 5.00874474,24.7327611 L6.48530328,24.7327611 L9.25093092,29.5229852 C9.42134985,29.8181594 9.73629548,29.9999959 10.0771333,30 L18.1865621,30 C18.5274,29.9999959 18.8423456,29.8181594 19.0127646,29.5229852 L19.7510438,28.2442537 L25.2823344,28.2442537 C25.6231723,28.2442496 25.9381179,28.0624131 26.1085368,27.7672389 L30.1632689,20.7442537 C30.3336826,20.4490739 30.3336826,20.0854038 30.1632689,19.790224 L29.4249896,18.5114926 L32.1906172,13.7212686 C32.3608763,13.4264005 32.361078,13.0631426 32.1911465,12.7680856 Z M25.1900363,16.5976469 L17.4482829,16.5967296 L20.3516874,11.5679981 C20.3800204,11.5187788 20.3800204,11.4582008 20.3516874,11.4089814 L14.4072779,1.1130464 L22.1495606,1.1130464 L25.1446281,6.30075927 L25.144734,6.3009004 L28.1397662,11.4885074 L25.1900363,16.5976469 Z M27.4015223,13.4032704 L31.0890728,13.4032704 L28.3233746,18.1934239 L26.4795993,15 L27.4015223,13.4032704 Z M20.0303374,11.4885074 L17.1728703,16.4376776 L16.3428221,15 L17.3105766,13.3237797 C17.3116703,13.3218745 17.3120584,13.3197223 17.3130463,13.3177817 C17.3174566,13.309314 17.3210907,13.3004935 17.3239838,13.2912143 C17.3249717,13.2880036 17.3261713,13.2848988 17.3269475,13.2816528 C17.3298407,13.2696216 17.3318517,13.2572023 17.3318517,13.244289 C17.3317196,13.2316829 17.3300731,13.2191384 17.3269475,13.2069252 C17.3261713,13.2036792 17.3249717,13.2005391 17.3239838,13.1973284 C17.3211367,13.1881645 17.3174763,13.1792733 17.3130463,13.170761 C17.3120232,13.1688204 17.3116703,13.1666682 17.3105766,13.164763 L13.2558798,6.14177784 C13.2274629,6.09257278 13.1749596,6.06225966 13.1181383,6.06225185 L11.366273,6.06225185 L14.1318301,1.27206311 L20.0303374,11.4885074 Z M10.9989857,6.06225185 L9.15531626,6.06225185 L7.31150569,2.86872213 L12.8432902,2.86787536 L10.9989857,6.06225185 Z M8.78806422,6.06225185 L7.03612841,6.06225185 C6.97930514,6.06225238 6.92679848,6.09256745 6.89838684,6.14177784 L3.99501763,11.170474 L3.16496946,9.73279642 L7.03609313,3.02784468 L8.78806422,6.06225185 Z M4.13272391,11.5680334 L7.12786203,6.38028527 L9.06330038,6.38028527 L9.06361792,6.38032055 L9.06393546,6.38028527 L13.0263694,6.38028527 L16.8974577,13.0852723 L11.0908252,13.0852723 C11.0340019,13.0852728 10.9814952,13.1155879 10.9530836,13.1647983 L5.00867418,23.4607333 L1.13762108,16.7557463 L4.13272391,11.5680334 Z M11.1825941,13.4032704 L16.8974225,13.4032704 L16.067339,14.8409833 L14.1317948,14.8409833 C14.1304894,14.8409833 14.1292192,14.8414772 14.1279138,14.8415125 C14.1026766,14.8421114 14.0779491,14.8487409 14.055797,14.8608471 C14.0529745,14.8623996 14.0503636,14.8641284 14.0476469,14.8658572 C14.0394532,14.871005 14.0317525,14.8768987 14.0246429,14.883463 C14.0222437,14.8856858 14.0197387,14.8877674 14.0174806,14.8901313 C14.0084833,14.8992522 14.000639,14.9094425 13.9941238,14.920474 L9.93939177,21.9434944 C9.91105781,21.992701 9.91105781,22.0532694 9.93939177,22.1024759 L10.8153773,23.6197147 L5.28415731,23.6197147 L11.1825941,13.4032704 Z M10.9989504,23.9377482 L11.9208381,25.534513 L10.0770628,28.7279369 L7.31150569,23.9377482 L10.9989504,23.9377482 Z M12.1044817,25.8525817 L12.9803967,27.36975 C13.0088173,27.4189468 13.0613223,27.4492475 13.1181383,27.4492407 L18.9248414,27.4492407 L18.0948638,28.8869536 L10.3525459,28.8869536 L12.1044817,25.8525817 Z M13.2099072,27.1312426 L10.2607417,22.0229852 L14.1318654,15.3180334 L17.035164,20.3467296 C17.0635846,20.3959264 17.1160896,20.426227 17.1729056,20.4262203 L29.0616892,20.4262203 L25.1906008,27.1312426 L13.2099072,27.1312426 Z M17.2646392,20.1082222 L14.4072427,15.1589814 L16.0674449,15.1589814 L17.0351287,16.835237 C17.0366812,16.8379184 17.0387628,16.8400707 17.0404916,16.8426463 C17.0435612,16.8473741 17.0467366,16.8519607 17.0503354,16.856371 C17.0536872,16.8604285 17.0572859,16.8641684 17.0609553,16.867873 C17.0644835,16.8714012 17.0680117,16.8748236 17.071928,16.8780343 C17.0765147,16.8818095 17.0813131,16.885126 17.0862526,16.8883367 C17.0886871,16.8899596 17.0907687,16.8919354 17.093309,16.8934173 C17.0945086,16.8941229 17.0958846,16.8942993 17.0970842,16.8949697 C17.1081628,16.9009677 17.1196648,16.9060836 17.1318019,16.9092943 C17.1330367,16.9096471 17.1343069,16.9096118 17.1355771,16.9099293 C17.1462323,16.9124697 17.1570992,16.9138104 17.1680367,16.9141279 C17.1695891,16.9141632 17.1711415,16.9147277 17.1726939,16.9147277 C17.1744933,16.9147277 17.1761868,16.9140926 17.1779862,16.9140574 C17.1801737,16.9141279 17.1821848,16.9146924 17.184337,16.9146924 L25.2817699,16.9156451 C25.3385839,16.9156445 25.3910855,16.8853458 25.4195114,16.8361543 L26.2959557,15.3180687 L28.1855272,18.5908069 L28.1855625,18.5909127 L29.0616186,20.1082222 L17.2646392,20.1082222 Z M27.5850953,13.0852723 L28.4610809,11.5680334 C28.4894139,11.5188141 28.4894139,11.4582361 28.4610809,11.4090167 L25.557747,6.38028527 L27.2274753,6.38028527 L31.0893551,13.0852723 L27.5850953,13.0852723 Z'
  }
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 如果用户登录过
  if (store.getters.token && to.path === '/signin') {
    // 登录过：进入登录页时，重定向至主页
    next({ path: '/feed' })
    NProgress.done()
  } else if (store.getters.token) {
    // 登录过：进入其他页面时，获取用户信息
    if (!store.getters.hasUserInfo) {
      store
        .dispatch('GET_USER_INFO')
        .then(() => next())
        .catch(() => {
          ElementUI.Message.error(i18n.t('errmsgs.getUserInfoFailed'))
          NProgress.done()
        })
    } else {
      NProgress.done()
      next()
    }
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    // 没有登录：访问的页面需要登录，则跳转至登录页
    next({ path: '/signin' })
    NProgress.done() // hack
  } else {
    // 没有登录：访问其他页面，直接跳转
    next()
  }
})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
