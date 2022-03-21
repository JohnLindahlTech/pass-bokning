import {JSDOM} from 'jsdom';
import {isAfter, lightFormat, formatISO, parse, isEqual} from 'date-fns';
import log from '../log.mjs';

let previousTime;

export function findFreeTimes(dom){
  const nodes = [...dom.window.document.querySelectorAll('div[data-function=timeTableCell]')]
    .filter(n => n.textContent.trim().toLowerCase() !== 'bokad')
    .map(n => ({sectionId: n.attributes['data-sectionId'].value, fromDateTime: n.attributes['data-fromdatetime'].value, serviceTypeId: n.attributes['data-servicetypeid'].value}))
    .map(n => ({...n, fromDateTime: parse(n.fromDateTime, 'yyyy-MM-dd HH:mm:ss', new Date())}))
  
  return nodes;
}

export function findDatePickerDate(dom){
  const input = dom.window.document.querySelector('input#datepicker');
  return parse(input.value, 'yyyy-MM-dd', new Date());
}

export async function pickTime(post, numberOfPeople, sectionId, startDate, endDate, debug){
  
  // Välj Tid
  debug('### pick time');

  const time = {
    FormId: 1,
    NumberOfPeople: numberOfPeople,
    RegionId: 0, // Is 0 uppsala or is everything 0?
    SectionId: sectionId, // Specific section => specific pass-expedition
    NQServiceTypeId: 1,
    FromDateString: lightFormat(startDate, 'yyyy-MM-dd'),
    SearchTimeHour: 9,
    TimeSearchFirstAvailableButton: 'Första lediga tid',
  }

  const res5 = await post(time);

  const dom = new JSDOM(res5.body);
  debug('H1:', dom.window.document.querySelector('h1')?.textContent);
  const times = findFreeTimes(dom).filter((t) => isAfter(t.fromDateTime, startDate));
  const current = findDatePickerDate(dom);
  if(times.length){
    // We found some times on this page.
    const [first] = times;
    debug(`Next available time: ${formatISO(first.fromDateTime)} @station:${first.sectionId} (ServiceTypeId: ${first.serviceTypeId})`);
    if(!isEqual(first.fromDateTime, previousTime?.fromDateTime) || previousTime?.sectionId !== first.sectionId){
      previousTime = first;
      log(`Next available time: ${formatISO(first.fromDateTime)} @station:${first.sectionId} (ServiceTypeId: ${first.serviceTypeId})`);
    }
 
    if(isAfter(first.fromDateTime, endDate)){
      // Too late, we do not care anyway, lets stop this.
      return undefined;
    }
    // Pick the first time.
    return times;
  }
  if(isAfter(current, endDate)){
    // Too late, we do not care anyway, lets stop this.
    return undefined;
  }
  // This page did not have anything for us, lets continue the search recursively from current viewed date.
  return pickTime(post, numberOfPeople, sectionId, current, endDate, debug);
}

export default pickTime;