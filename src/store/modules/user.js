import { signIn, signUp, getCurrentUserInfo } from '@/api/user'
import { followUserByUID, unfollowUserByUID } from '@/api/follow'
import { getToken, setToken, removeToken } from '@/utils/auth'

const UserModel = {
  id: null,
  type: '',
  phone: '',
  email: '',
  name: '',
  avatar_url: '',
  title: '',
  introduction: '',
  follower_count: 0,
  following_count: 0,
  notification_count: 0,
  following: false
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
    // TODO 删除
    SWITCH_TYPE: state => {
      state.userInfo.type =
        state.userInfo.type === 'designer' ? 'party' : 'designer'
      state.token =
        state.userInfo.type === 'designer'
          ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiaWF0IjoxNTMyOTY0NzY5LCJleHAiOjE1NjQ1MDA3NjksIm5iZiI6MTUzMjk2NDc2OSwianRpIjoiUU1zRjloYUZlUThDQlRYSCIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.MrDhRl4E0dSTagEs8VFGD8YlVp5bgih-jmrnhwqujvw'
          : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiaWF0IjoxNTMzMDA1NzM4LCJleHAiOjE1NjQ1NDE3MzgsIm5iZiI6MTUzMzAwNTczOCwianRpIjoiam5UWmxqRmRxOW5zUGFqbSIsInN1YiI6MiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.M5cM9bqXIrzezLjO7EqH8r0mzjW18-5CQtKwepElFBU'
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
