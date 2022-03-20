import {JSDOM} from 'jsdom';

export async function importantInfo(post, debug){
  debug('### Important Info');

  const res2 = await post({
    Next: 'Nästa'
  });

  const dom2 = new JSDOM(res2.body);
  debug('H1:', dom2.window.document.querySelector('h1')?.textContent);
}

export default importantInfo;