import {
  getNotificationsOfCurrentUser,
  markAllAsRead
} from '@/api/notification'

const notification = {
  state: {
    notifications: []
  },

  mutations: {
    SET_NOTIFICATIONS: (state, notifications) => {
      state.notifications = notifications
    }
  },

  actions: {
    getNotifications ({ commit }, { type = 'unread', page = 1 }) {
      commit('SET_NOTIFICATIONS', [])
      return getNotificationsOfCurrentUser(page, type).then(
        ({
          data: {
            data: notifications,
            meta: { pagination }
          }
        }) => {
          commit('SET_NOTIFICATIONS', notifications)
          return pagination
        }
      )
    },
    markAllAsRead ({ commit, state }) {
      return markAllAsRead().then(() => {
        let notifications = state.notifications.map(v => {
          v.read_at = true
          return v
        })
        commit('SET_NOTICICATION_COUNT', 0)
        commit('SET_NOTIFICATIONS', notifications)
      })
    }
  }
}

export default notification
