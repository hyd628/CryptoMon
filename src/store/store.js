import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
      state.pseudo = undefined
      state.dashboardview = 'nouserfront'
    },
    signup (state)
    {
      state.dashboardview = 'signup'
    }
  },

  actions: {},

  getters: {
    dashboardState: state => {
      return state.dashboardview
    }
  }
})
