import {JSDOM} from 'jsdom';
import log from '../log.mjs';

export async function approveTOC(post, numberOfPeople, debug){
  // Dataskyddsinformation
  debug('### Approve TOC');

  const res3 = await post({
    AgreementText: 'För att kunna genomföra tidsbokning för ansökan om pass och/eller id-kort krävs att dina personuppgifter behandlas. Det är nödvändigt för att Polismyndigheten ska kunna utföra de uppgifter som följer av passförordningen (1979:664) och förordningen (2006:661) om nationellt identitetskort och som ett led i myndighetsutövning. För att åtgärda eventuellt uppkomna fel kan också systemleverantören komma att nås av personuppgifterna. Samtliga uppgifter raderas ur tidsbokningssystemet dagen efter besöket.',
    AcceptInformationStorage: true,
    NumberOfPeople: numberOfPeople,
    Next: 'Nästa'
  });
  const dom3 = new JSDOM(res3.body);
  debug('H1:', dom3.window.document.querySelector('h1').textContent);
}

export default approveTOC;