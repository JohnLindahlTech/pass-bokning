import got from 'got';
import {CookieJar} from 'tough-cookie';
import { startOfTomorrow } from 'date-fns';
import { exit } from 'process';
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
import log from './log.mjs';

const livingInSwedenCategory = 2;

const startDate = startOfTomorrow();

const domain = 'https://bokapass.nemoq.se';
const prefix = 'Booking/Booking';
const index = 'Index';
const next = 'Next';

const serviceGroupIds = {
  'uppsala': 20,
  'stockholm': 47,
}

function delay(t, v) {
  return new Promise(function(resolve) { 
      setTimeout(resolve.bind(null, v), t)
  });
}

function createPost(client, endpoint){
  return async form => {
    const post = await client.post(endpoint, {
      form,
    });
  
    log(`POST: ${post.statusCode} - ${post.headers.location}`);
    if(post.statusCode !== 302){
      const error = new Error('Post was not a redirect');
      error.statusCode = 418; // Does not matter
      throw error;
    }
    const res = await client.get(post.headers.location.replace(/^\//, ''));
    log(`GET: ${res.statusCode} - ${res.headers.location}`);
    return res;
  }
}


async function main(){
  const config = await readConfig();
  const {persons, contact, station, county, endDate, } = config;
  log(config);
  const cookieJar = new CookieJar();
  const client = got.extend({
    prefixUrl: domain,
    followRedirect: false,
    headers: {
      Origin: domain,
      Referer: `${domain}/${prefix}/${index}/${county}`,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
    },
    cookieJar,
  })


  const startpoint = `${prefix}/${index}/${county}`;
  const endpoint = `${prefix}/${next}/${county}`;
  const post = createPost(client, endpoint);
  try{
    const successFile = await readSuccess();
    if(successFile?.result?.bookingNumber){
      log('Already done, nothing to do here!');
      exit(0);
    }
  } catch(e){
    if(e.code !== 'ENOENT'){
      throw e;
    }
    // File does not exist, which is fine, lets continue.
  }
  log('No previous successfile, lets do this!')
  await start(client, startpoint);
  // await delay(3000);
  await initForm(post, serviceGroupIds[county.toLowerCase()])
  // await delay(3000);
  await approveTOC(post, persons.length);
  // await delay(3000);
  await accLivingInSweden(post, persons, livingInSwedenCategory);
  // await delay(3000);
  const foundValidDates = await pickTime(post, persons.length, station, startDate, new Date(endDate));
  if(!foundValidDates?.length){
    console.error('*******************************');
    console.error('***** Found no valid time *****');
    console.error('*******************************');
    // No times available before our time-limit, lets stop this.
    exit(1);
  }
  const foundValidDate = await selectTime(post, persons.length, foundValidDates);
  // await delay(3000);
  await personDetails(post, persons, county);
  // await delay(3000);
  await importantInfo(post);
  // await delay(3000);
  await contactInfo(post, contact);
  // await delay(3000);
  const result = await confirm(post, persons);

  console.error('##########################');
  console.error('##### GREAT SUCCESS! #####');
  console.error('##########################');

  writeSuccess({result, contact, persons, startDate, station, endDate, county, foundDate: foundValidDate });
}

main().then(log, console.error);