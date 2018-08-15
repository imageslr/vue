import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import notification from './modules/notification'
import message from './modules/message'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    notification,
    message,
    app
  },
  getters
})

export default store
