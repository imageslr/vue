import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import Guide from '../views/login/Guide'
import SignUp from '../views/login/SignUp'
import SignIn from '../views/login/SignIn'
import Feed from '../views/feed/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      component: SignUp,
      name: 'signup'
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'index',
          component: Guide
        },
        {
          path: 'signin',
          name: 'signin',
          component: SignIn
        },
        {
          path: 'feed',
          name: 'feed',
          meta: {
            requireAuth: true
          },
          component: Feed
        }
      ]
    }
  ]
})
