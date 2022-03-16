import jsonfile from 'jsonfile';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DIR_PATH = join(__dirname,'../../result');
const SUCCESS_FILE = 'success.json';
const CONFIG_FILE = 'config.json';

const SUCCESS_PATH = join(DIR_PATH, SUCCESS_FILE);
const CONFIG_PATH = join(DIR_PATH, CONFIG_FILE);


export async function writeSuccess(result){
  await jsonfile.writeFile(SUCCESS_PATH, result, {spaces: 2});
}

export async function readSuccess(){
  return jsonfile.readFile(SUCCESS_PATH);
}

export async function readConfig(){
  return jsonfile.readFile(CONFIG_PATH);
}

