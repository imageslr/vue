import {
  getNotificationsOfCurrentUser,
  markAllAsRead,
  markAsReadById,
  deleteNotificationById,
  deleteAllReadNotifications
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
          if (type === 'unread') {
            commit('SET_NOTICICATION_COUNT', pagination.total)
          }
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
    deleteAllReadNotifications ({ commit, state }) {
      return deleteAllReadNotifications().then(() => {
        let notifications = state.notifications.filter(v => !v.read_at)
        commit('SET_NOTIFICATIONS', notifications)
      })
    }
  }
}

export default notification
