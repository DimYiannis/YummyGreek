import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Details from '../views/Details.vue'
import Order from '../views/Order.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/details/:dataToReceive',
      name: 'details',
      component: Details,
    
    },
    {
      path: '/orders',
      name: 'orders',
      component: Order
    },
    

  ]
})

export default router
