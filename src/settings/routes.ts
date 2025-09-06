import type { RouteRecordInfo, RouteRecordRaw } from 'vue-router'

export interface SettingsRoutes {
  settings: RouteRecordInfo<
    'settings',
    '/settings',
    Record<never, never>,
    Record<never, never>
  >
}

export const settingsRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/shared/layouts/layout-empty.vue'),
    children: [
      {
        path: 'settings',
        name: 'settings',
        component: () => import('./page-list.vue'),
      },
    ],
  },
]
