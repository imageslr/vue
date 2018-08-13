import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import SidebarLayout from '../views/layout/SidebarLayout'
import Guide from '../views/login/Guide'
import SignUp from '../views/login/SignUp'
import SignIn from '../views/login/SignIn'
import Feed from '../views/feed'
import Activity from '../views/activity'
import Publish from '../views/publish'
import PublishResult from '../views/publish/Result'
import Follow from '../views/follow'
import Profile from '../views/profile'
import Project from '../views/project'
import OrderSidebar from '../views/order/Sidebar'
import OrderContent from '../views/order/index'
import NotificationSidebar from '../views/notification/Sidebar'
import NotificationContent from '../views/notification/index'
import MeSidebar from '../views/me/Sidebar'
import MeIndex from '../views/me/index'
import MeAuth from '../views/me/Auth'
import Search from '../views/search'
import AddWork from '../views/work/add'
import AddWorkResult from '../views/work/Result'
import Square from '../views/square'
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
          component: Feed
        },
        {
          path: 'follow',
          name: 'follow',
          component: Follow
        },
        {
          path: 'square',
          name: 'square',
          component: Square
        },
        {
          path: '404',
          name: '404',
          component: Error404
        }
      ]
    },
    {
      path: '/activity/:id',
      component: Layout,
      children: [
        {
          path: '',
          name: 'activity',
          component: Activity
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
            roles: ['party']
          },
          component: Publish
        },
        {
          path: 'result',
          name: 'publishResult',
          meta: {
            roles: ['party']
          },
          component: PublishResult
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
          components: {
            sidebar: OrderSidebar,
            content: OrderContent
          }
        },
        {
          path: 'favorite',
          name: 'orderFavorite',
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
          components: {
            sidebar: MeSidebar,
            content: MeIndex
          }
        },
        {
          path: 'auth',
          name: 'authentication',
          components: {
            sidebar: MeSidebar,
            content: MeAuth
          }
        }
      ]
    },
    {
      path: '/notification',
      component: SidebarLayout,
      children: [
        {
          path: '',
          name: 'notification',
          components: {
            sidebar: NotificationSidebar,
            content: NotificationContent
          }
        }
      ]
    },
    {
      path: '/search',
      component: Layout,
      children: [
        {
          path: '',
          name: 'search',
          component: Search
        }
      ]
    },
    {
      path: '/work',
      component: Layout,
      children: [
        {
          path: 'add',
          name: 'addWork',
          meta: {
            roles: ['designer']
          },
          component: AddWork
        },
        {
          path: 'result',
          name: 'addWorkResult',
          meta: {
            roles: ['designer']
          },
          component: AddWorkResult
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
