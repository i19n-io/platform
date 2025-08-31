import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/core/layouts/layout-default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('~/core/pages/page-home.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('~/core/pages/page-error-not-found.vue'),
  },
]

export default routes
