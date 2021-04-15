import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import JobIndex from '../views/JobIndex.vue'
import RecipeDisplay from '../views/RecipeDisplay.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/jobs',
    name: 'JobIndex',
    component: JobIndex
  },
  
  {
    path: '/recipe',
    name: 'RecipeDisplay',
    component: RecipeDisplay
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
