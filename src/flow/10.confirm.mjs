import {JSDOM} from 'jsdom';
import log from '../log.mjs';

export function findBookingInfo(dom){
  const bookingNumber = dom.window.document.querySelector('label[for=BookingNumber] + div').textContent.trim();
  const time = dom.window.document.querySelector('label[for=BookedDateTime] + div').textContent.trim();
  const station = dom.window.document.querySelector('label[for=BookedSectionName] + div').textContent.trim();
  const task = dom.window.document.querySelector('label[for=BookedServiceTypeName] + div').textContent.trim();
  const persons = dom.window.document.querySelector('label[for=NumberOfPeople] + div').textContent.trim();
  return {
    bookingNumber,
    time,
    station,
    task,
    persons,
  }
}

export async function confirm(post, persons){
  log('### Confirm booking');

  
  const form = persons.map((_, index) => {
    const i = {};
    i[`PersonViewModel.Customers[${index}].Services[0].IsSelected`] = false
    i[`PersonViewModel.Customers[${index}].Services[1].IsSelected`] = false

    return i;
  }).reduce((r, i) => ({...r, ...i}), {
    'ContactViewModel.SelectedContacts[0].IsSelected': false,
    'ContactViewModel.SelectedContacts[1].IsSelected': false,
    'ContactViewModel.SelectedContacts[2].IsSelected': false,
    'ContactViewModel.SelectedContacts[3].IsSelected': false,
    Next: 'Bekräfta bokning'
  });

  const res2 = await post(form);

  const dom = new JSDOM(res2.body);
  log('H1:', dom.window.document.querySelector('h1').textContent);

  const result = findBookingInfo(dom);
  return result;

}

export default confirm;
