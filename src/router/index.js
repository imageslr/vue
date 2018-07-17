import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import Guide from '../views/login/Guide'
import SignUp from '../views/login/SignUp'
import SignIn from '../views/login/SignIn'

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
    },
    {
      path: '/signup',
      component: SignUp,
      name: 'signup'
    },
    {
      path: '/signin',
      component: SignIn,
      name: 'signin'
    }
  ]
})
