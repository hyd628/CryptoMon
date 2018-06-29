import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pseudo: undefined,
  },

  mutations: {
    
    register (state, _pseudo) 
    {
      state.pseudo = _pseudo
    },

    deregister (state)
    {
      state.pseudo = undefined
    }
  },

  actions: {},

  getters: {}
})
