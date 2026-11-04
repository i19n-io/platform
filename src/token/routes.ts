import type { RouteRecordInfo, RouteRecordRaw } from 'vue-router'

export interface TokenRoutes {
  'token-list': RouteRecordInfo<
    'token-list',
    '/tokens',
    Record<string, never>,
    Record<string, never>
  >
}

export const tokenRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/shared/layouts/layout-default.vue'),
    children: [
      {
        path: 'tokens',
        name: 'token-list',
        component: () => import('./page-list.vue'),
      },
    ],
  },
]
