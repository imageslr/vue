import {
  getThreads,
  getMessagesByThreadId,
  postMessageByThreadId
} from '@/api/message'

const notification = {
  state: {
    threads: [], // 全部对话列表
    messages: [], // 当前对话(thread)的消息列表
    participant: {} // 当前对话的用户
  },

  mutations: {
    RESET: state => {
      state.threads = []
      state.messages = []
      state.participant = {}
    },
    SET_THREADS: (state, threads) => {
      state.threads = threads
    },
    SET_MESSAGES: (state, messages) => {
      state.messages = messages
    },
    SET_PARTICIPANT: (state, participant) => {
      state.participant = participant
    },
    // 添加一条消息
    ADD_MESSAGE: (state, message) => {
      state.messages.push(message)
    }
  },

  actions: {
    // 获取对话列表
    getThreads ({ commit, state }, page = 1) {
      // 如果page是1，说明是重新获取对话列表，那么清空原有数据
      // eslint-disable-next-line eqeqeq
      if (page == 1) {
        commit('SET_THREADS', [])
      }
      return getThreads(page).then(
        ({
          data: {
            data: threads,
            meta: {
              pagination,
              extra: { unread_count }
            }
          }
        }) => {
          commit('SET_THREADS', state.threads.concat(threads))
          commit('SET_UNREAD_MESSAGE_COUNT', unread_count)
          return pagination
        }
      )
    },
    getMessagesByThreadId ({ commit, state }, { id, page = 1 }) {
      // 如果page是1，说明是重新获取一个对话的消息列表，那么清空原有数据
      // eslint-disable-next-line eqeqeq
      if (page == 1) {
        commit('SET_MESSAGES', [])
        commit('SET_PARTICIPANT', {})
      }
      return getMessagesByThreadId(id, page).then(
        ({
          data: {
            data: messages,
            meta: {
              pagination,
              thread: { participant },
              extra: { unread_count }
            }
          }
        }) => {
          // 服务器返回的是按照发送时间降序排列，需要转成正序
          commit('SET_MESSAGES', messages.reverse().concat(state.messages))
          commit('SET_PARTICIPANT', participant)
          commit('SET_UNREAD_MESSAGE_COUNT', unread_count)
          return pagination
        }
      )
    },
    // 在当前对话里发送一条消息
    postMessageByThreadId ({ commit, state }, { id, body }) {
      return postMessageByThreadId(id, body).then(({ data }) => {
        commit('ADD_MESSAGE', data)
      })
    }
  }
}

export default notification
