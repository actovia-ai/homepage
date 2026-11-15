import { cloudflare } from '@cloudflare/vite-plugin'
import { workersCacheCdnAdapter } from '@vinext/cloudflare/cache/workers-cache-cdn-adapter'
import { fumadocsMdx } from 'fumadocs-mdx/vite'
import { createHash } from 'node:crypto'
import path from 'node:path'
import vinext from 'vinext'
import { defineConfig } from 'vite'
import { patchCssModules } from 'vite-css-modules'

export default defineConfig({
  plugins: [
    fumadocsMdx(),
    patchCssModules({ exportMode: 'default' }),
    vinext({
      cache: { cdn: workersCacheCdnAdapter() }
    }),
    cloudflare({
      viteEnvironment: {
        name: 'rsc',
        childEnvironments: ['ssr']
      }
    })
  ],
  css: {
    modules: {
      generateScopedName(name: string, filename: string) {
        const relativePath = path
          .relative(import.meta.dirname, filename.replace(/\?.*$/, ''))
          .replaceAll('\\', '/')
        return `_${name}_${createHash('sha256').update(relativePath).digest('hex').slice(0, 7)}`
      }
    }
  }
})
