import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pseudo: undefined,
    layoutview: 'Home'
  },

  mutations: {
    
    register (state, _pseudo) 
    {
      state.pseudo = _pseudo
    },

    deregister (state)
    {
      state.pseudo = undefined
    },

    updateview (state, _view)
    {
      state.layoutview = _view
    }
  },

  actions: {},

  getters: {}
})
