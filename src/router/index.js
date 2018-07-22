import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import Guide from '../views/login/Guide'
import SignUp from '../views/login/SignUp'
import SignIn from '../views/login/SignIn'
import Feed from '../views/feed'
import Publish from '../views/publish'
import Result from '../views/publish/Result'
import Follow from '../views/follow'
import Profile from '../views/profile'

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
        },
        {
          path: 'me',
          name: 'me',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'follow',
          name: 'follow',
          meta: {
            requireAuth: true
          },
          component: Follow
        }
      ]
    },
    {
      path: '/profile',
      component: Layout,
      children: [
        {
          path: '',
          name: 'profile',
          component: Profile
        }
      ]
    },
    {
      path: '/publish',
      component: Layout,
      children: [
        {
          path: '',
          name: 'publish',
          meta: {
            requireAuth: true
          },
          component: Publish
        },
        {
          path: 'result',
          name: 'publishResult',
          meta: {
            requireAuth: true
          },
          component: Result
        }
      ]
    }
  ]
})
