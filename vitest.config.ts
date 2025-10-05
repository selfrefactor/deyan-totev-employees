/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react() as any],
  test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/config/setupTests.ts',
    include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    coverage: {
      include: ['src/**/*'],
      reporter: ['html'],
			provider: 'v8',
    },
  },
})