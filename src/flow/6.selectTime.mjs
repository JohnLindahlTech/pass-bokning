import {JSDOM} from 'jsdom';
import {lightFormat} from 'date-fns';
import log from '../log.mjs';

async function sendTime(send, numberOfPeople, selectedTime){
  const {sectionId, fromDateTime, serviceTypeId} = selectedTime;

  const form = {
    FormId: 2,
    ReservedServiceTypeId: serviceTypeId,
    ReservedSectionId: sectionId,
    NQServiceTypeId: 1,
    SectionId: sectionId,
    FromDateString: lightFormat(fromDateTime, 'yyyy-MM-dd'),
    NumberOfPeople: numberOfPeople,
    SearchTimeHour: 8,
    RegionId: 0,
    ReservedDateTime: lightFormat(fromDateTime, 'yyyy-MM-dd HH:mm:ss'),
    Next: 'Nästa',
  }
  const res4 = await send(form);
  return res4;
}


export async function selectTime(send, numberOfPeople, availableTimes){
  // Select Time
  log('### Select Time');
  let res4;
  let succefulTime;
  for(const timeToTry of availableTimes){
    try{
      res4 = await sendTime(send, numberOfPeople, timeToTry);
      succefulTime = timeToTry;
      break;
    } catch(error){
      if(error.statusCode === 418){
        continue;
      }
      throw error;
    }
  }
  log(succefulTime);
  const dom4 = new JSDOM(res4.body);
  log('H1:', dom4.window.document.querySelector('h1').textContent);
  return succefulTime;
}

export default selectTime;