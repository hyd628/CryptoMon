import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userNotFoundHash = '9C1FB859-E440-4E35-A8C7-96E71BDE37FA'

export default new Vuex.Store({
  state: {
    pseudo: undefined,
    dashboardview: undefined
  },

  mutations: {
    register (state, _pseudo) 
    {
      state.pseudo = _pseudo
      state.dashboardview = 'userfront'
    },
    deregister (state)
    {
      state.pseudo = userNotFoundHash
      state.dashboardview = 'nouserfront'
    },
    signup (state)
    {
      state.dashboardview = 'signup'
    }
  },

  actions: {},
  getters: {
    userExists: state => {
      return (typeof state.pseudo !== 'undefined' && state.pseudo !== userNotFoundHash)
    },

    userDoesntExist: state => {
      return (typeof state.pseudo !== 'undefined' && state.pseudo == userNotFoundHash)
    },

    dashboardState: state => {
      return state.dashboardview
    }
  }
})
