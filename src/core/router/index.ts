import { defineRouter } from '#q-app/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'

import { authRoutes, type AuthRoutes } from '~/auth/routes'
import { settingsRoutes, type SettingsRoutes } from '~/settings/routes'

declare module 'vue-router' {
  interface TypesConfig {
    RouteNamedMap: AuthRoutes & SettingsRoutes
  }
}

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
  ...settingsRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('~/core/pages/page-error-not-found.vue'),
  },
]

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  return Router
})
