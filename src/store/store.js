import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pseudo: undefined,
    dashboardview: undefined,
    contentview: 'homepage'
  },

  mutations: {
    register (state, _pseudo) 
    {
      state.pseudo = _pseudo
      state.dashboardview = 'layout'
    },
    deregister (state)
    {
      state.pseudo = undefined
      state.dashboardview = 'newuser'
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
    },
    contentState: state => {
      return state.contentview
    }
  }
})
