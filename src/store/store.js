import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pseudo: undefined,
    layoutview: 'Home'
  },

  newsData: [
    {
      title: 'News Item 1',
      content: 'blah blah blah',
      date: 'June 11, 2018'
    },
    {
      title: 'News Item 2',
      content: 'blah blah blah',
      date: 'June 10, 2018'
    }
  ],

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
