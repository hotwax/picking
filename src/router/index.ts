import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import store from '@/store'
import Tabs from '../views/Tabs.vue'
import { Login, useAuthStore } from '@hotwax/dxp-components';
import { loader } from '@/user-utils';

const authGuard = async (to: any, from: any, next: any) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated || !store.getters['user/isAuthenticated']) {
    await loader.present('Authenticating')
    // TODO use authenticate() when support is there
    const redirectUrl = window.location.origin + '/login'
    window.location.href = `${process.env.VUE_APP_LOGIN_URL}?redirectUrl=${redirectUrl}`
    loader.dismiss()
  }
  next()
};

const loginGuard = (to: any, from: any, next: any) => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated && !to.query?.token && !to.query?.oms) {
    next('/')
  }
  next();
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
    beforeEnter: authGuard,
    props: true
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
