import {JSDOM} from 'jsdom';
import log from '../log.mjs';
import {getPersonDetailsForCounty} from './countySpecifics.mjs';

export async function personDetails(send, persons, county){
  log('### person details');

  const service = getPersonDetailsForCounty(county);

  const boendeForm = persons.map((person, index) => {
    const i = {};
    i[`Customers[${index}].BookingCustomerId`] = 0;
    i[`Customers[${index}].BookingFieldValues[0].Value`] = person.first ?? ''
    i[`Customers[${index}].BookingFieldValues[0].BookingFieldId`] = 5
    i[`Customers[${index}].BookingFieldValues[0].BookingFieldTextName`] = 'BF_2_FÖRNAMN'
    i[`Customers[${index}].BookingFieldValues[0].FieldTypeId`] = 1
    i[`Customers[${index}].BookingFieldValues[1].Value`] = person.last ?? ''
    i[`Customers[${index}].BookingFieldValues[1].BookingFieldId`] = 6
    i[`Customers[${index}].BookingFieldValues[1].BookingFieldTextName`] = 'BF_2_EFTERNAMN'
    i[`Customers[${index}].BookingFieldValues[1].FieldTypeId`] = 1
    i[`Customers[${index}].Services[0].IsSelected`] = true
    i[`Customers[${index}].Services[0].ServiceId`] = service.serviceId0
    i[`Customers[${index}].Services[0].ServiceTextName`] = service.serviceText0
    i[`Customers[${index}].Services[1].IsSelected`] = false
    i[`Customers[${index}].Services[1].ServiceId`] = service.serviceId1
    i[`Customers[${index}].Services[1].ServiceTextName`] = service.serviceText1

    return i;
  }).reduce((r, i) => ({...r, ...i}), {'Next': 'Nästa'});

  const res4 = await send(boendeForm);

  const dom4 = new JSDOM(res4.body);
  log('H1:', dom4.window.document.querySelector('h1').textContent);
}

export default personDetails;
