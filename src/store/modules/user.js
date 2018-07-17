import { signIn, signUp, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    // 用户信息
    userInfo: {},
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    LOG_OUT: state => {
      state.userInfo = {}
      state.token = ''
    }
  },

  actions: {
    // 注册
    SIGN_UP ({ commit }, userInfo) {
      return signUp(userInfo).then(({ data }) => {
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        commit('SET_USERINFO', data.user)
      })
    },

    // 登录
    SIGN_IN ({ commit }, account) {
      return signIn(...account).then(({ data }) => {
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        commit('SET_USERINFO', data.user)
      })
    },

    // 获取用户信息
    GET_INFO ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            commit('SET_ID', response.id)
            commit('SET_NICKNAME', response.nickname)
            commit('SET_TYPE', response.type)
            commit('SET_IS_ADMIN', response.isAdmin)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    LOGOUT ({ commit }) {
      return new Promise(resolve => {
        commit('LOG_OUT')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
