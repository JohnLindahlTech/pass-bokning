export function getPersonDetailsForRegion(region){
  return personDetailsServices[region.toLowerCase()];
}

export function getServiceGroupIdsForRegion(region){
  return serviceGroupIds[region.toLowerCase()];
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
    serviceText1: 'SERVICE_2_ID-KORTVÄSTRAGÖTALAND',
  },
  'skane': {
    serviceId0: 79,
    serviceText0: 'SERVICE_2_PASSANSÖKANSKÅNE',
    serviceId1: 78,
    serviceText1: 'SERVICE_2_ID-KORTSKÅNE',
  }
}

const serviceGroupIds = {
  'uppsala': 20,
  'stockholm': 47,
  'vastragotaland': 40,
  'skane': 77
}