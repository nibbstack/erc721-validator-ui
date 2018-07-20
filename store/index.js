import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      contract: null,
      token: null,
      giver: '0xa0139F5Ab522c86D7F377336c50EEFCD6cAf696E'
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