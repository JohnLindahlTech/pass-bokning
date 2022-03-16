import {JSDOM} from 'jsdom';
import log from '../log.mjs';

export async function start(client, endpoint){
  // Startpage för att sätta kaka
  log('### Starting Session, set cookie');
  const res1 = await client(endpoint);
  log(`POST: ${res1.statusCode} - ${res1.headers.location}`);
  const dom1 = new JSDOM(res1.body);
  log('H1:', dom1.window.document.querySelector('h1').textContent);
}

export default start;