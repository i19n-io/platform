import type { RouteRecordRaw } from 'vue-router'

import { authRoutes } from '~/auth/routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/shared/layouts/layout-default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('~/core/pages/page-home.vue'),
      },
    ],
  },

  ...authRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('~/core/pages/page-error-not-found.vue'),
  },
]

export default routes
