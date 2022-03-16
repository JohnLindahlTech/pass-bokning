import {JSDOM} from 'jsdom';
import log from '../log.mjs';

export async function importantInfo(post){
  log('### Important Info');

  const res2 = await post({
    Next: 'Nästa'
  });

  const dom2 = new JSDOM(res2.body);
  log('H1:', dom2.window.document.querySelector('h1').textContent);
}

export default importantInfo;