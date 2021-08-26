import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue'
import store from '@/store'
import Tabs from '../views/Tabs.vue'

const authGuard = (to: any, from: any, next: any) => {
  if (store.getters['user/isAuthenticated']) {
      next()
  } else {
    next("/login")
  }
};

const loginGuard = (to: any, from: any, next: any) => {
  if (!store.getters['user/isAuthenticated']) {
      next()
  } else {
    next("/")
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/picklists'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/picklists'
      },
      {
        path: 'picklists',
        component: () => import('@/views/Picklists.vue'),
        beforeEnter: authGuard
      },
      {
        path: 'settings',
        component: () => import('@/views/Settings.vue'),
        beforeEnter: authGuard
      },
    ]
  },
  {
    path: '/picklist-details/:id',
    component: () => import('@/views/Picklist-Detail.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loginGuard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
