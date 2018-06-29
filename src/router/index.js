import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/Signup'
import Welcome from '@/components/Welcome'
import Layout from '@/components/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Dashboard,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: '/welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: '/signup',
          name: 'signup',
          component: Signup
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Layout
        }
      ]
    }
  ]
})
