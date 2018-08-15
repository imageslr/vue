import {
  getNotificationsOfCurrentUser,
  markAllAsRead,
  markAsReadById,
  deleteNotificationById,
  deleteAllNotifications
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
    },
    markAsReadById ({ commit, state }, id) {
      return markAsReadById(id).then(() => {
        let notifications = state.notifications.map(v => {
          if (v.id === id) {
            v.read_at = true
          }
          return v
        })
        commit('DECREMENT_NOTICICATION_COUNT')
        commit('SET_NOTIFICATIONS', notifications)
      })
    },
    deleteNotificationById ({ commit, state }, notification) {
      return deleteNotificationById(notification.id).then(() => {
        let notifications = state.notifications.filter(
          v => v.id !== notification.id
        )
        if (!notification.read_at) commit('DECREMENT_NOTICICATION_COUNT')
        commit('SET_NOTIFICATIONS', notifications)
      })
    },
    deleteAllNotifications ({ commit }) {
      return deleteAllNotifications().then(() => {
        commit('SET_NOTICICATION_COUNT', 0)
        commit('SET_NOTIFICATIONS', [])
      })
    }
  }
}

export default notification
