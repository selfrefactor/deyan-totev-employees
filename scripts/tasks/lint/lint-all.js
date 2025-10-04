import { exec, scanFolder } from 'helpers-fn';
import { flatten, mapAsync, pipedAsync, uniq } from 'rambdax';
import { CONFIG_KEYS, cwd } from '../constants.js';
import { getConfig } from '../get-config.js';

void (async function lintAll() {
	const lintFolders = await getConfig(CONFIG_KEYS.LINT_FOLDERS);
	const lintExtensions = await getConfig(CONFIG_KEYS.LINT_EXTENSIONS);
	const filterFn = (path) => {
		return lintExtensions.some((ext) => path.endsWith(ext));
	};
	const files = await pipedAsync(
		lintFolders,
		mapAsync(async (folder) => {
			const foundFiles = await scanFolder({
				folder: `${ cwd }/${ folder }`,
				filterFn,
			});

			return foundFiles;
		}),
		flatten,
		uniq
	);

	await exec({
		cwd: process.cwd(),
		command: `yarn lint:files ${files.join(' ')}`,
	});
})();
