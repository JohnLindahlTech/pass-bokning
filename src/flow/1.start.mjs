import {JSDOM} from 'jsdom';

export async function start(client, endpoint, debug){
  // Startpage för att sätta kaka
  debug('### Starting Session, set cookie');
  const res1 = await client(endpoint);
  debug(`POST: ${res1.statusCode} - ${res1.headers.location}`);
  const dom1 = new JSDOM(res1.body);
  debug('H1:', dom1.window.document.querySelector('h1')?.textContent);
}

export default start;