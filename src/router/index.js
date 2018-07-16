import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import Guide from '../views/login/Guide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      name: 'index',
      children: [
        {
          path: '',
          component: Guide
        }
      ]
    }
  ]
})
