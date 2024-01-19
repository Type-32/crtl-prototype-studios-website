import { createRouter, createWebHistory } from 'vue-router'
import LandingView from "@/views/LandingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingView
    },
    {
      path: '/404',
      name: '404',
      component: LandingView
    }
  ]
})

export default router
