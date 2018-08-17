import { signIn, signUp, getCurrentUserInfo } from '@/api/user'
import { followUserByUID, unfollowUserByUID } from '@/api/follow'
import { getToken, setToken, removeToken } from '@/utils/auth'

const UserModel = {
  id: null,
  name: '',
  type: '',
  avatar_url: '',
  title: '',
  introduction: '',
  phone: '',
  email: '',
  email_activated: false,
  company_name: '',
  registration_number: '',
  id_number: '',
  business_license_url: '',
  id_card_url: '',
  follower_count: 0,
  following_count: 0,
  notification_count: 0,
  unread_message_count: 0
}

const user = {
  state: {
    // 用户信息
    userInfo: { ...UserModel },
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_PHONE: (state, phone) => {
      state.userInfo.phone = phone
    },
    SIGN_OUT: state => {
      state.userInfo = { ...UserModel }
      state.token = ''
    },
    SET_FOLLOWING_COUNT: (state, followingCount) => {
      state.userInfo.following_count = followingCount
    },
    SET_NOTICICATION_COUNT: (state, count) => {
      state.userInfo.notification_count = count
    },
    DECREMENT_NOTICICATION_COUNT: state => {
      state.userInfo.notification_count > 0 &&
        state.userInfo.notification_count--
    },
    SET_UNREAD_MESSAGE_COUNT: (state, count) => {
      state.userInfo.unread_message_count = count
    }
  },

  actions: {
    // 注册
    SIGN_UP ({ commit }, userInfo) {
      return signUp(userInfo).then(({ data }) => {
        setToken(data.meta.token)
        commit('SET_TOKEN', data.meta.token)
        commit('SET_USERINFO', data)
      })
    },

    // 登录认证
    SIGN_IN ({ commit }, { phone, password }) {
      return signIn(phone, password).then(({ data }) => {
        setToken(data.meta.token)
        commit('SET_TOKEN', data.meta.token)
        commit('SET_USERINFO', data)
      })
    },

    // 获取用户信息
    GET_USER_INFO ({ commit }) {
      return new Promise((resolve, reject) => {
        getCurrentUserInfo()
          .then(({ data }) => {
            commit('SET_USERINFO', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    SIGN_OUT ({ commit }) {
      return new Promise(resolve => {
        commit('SIGN_OUT')
        removeToken()
        resolve()
      })
    },

    // 关注一名用户
    FOLLOW ({ commit, state }, uid) {
      return followUserByUID(uid).then(() => {
        commit('SET_FOLLOWING_COUNT', state.userInfo.following_count + 1)
      })
    },

    // 取消关注一名用户
    UNFOLLOW ({ commit, state }, uid) {
      return unfollowUserByUID(uid).then(() => {
        commit('SET_FOLLOWING_COUNT', state.userInfo.following_count - 1)
      })
    }
  }
}

export default user
