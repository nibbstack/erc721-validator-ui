import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      contract: null,
      token: null
    },
    mutations: {
      setContract(state, address) {
        state.contract = address
      },
      setToken(state, token) {
        state.token = token
      }
    },
    actions: {
      reset ({ commit }) {
        commit('setToken', null)
        commit('setContract', null)
      }
    }
  })
}

export default store