import {JSDOM} from 'jsdom';

export async function importantInfo(post){
  console.log('### Important Info');

  const res2 = await post({
    Next: 'Nästa'
  });

  const dom2 = new JSDOM(res2.body);
  console.log('H1:', dom2.window.document.querySelector('h1').textContent);
}

export default importantInfo;