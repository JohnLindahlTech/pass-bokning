import {JSDOM} from 'jsdom';
import log from '../log.mjs';

export async function initForm(post, serviceGroupId){
  // Boka tid
  log('### InitForm');

  if(!serviceGroupId){
    throw new Error('Missing serviceGroupId')
  }

  const res2 = await post({
    FormId: 1,
    ServiceGroupId: serviceGroupId,
    StartNextButton: 'Boka ny tid'
  });

  const dom2 = new JSDOM(res2.body);
  log('H1:', dom2.window.document.querySelector('h1').textContent);
}

export default initForm;