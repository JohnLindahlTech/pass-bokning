import jsonfile from 'jsonfile';
import {writeFile} from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import log from '../log.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DIR_PATH = join(__dirname,'../../result');
const SUCCESS_FILE = 'success.json';
const CONFIG_FILE = 'config.json';

const SUCCESS_PATH = join(DIR_PATH, SUCCESS_FILE);
const CONFIG_PATH = join(DIR_PATH, CONFIG_FILE);


export async function writeSuccess(result, path = SUCCESS_PATH){
  await jsonfile.writeFile(path, result, {spaces: 2});
}

export async function readSuccess(path = SUCCESS_PATH){
  return jsonfile.readFile(path);
}

export async function readConfig(path = CONFIG_PATH){
  const file = await jsonfile.readFile(path);
  if(!file.region && file.county){
    log(`*** WARNING *** you are using the deprecated 'config.county' you should change it to 'config.region' in result/config.json`)
    file.region = file.county;
  }
  return file;
}

export async function writeFilename(filename, data){
  return writeFile(join(DIR_PATH, filename), data);
}