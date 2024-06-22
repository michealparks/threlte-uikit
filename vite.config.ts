import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { threlteTesting } from '@threlte/test/vite'

export default defineConfig({
  plugins: [sveltekit(), threlteTesting()],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['@preact/signals-core', 'vitest-canvas-mock'],
      },
    },
  },
})
