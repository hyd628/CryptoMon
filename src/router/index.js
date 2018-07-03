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
      name: 'Root',
      component: Dashboard,
      children: [
        {
          path: '/welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: '/signup',
          name: 'Signup',
          component: Signup
        },
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Layout,
          children: [
            {
              path: '/home',
              name: 'Home',
              component: Homepage
            },
            {
              path: '/news',
              name: 'News',
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
    if (to.name === 'Root' || to.name === 'Welcome' || to.name === 'Signup') 
    {
      next()
    }
    else 
    {
      next({name: 'Root'})
    }
  }  
  else
  {
    if (to.name === 'Root' || to.name === 'Welcome' || to.name === 'Signup') 
    {
      next({name: 'Home'})
    }
    else 
    {
      next()
    }
  }
})

export default router
