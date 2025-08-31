// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from '#q-app/wrappers'

export default defineConfig(context => ({
  // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
  // preFetch: true,

  // https://v2.quasar.dev/quasar-cli-vite/boot-files
  boot: ['i18n'],

  // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#css
  css: ['app.sass'],

  // https://github.com/quasarframework/quasar/tree/dev/extras
  extras: [
    // 'ionicons-v4',
    // 'mdi-v7',
    // 'fontawesome-v6',
    // 'eva-icons',
    // 'themify',
    // 'line-awesome',
    // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

    'roboto-font', // optional, you are not bound to it
    'material-icons', // optional, you are not bound to it
  ],

  // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#build
  build: {
    alias: {
      '~': join(import.meta.dirname, './src'),
    },

    target: {
      browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
      node: 'node24',
    },

    typescript: {
      strict: true,
      vueShim: true,
      extendTsConfig(tsConfig) {
        if (!tsConfig.compilerOptions) throw new Error('No compiler options')

        // Organize paths for better autocompletion
        tsConfig.compilerOptions.paths = {
          '~/*': ['./../src/*'],
          ...Object.fromEntries(
            Object.entries(tsConfig.compilerOptions.paths)
              .filter(
                ([k]) => k === '#q-app' || k.startsWith('#q-app/wrappers'),
              )
              .sort(([k1], [k2]) => {
                if (k1.startsWith('src')) return 1
                if (k2.startsWith('src')) return -1
                return 0
              }),
          ),
        }
      },
    },

    vueRouterMode: 'history', // available values: 'hash', 'history'
    // vueRouterBase,
    // vueDevtools: false,
    // vueOptionsAPI: false,

    // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

    // publicPath: '/',
    // analyze: true,
    // env: {},
    // rawDefine: {}
    // ignorePublicFolder: true,
    // minify: false,
    // polyfillModulePreload: true,
    // distDir

    // extendViteConf (viteConf) {},
    // viteVuePluginOptions: {},

    vitePlugins: [
      [
        '@intlify/unplugin-vue-i18n/vite',
        {
          // if you want to use named tokens in your Vue I18n messages, such as
          // 'Hello {name}', you need to set `runtimeOnly: false`
          runtimeOnly: false,

          ssr: context.modeName === 'ssr',

          // you need to set i18n resource including paths!
          include: [fileURLToPath(new URL('src/core/i18n', import.meta.url))],
        },
      ],

      [
        'vite-plugin-checker',
        {
          vueTsc: true,
          eslint: {
            /** @see `package.json`.`scripts`.`check:code` */
            lintCommand: 'eslint . --max-warnings 0',
            useFlatConfig: true,
          },
        },
        { server: false },
      ],
    ],
  },

  // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#devserver
  devServer: {
    // https: true,
    open: true, // opens browser window automatically
  },

  // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#framework
  framework: {
    config: {},

    // iconSet: 'material-icons', // Quasar icon set
    // lang: 'en-US', // Quasar language pack

    // For special cases outside of where the auto-import strategy can have an
    // impact (like functional components as one of the examples), you can manually
    // specify Quasar components/directives to be available everywhere:
    // components: [],
    // directives: [],
    // plugins: [],
  },

  // https://v2.quasar.dev/options/animations
  animations: [],

  // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#sourcefiles
  sourceFiles: {
    rootComponent: 'src/core/app.vue',
    router: 'src/core/router',
    store: 'src/core/store',
    // pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
    // pwaServiceWorker: 'src-pwa/custom-service-worker',
    // pwaManifestFile: 'src-pwa/manifest.json',
  },

  // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
  ssr: {
    // The default port that the production server should use
    // (gets superseded if process.env.PORT is specified at runtime)
    prodPort: 3000,

    middlewares: [
      'render', // keep this as last one
    ],

    // extendPackageJson (json) {},
    // extendSSRWebserverConf (esbuildConf) {},

    // manualStoreSerialization: true,
    // manualStoreSsrContextInjection: true,
    // manualStoreHydration: true,
    // manualPostHydrationTrigger: true,

    pwa: false,
    // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!

    // pwaExtendGenerateSWOptions (cfg) {},
    // pwaExtendInjectManifestOptions (cfg) {}
  },

  // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
  pwa: {
    workboxMode: 'GenerateSW',
    // swFilename: 'sw.js',
    // manifestFilename: 'manifest.json',
    // extendManifestJson (json) {},
    // useCredentialsForManifestTag: true,
    // injectPwaMetaTags: false,
    // extendPWACustomSWConf (esbuildConf) {},
    // extendGenerateSWOptions (cfg) {},
    // extendInjectManifestOptions (cfg) {}
  },

  // https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
  capacitor: {
    hideSplashscreen: true,
  },
}))
