import Vue from 'vue'
import Router from 'vue-router'

// 防止登录后还需要加载，产生卡顿
import Feed from '../views/feed'

const Layout = () => import('../views/layout/Layout')
const Layout2 = () => import('../views/layout/Layout2')
const SidebarLayout = () => import('../views/layout/SidebarLayout')
const Guide = () => import('../views/login/Guide')
const SignUp = () => import('../views/login/SignUp')
const EmailRegister = () => import('../views/login/EmailRegister')
const SignIn = () => import('../views/login/SignIn')
const ResetPassword = () => import('../views/login/ResetPassword')
const Activity = () => import('../views/activity')
const Publish = () => import('../views/publish')
const EditProject = () => import('../views/project/Edit')
const PublishResult = () => import('../views/publish/Result')
const Follow = () => import('../views/follow')
const Profile = () => import('../views/profile')
const Project = () => import('../views/project')
const OrderSidebar = () => import('../views/order/Sidebar')
const OrderContent = () => import('../views/order/index')
const NotificationSidebar = () => import('../views/notification/Sidebar')
const NotificationContent = () => import('../views/notification/index')
const MeSidebar = () => import('../views/me/Sidebar')
const MeIndex = () => import('../views/me/index')
const MeAuth = () => import('../views/me/Auth')
const MeChangePhone = () => import('../views/me/ChangePhone')
const MeChangePassword = () => import('../views/me/ChangePassword')
const MeChangeEmail = () => import('../views/me/ChangeEmail')
const MeReviewList = () => import('../views/me/ReviewList')
const MeInviteUser = () => import('../views/me/InviteUser')
const Search = () => import('../views/search')
const AddWork = () => import('../views/work/Add')
const AddWorkResult = () => import('../views/work/Result')
const Square = () => import('../views/square')
const ThreadList = () => import('../views/message')
const Chat = () => import('../views/message/Chat')
const PostReview = () => import('../views/review/Post')
const PostReviewResult = () => import('../views/review/Result')
const PaymentDetail = () => import('../views/payment/Detail')
const PaymentList = () => import('../views/payment/index')
const Error404 = () => import('../views/error/404')
const Error403 = () => import('../views/error/403')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signup',
      component: SignUp,
      name: 'signup'
    },
    {
      path: '/signup/email',
      component: Layout,
      children: [
        {
          path: '',
          name: 'emailRegister',
          component: EmailRegister
        }
      ]
    },

    {
      path: '/',
      component: Layout2,
      children: [
        {
          path: '',
          name: 'index',
          component: Guide
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'signin',
          name: 'signin',
          component: SignIn
        },
        {
          path: 'reset',
          name: 'resetPassword',
          component: ResetPassword
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
        },
        {
          path: '403',
          name: '403',
          component: Error403
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
        },
        {
          path: ':id/edit',
          name: 'editProject',
          component: EditProject
        }
      ]
    },
    {
      path: '/payment',
      component: Layout,
      children: [
        {
          path: '',
          name: 'paymentList',
          meta: {
            roles: ['designer']
          },
          component: PaymentList
        },
        {
          path: ':id',
          name: 'payment',
          meta: {
            roles: ['designer']
          },
          component: PaymentDetail
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
          meta: {
            roles: ['designer']
          },
          components: {
            sidebar: MeSidebar,
            content: MeAuth
          }
        },
        {
          path: 'phone',
          name: 'changePhone',
          components: {
            sidebar: MeSidebar,
            content: MeChangePhone
          }
        },
        {
          path: 'password',
          name: 'changePassword',
          components: {
            sidebar: MeSidebar,
            content: MeChangePassword
          }
        },
        {
          path: 'email',
          name: 'changeEmail',
          components: {
            sidebar: MeSidebar,
            content: MeChangeEmail
          }
        },
        {
          path: 'review',
          components: {
            sidebar: MeSidebar,
            content: MeReviewList
          },
          children: [
            {
              path: ':type',
              name: 'reviewList'
            }
          ]
        },
        {
          path: 'invite',
          name: 'inviteUser',
          components: {
            sidebar: MeSidebar,
            content: MeInviteUser
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
      path: '/message',
      component: Layout,
      children: [
        {
          path: '',
          name: 'message',
          component: ThreadList
        },
        {
          path: ':id',
          name: 'chat',
          component: Chat
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
          path: ':id/edit',
          name: 'editWork',
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
      path: '/review',
      component: Layout,
      children: [
        {
          path: 'post',
          name: 'postReview',
          component: PostReview
        },
        {
          path: 'result',
          name: 'postReviewResult',
          component: PostReviewResult
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
