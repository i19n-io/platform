import type { RouteRecordInfo, RouteRecordRaw } from 'vue-router'

export interface SettingRoutes {
  'setting-list': RouteRecordInfo<
    'setting-list',
    '/settings',
    Record<never, never>,
    Record<never, never>
  >
}

export const settingRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~/shared/layouts/layout-empty.vue'),
    children: [
      {
        path: 'settings',
        name: 'setting-list',
        component: () => import('./page-list.vue'),
      },
    ],
  },
]
