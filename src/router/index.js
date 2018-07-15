import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/Signup'
import Welcome from '@/components/Welcome'
import Layout from '@/components/Layout'
import Home from '@/components/Home'
import News from '@/components/News'
import Account from '@/components/Account'
import Spawn from '@/components/Spawn'
import Collection from '@/components/Collection'
import Notification from '@/components/Notification'
import Transfer from '@/components/Transfer'
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
              component: Home
            },
            {
              path: '/news',
              name: 'News',
              component: News
            },
            {
              path: '/account',
              name: 'Account',
              component: Account
            },
            {
              path: '/spawn',
              name: 'Spawn',
              component: Spawn
            },
            {
              path: '/collection',
              name: 'Collection',
              component: Collection
            },
            {
              path: '/notification',
              name: 'Notification',
              component: Notification
            },
            {
              path: '/transfer',
              name: 'Transfer',
              component: Transfer
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
