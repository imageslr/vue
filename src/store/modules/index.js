import { getDesigners, getWorks, getProjects } from '@/api/index'

const index = {
  state: {
    designers: [],
    works: [],
    projects: []
  },

  mutations: {
    SET_DESIGNERS: (state, designers) => {
      state.designers = designers
    },
    SET_WORKS: (state, works) => {
      state.works = works
    },
    SET_PROJECTS: (state, projects) => {
      state.projects = projects
    }
  },

  actions: {
    getIndexDesigners ({ commit, state }) {
      if (state.designers.length) return Promise.resolve()
      return getDesigners().then(({ data: { data } }) => {
        commit('SET_DESIGNERS', data)
      })
    },
    getIndexWorks ({ commit, state }) {
      if (state.works.length) return Promise.resolve()
      return getWorks().then(({ data: { data } }) => {
        commit('SET_WORKS', data)
      })
    },
    getIndexProjects ({ commit, state }) {
      if (state.projects.length) return Promise.resolve()
      return getProjects().then(({ data: { data } }) => {
        commit('SET_PROJECTS', data)
      })
    }
  }
}

export default index
