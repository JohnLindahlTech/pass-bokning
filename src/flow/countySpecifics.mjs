export function getPersonDetailsForCounty(county){
  return personDetailsServices[county.toLowerCase()];
}

export function getServiceGroupIdsForCounty(county){
  return serviceGroupIds[county.toLowerCase()];
}

const personDetailsServices = {
  'uppsala':{
    serviceId0: 25,
    serviceText0: 'SERVICE_2_PASSANSÖKANUPPSALA',
    serviceId1: 24,
    serviceText1: 'SERVICE_2_ID-KORTUPPSALA',
  },
  'stockholm': {
    serviceId0: 52,
    serviceText0: 'SERVICE_2_PASSANSÖKANSTOCKHOLMS',
    serviceId1: 48,
    serviceText1: 'SERVICE_2_ID-KORTSTOCKHOLMS',
  },
  'vastragotaland': {
    serviceId0: 42,
    serviceText0: 'SERVICE_2_PASSANSÖKANVÄSTRAGÖTALAND',
    serviceId1: 41,
    serviceText1: 'SERVICE_2_ID-KORTVÄSTRAGÖTALAND	',
  }
}

const serviceGroupIds = {
  'uppsala': 20,
  'stockholm': 47,
  'vastragotaland': 40
}