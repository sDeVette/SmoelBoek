import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import Signup from './views/Signup.vue'
import Profile from './views/Profile.vue'
import Feed from './views/Feed.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/signup',
          name: 'signup',
          component: Signup
        },
        {
          path: '/profile',
          name: 'profile',
          component: Profile
        },
        {
          path: '/feed',
          name: 'feed',
          component: Feed
        },
        {
          path: '/about',
          name: 'about',
          component: About
        }
      ]
    }
  ]
})
