import { createWorkersCacheConfig } from '@vinext/cloudflare/cache/config'
import { bindings, defineConfig, defineWorker } from 'cf/config'

const cache = await createWorkersCacheConfig()

export default defineConfig({
  accountId: 'e901fe1b11b510971ce1df4c3b38a82c',
  worker: defineWorker({
    ...cache,
    name: 'actovia-homepage',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-11-14',
    compatibilityFlags: ['nodejs_compat'],
    domains: ['actovia.yancey.app'],
    observability: { enabled: true, headSamplingRate: 0.1 },
    assets: {
      htmlHandling: 'none',
      notFoundHandling: 'none',
      runWorkerFirst: ['/*', '!/_next/static/*', '!/*/_next/static/*']
    },
    env: {
      ...cache.env,
      ASSETS: bindings.assets()
    }
  })
})
