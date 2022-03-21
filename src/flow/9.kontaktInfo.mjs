import {JSDOM} from 'jsdom';

export async function contactInfo(post, contact, debug){
  debug('### Contact info');

  const {email, phone} = contact;

  const res2 = await post({
    EmailAddress: email ?? '',
    ConfirmEmailAddress: email ?? '',
    PhoneNumber: phone ?? '',
    ConfirmPhoneNumber: phone ?? '',
    'SelectedContacts[0].IsSelected': !!email,
    'SelectedContacts[0].MessageTypeId': 2,
    'SelectedContacts[0].MessageKindId': 1,
    'SelectedContacts[0].TextName': 'MESSAGETYPE_EMAIL',

    'SelectedContacts[1].IsSelected': !!phone,
    'SelectedContacts[1].MessageTypeId': 1,
    'SelectedContacts[1].MessageKindId': 1,
    'SelectedContacts[1].TextName': 'MESSAGETYPE_SMS',

    'SelectedContacts[2].IsSelected': !!email,
    'SelectedContacts[2].MessageTypeId': 2,
    'SelectedContacts[2].MessageKindId': 2,
    'SelectedContacts[2].TextName': 'MESSAGETYPE_EMAIL',

    'SelectedContacts[3].IsSelected': !!phone,
    'SelectedContacts[3].MessageTypeId': 1,
    'SelectedContacts[3].MessageKindId': 2,
    'SelectedContacts[3].TextName': 'MESSAGETYPE_SMS',
    ReminderOption: 24,
    Next: 'Nästa'
  });

  const dom2 = new JSDOM(res2.body);
  debug('H1:', dom2.window.document.querySelector('h1')?.textContent);
}

export default contactInfo;
