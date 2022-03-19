import got from 'got';
import {CookieJar} from 'tough-cookie';
import { startOfTomorrow } from 'date-fns';
import start from './flow/1.start.mjs';
import initForm from './flow/2.initForm.mjs';
import approveTOC from './flow/3.approveToC.mjs';
import accLivingInSweden from './flow/4.livingInSweden.mjs';
import pickTime from './flow/5.pickTime.mjs';
import { readSuccess, writeSuccess, readConfig } from './flow/io.mjs';
import selectTime from './flow/6.selectTime.mjs';
import personDetails from './flow/7.personDetails.mjs';
import importantInfo from './flow/8.importantInfo.mjs';
import contactInfo from './flow/9.kontaktInfo.mjs';
import confirm from './flow/10.confirm.mjs';
import {log, createDebug} from './log.mjs';
import {getServiceGroupIdsForRegion} from './flow/regionSpecifics.mjs';

const livingInSwedenCategory = 2;

const startDate = startOfTomorrow();

const domain = 'https://bokapass.nemoq.se';
const prefix = 'Booking/Booking';
const index = 'Index';
const next = 'Next';

function createPost(client, endpoint, debug){
  return async form => {
    const post = await client.post(endpoint, {
      form,
    });
  
    debug(`POST: ${post.statusCode} - ${post.headers.location}`);
    if(post.statusCode !== 302){
      const error = new Error('Post was not a redirect');
      error.statusCode = 418; // Does not matter
      throw error;
    }
    const res = await client.get(post.headers.location.replace(/^\//, ''));
    debug(`GET: ${res.statusCode}`);
    return res;
  }
}


export async function main(config, debug){
  const { persons, contact, station, region, endDate } = config;
  const cookieJar = new CookieJar();
  const client = got.extend({
    prefixUrl: domain,
    followRedirect: false,
    headers: {
      Origin: domain,
      Referer: `${domain}/${prefix}/${index}/${region}`,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
    },
    cookieJar,
  })


  const startpoint = `${prefix}/${index}/${region}`;
  const endpoint = `${prefix}/${next}/${region}`;
  const post = createPost(client, endpoint, debug);
  await start(client, startpoint, debug);
  await initForm(post, getServiceGroupIdsForRegion(region), debug)
  await approveTOC(post, persons.length, debug);
  await accLivingInSweden(post, persons, livingInSwedenCategory, debug);
  const foundValidDates = await pickTime(post, persons.length, station, startDate, new Date(endDate), debug);
  if(!foundValidDates?.length){
    debug('*******************************');
    debug('***** Found no valid time *****');
    debug('*******************************');
    return false
  }
  const foundValidDate = await selectTime(post, persons.length, foundValidDates, debug);
  await personDetails(post, persons, region, debug);
  await importantInfo(post, debug);
  await contactInfo(post, contact, debug);
  const result = await confirm(post, persons, debug);

  debug('##########################');
  log('##### GREAT SUCCESS! #####');
  debug('##########################');

  await writeSuccess({result, contact, persons, startDate, station, endDate, region, foundDate: foundValidDate });
  return true
}