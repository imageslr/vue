import { getLocale, setLocale } from '@/lang'

const app = {
  state: {
    language: getLocale()
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      setLocale(language)
    }
  },
  actions: {
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
