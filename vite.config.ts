import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

/**
		"@sentry/react": "8.41.0",
		"@sentry/vite-plugin": "2.22.6",
 * 
 */
// let getSentryPlugin = () => {
//   return sentryVitePlugin({
//     org: "selfrefactor",
//     project: "select-correct-word",
// 		telemetry: false,
//   })
// }

/**
 https://docs.sentry.io/platforms/javascript/guides/react/sourcemaps/uploading/vite/
 */
export default defineConfig({
	plugins: [react(), tailwindcss()],

	build: {
		sourcemap: true,
		rollupOptions: {
			onwarn(warning, defaultHandler) {
				if (warning.code === 'SOURCEMAP_ERROR') {
					return;
				}

				defaultHandler(warning);
			},
		},
	},
});
