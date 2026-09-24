import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig, globalIgnores } from 'eslint/config'

// eslint-config-next 16 ships flat configs, so no FlatCompat bridge.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-plugin-react 7 detects the React version through an API ESLint 10
  // removed (context.getFilename); naming the version skips the detection.
  { settings: { react: { version: '19.2' } } },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts'])
])
