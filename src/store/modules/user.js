import { login, getUserInfo } from '@/api/index'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    // 用户信息
    userInfo: {},
    token: getToken()
  },

  mutations: {
    // 各种SET方法
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    LOG_OUT: (state) => {
      state.userInfo = {}
      state.token = ''
    }
  },

  actions: {
    // 登录
    LOGIN ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.type).then(response => {
          commit('SET_USERINFO', response)
          setToken(response.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GET_INFO ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          commit('SET_ID', response.id)
          commit('SET_NICKNAME', response.nickname)
          commit('SET_TYPE', response.type)
          commit('SET_IS_ADMIN', response.isAdmin)
          resolve()
        }).catch(error => {
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
