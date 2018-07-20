import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      showTokenValidator: false,
      showTransferValidator: false,
      contract: null
    },
    mutations: {
      showTokenValidator(state, open) {
        state.showTokenValidator = open
      },
      showTransferValidator(state, open) {
        state.showTransferValidator = open
      },
      setContract(state, address) {
        state.contract = address
      }
    }
  })
}

export default store