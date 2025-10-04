import { existsSync } from "node:fs"
import { scriptsDirectory } from "./constants.js"
import pkg from 'fs-extra';
const { readJson } = pkg;

const DEFAULT = {
	lintFolders: ['src'],
	lintExtensions: ['.ts', '.tsx'],
}

let configFilePath = `${ scriptsDirectory }/tasks-config.json`
export async function getConfig (key){
	if(!existsSync(configFilePath)){

		return DEFAULT[key]
	} 
	let config = await readJson(configFilePath)
	return config[key] || DEFAULT[key]
}