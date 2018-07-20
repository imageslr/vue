import { signIn, signUp, getUserInfoByToken } from '@/api/user'
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
    SIGN_OUT: state => {
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
    SIGN_IN ({ commit }, phone, password) {
      return signIn(phone, password).then(({ data }) => {
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        commit('SET_USERINFO', data.user)
      })
    },

    // 获取用户信息
    GET_USER_INFO ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfoByToken(state.token)
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
    }
  }
}

export default user
