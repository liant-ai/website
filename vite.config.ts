import { defineConfig } from 'vite';
import vinext from 'vinext';
import { cloudflare } from '@cloudflare/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

type BuildWarning = {
  message?: string;
  id?: string;
};

function shouldSuppressBuildWarning(warning: BuildWarning): boolean {
  const message = warning.message ?? '';
  const id = warning.id ?? '';

  const isSourcemapNoise =
    message.includes("Error when using sourcemap for reporting an error: Can't resolve original location of error") &&
    message.includes('app/page.tsx');

  const isVinextChunkNoise =
    message.includes('is dynamically imported by') &&
    message.includes('but also statically imported by') &&
    (message.includes('virtual:vinext-app-ssr-entry') ||
      message.includes('vinext/dist/shims/') ||
      id.includes('virtual:vinext-app-ssr-entry') ||
      id.includes('vinext/dist/shims/'));

  return isSourcemapNoise || isVinextChunkNoise;
}

export default defineConfig(async () => ({
  build: {
    rollupOptions: {
      onwarn(warning: any, defaultHandler: any) {
        if (shouldSuppressBuildWarning(warning)) return;
        defaultHandler(warning);
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(rootDir),
    },
  },
  plugins: [
    vinext(),
    tsconfigPaths(),
    cloudflare({
      viteEnvironment: {
        name: 'rsc',
        childEnvironments: ['ssr'],
      },
      inspectorPort: false,
    }),
  ],
}));
