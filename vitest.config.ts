/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react() as any],
  test: {
		environment: 'jsdom',globals: true,
		setupFiles: './src/setupTests.ts',
    include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx', 'scripts/**/*.spec.ts',],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    coverage: {
      include: ['src/**/*'],
      reporter: ['html'],
			provider: 'v8',
    },
  },
})