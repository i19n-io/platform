import type { RouteRecordInfo, RouteRecordRaw } from 'vue-router'

export interface AuthRoutes {
  'auth-login': RouteRecordInfo<
    'auth-login',
    '/login',
    Record<never, never>,
    Record<never, never>
  >
}

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/shared/layouts/layout-empty.vue'),
    children: [
      {
        path: 'login',
        name: 'auth-login',
        component: () => import('./page-login.vue'),
      },
    ],
  },
]
