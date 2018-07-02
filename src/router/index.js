import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/Signup'
import Welcome from '@/components/Welcome'
import Layout from '@/components/Layout'
import Homepage from '@/components/Homepage'
import News from '@/components/News'
import store from '../store/store.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Dashboard,
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/signup',
          name: 'signup',
          component: Signup
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Layout,
          children: [
            {
              path: '/homepage',
              name: 'homepage',
              component: Homepage
            },
            {
              path: '/news',
              name: 'news',
              component: News
            }
          ]
        }
      ]
    }
  ]
})

router.afterEach((to, from) => {
  store.commit('updateview', to.name)
})


router.beforeEach((to, from, next) => {

  if (typeof store.state.pseudo === 'undefined')
  {
    if (to.name === 'root' || to.name === 'welcome' || to.name === 'signup') 
    {
      next()
    }
    else 
    {
      next({name: 'root'})
    }
  }  
  else
  {
    if (to.name === 'root' || to.name === 'welcome' || to.name === 'signup') 
    {
      next({name: 'homepage'})
    }
    else 
    {
      next()
    }
  }
})

export default router
