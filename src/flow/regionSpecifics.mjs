export function getPersonDetailsForRegion(region){
  return personDetailsServices[region.toLowerCase()];
}

export function getServiceGroupIdsForRegion(region){
  return serviceGroupIds[region.toLowerCase()];
}

const personDetailsServices = {
  blekinge:{
    serviceId0: 76,
    serviceText0: 'SERVICE_2_PASSANSÖKANBLEKING',
    serviceId1: 75,
    serviceText1: 'SERVICE_2_ID-KORTBLEKINGE',
  },
  dalarna:{
    serviceId0: 27,
    serviceText0: 'SERVICE_2_PASSANSÖKANDALARNA',
    serviceId1: 26,
    serviceText1: 'SERVICE_2_ID-KORTDALARNA',
  },
  gotland:{
    serviceId0: 33,
    serviceText0: 'SERVICE_2_PASSANSÖKANSTOCKHOLM',
    serviceId1: 32,
    serviceText1: 'SERVICE_2_ID-KORTSTOCKHOLM',
  },
  gavleborg: {
    serviceId0: 29,
    serviceText0: 'SERVICE_2_PASSANSÖKANGÄVLEBORG',
    serviceId1: 28,
    serviceText1: 'SERVICE_2_ID-KORTGÄVLEBORG',
  },
  halland:{
    serviceId0: 67,
    serviceText0: 'SERVICE_2_PASSANSÖKANHALLAND',
    serviceId1: 66,
    serviceText1: 'SERVICE_2_ID-KORTHALLAND',
  },
  jamtland:{
    serviceId0: 31,
    serviceText0: 'SERVICE_2_PASSANSÖKANJÄMTLAND',
    serviceId1: 30,
    serviceText1: 'SERVICE_2_ID-KORTJÄMTLAND',
  },
  jonkoping: { // This one is listed in opposite order on web, hope it works anyway.
    serviceId0: 64,
    serviceText0: 'SERVICE_2_PASSANSÖKANJÖNKÖPING',
    serviceId1: 63,
    serviceText1: 'SERVICE_2_ID-KORTJÖNKÖPING',
  },
  kalmar: { // This one is listed in opposite order on web, hope it works anyway.
    serviceId0: 72,
    serviceText0: 'SERVICE_2_PASSANSÖKANJÖNKÖPING',
    serviceId1: 73,
    serviceText1: 'SERVICE_2_ID-KORTJÖNKÖPING',
  },
  kronoberg: {
    serviceId0: 71,
    serviceText0: 'SERVICE_2_PASSANSÖKANKRONOBERG',
    serviceId1: 70,
    serviceText1: 'SERVICE_2_ID-KORTKRONOBERG',
  },
  norrbotten: {
    serviceId0: 54,
    serviceText0: 'SERVICE_2_PASSANSÖKANNORRBOTTEN',
    serviceId1: 53,
    serviceText1: 'SERVICE_2_ID-KORTNORRBOTTEN',
  },
  skane: {
    serviceId0: 79,
    serviceText0: 'SERVICE_2_PASSANSÖKANSKÅNE',
    serviceId1: 78,
    serviceText1: 'SERVICE_2_ID-KORTSKÅNE',
  },
  sodermanland:{
    serviceId0: 62,
    serviceText0: 'SERVICE_2_PASSANSÖKANSÖDERMANLAND',
    serviceId1: 61,
    serviceText1: 'SERVICE_2_ID-KORTSÖDERMANLAND',
  },
  stockholm: {
    serviceId0: 52,
    serviceText0: 'SERVICE_2_PASSANSÖKANSTOCKHOLMS',
    serviceId1: 48,
    serviceText1: 'SERVICE_2_ID-KORTSTOCKHOLMS',
  },
  uppsala: {
    serviceId0: 25,
    serviceText0: 'SERVICE_2_PASSANSÖKANUPPSALA',
    serviceId1: 24,
    serviceText1: 'SERVICE_2_ID-KORTUPPSALA',
  },
  varmland:{
    serviceId0: 23,
    serviceText0: 'SERVICE_2_PASSANSÖKANVÄRMLAND',
    serviceId1: 22,
    serviceText1: 'SERVICE_2_ID-KORTVÄSTRAVÄRMLAND',
  },
  vasterbotten: {
    serviceId0: 35,
    serviceText0: 'SERVICE_2_PASSANSÖKANVÄSTERBOTTEN',
    serviceId1: 34,
    serviceText1: 'SERVICE_2_ID-KORTVÄSTERBOTTEN',
  },
  vasternorrland: {
    serviceId0: 37,
    serviceText0: 'SERVICE_2_PASSANSÖKANVÄSTERNORRLAND',
    serviceId1: 36,
    serviceText1: 'SERVICE_2_ID-KORTVÄSTERBOTTENORRLAND',
  },
  vastmanland: {
    serviceId0: 3,
    serviceText0: 'SERVICE_2_PASSANSÖKAN',
    serviceId1: 2,
    serviceText1: 'SERVICE_2_ID-KORT',
  },
  vastragotaland: {
    serviceId0: 42,
    serviceText0: 'SERVICE_2_PASSANSÖKANVÄSTRAGÖTALAND',
    serviceId1: 41,
    serviceText1: 'SERVICE_2_ID-KORTVÄSTRAGÖTALAND',
  },
  orebro: {
    serviceId0: 39,
    serviceText0: 'SERVICE_2_PASSANSÖKANÖREBRO',
    serviceId1: 38,
    serviceText1: 'SERVICE_2_ID-KORTÖREBRO',
  },
  ostergotland:{
    serviceId0: 58,
    serviceText0: 'SERVICE_2_PASSANSÖKANÖSTERGÖTLAND',
    serviceId1: 57,
    serviceText1: 'SERVICE_2_ID-KORTÖSTERGÖTLAND',
  }
}

const serviceGroupIds = {
  bleking: 74,
  dalarna: 15,
  gotland: 21,
  gavleborg: 19,
  halland: 65,
  jamtland: 18,
  jonkoping: 59,
  kalmar: 69,
  kronoberg: 68,
  norrbotten: 53,
  skane: 77,
  sodermanland: 60,
  stockholm: 47,
  uppsala: 20,
  varmland: 16,
  vasterbotten: 13,
  vasternorrland: 14,
  vastmanland: 1,
  vastragotaland: 40,
  orebro: 17,
  ostergotland: 56,
}