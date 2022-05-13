import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/Home/index.vue'
import About from '../views/About/index.vue'
import InvalidRoute from '../views/Invalid/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: "/:catchAll(.*)",
    name: 'Invalid',
    component: InvalidRoute
  }
]

const router = createRouter({
  history: import.meta.env.MODE === 'production' ? createWebHashHistory() : createWebHistory(), // Using webhash history when in production (i.e when built for electron app)
  routes,
  scrollBehavior() {
    window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  }
})

export default router
