import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import SidebarLayout from '../views/layout/SidebarLayout'
import Guide from '../views/login/Guide'
import SignUp from '../views/login/SignUp'
import SignIn from '../views/login/SignIn'
import Feed from '../views/feed'
import Publish from '../views/publish'
import Result from '../views/publish/Result'
import Follow from '../views/follow'
import Profile from '../views/profile'
import Project from '../views/project'
import OrderSidebar from '../views/order/Sidebar'
import OrderContent from '../views/order/index'
import MeSidebar from '../views/me/Sidebar'
import MeContent from '../views/me/index'
import Error404 from '../views/error/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      component: SignUp,
      name: 'signup'
    },
    {
      path: '/404',
      component: Error404,
      name: 404
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'index',
          meta: {
            requireRedirectToFeed: true
          },
          component: Guide
        },
        {
          path: 'signin',
          name: 'signin',
          meta: {
            requireRedirectToFeed: true
          },
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
    },
    {
      path: '/project',
      component: Layout,
      children: [
        {
          path: ':id',
          name: 'project',
          meta: {
            requireAuth: true
          },
          component: Project
        }
      ]
    },
    {
      path: '/order',
      component: SidebarLayout,
      children: [
        {
          path: '',
          name: 'order',
          meta: {
            requireAuth: true
          },
          components: {
            sidebar: OrderSidebar,
            content: OrderContent
          }
        }
      ]
    },
    {
      path: '/me',
      component: SidebarLayout,
      children: [
        {
          path: '',
          name: 'me',
          meta: {
            requireAuth: true
          },
          components: {
            sidebar: MeSidebar,
            content: MeContent
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
