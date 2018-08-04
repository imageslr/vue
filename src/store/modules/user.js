import { signIn, signUp, getCurrentUserInfo } from '@/api/user'
import { followUserByUID, unfollowUserByUID } from '@/api/follow'
import { getToken, setToken, removeToken } from '@/utils/auth'
import User from '@/models/user'

const user = {
  state: {
    // 用户信息
    userInfo: User.parse(),
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SIGN_OUT: state => {
      state.userInfo = User.parse()
      state.token = ''
    },
    SET_FOLLOWING_COUNT: (state, followingCount) => {
      state.userInfo.following_count = followingCount
    }
  },

  actions: {
    // 注册
    SIGN_UP ({ commit }, userInfo) {
      return signUp(userInfo).then(({ data }) => {
        setToken(data.meta.token)
        commit('SET_TOKEN', data.meta.token)
        commit('SET_USERINFO', User.parse(data))
      })
    },

    // 登录认证
    SIGN_IN ({ commit }, { phone, password }) {
      return signIn(phone, password).then(({ data }) => {
        setToken(data.meta.token)
        commit('SET_TOKEN', data.meta.token)
        commit('SET_USERINFO', User.parse(data))
      })
    },

    // 获取用户信息
    GET_USER_INFO ({ commit }) {
      return new Promise((resolve, reject) => {
        getCurrentUserInfo()
          .then(({ data }) => {
            commit('SET_USERINFO', User.parse(data))
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
