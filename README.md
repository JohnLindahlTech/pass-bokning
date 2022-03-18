# Pass bokning
This is a helper script to be able to book a time for Uppsala/Stockholm/Västra Götaland passport time.

## Requirements
Nodejs v17

## Getting started
Create a file `result/config.json`
```js
{
  "persons":[ // Amount of persons to book for. Feel free to add or remove, add empty objects if you want to be anonymous.
    {
      "first": "firstname",
      "last": "lastname"
    }
  ],
  "contact": {
    "email": "your.email@example.com",
    "phone": "0701234567"
  },
  "station": 0, // 0 = all of the passstations in the county, if you want a specific one you need to check it up.
  "county": "uppsala", // Allowed/supported: uppsala, stockholm, vastragotaland
  "endDate": "2022-05-31" // How long to allow the automated booking to work
}
```

```bash
corepack enable pnpm # Make sure pnpm exists
pnpm install # install dependencies
pnpm run start # runs the command.
```

Once the script succeeds in creating a booking it will create a file called `result/success.json` and any time you run the script with that file existing, the script will close without doing anything.


## Cron
To automate this script run with a similar crontab:
```
*/15 * * * * [PATH_TO_NODE_INSTALL]/bin/node [PATH_TO_REPO]/src/index.mjs > [PATH_TO_REPO]/result/log.txt 2>&1
```

## How to add County support

Add `personDetailsServices` & `serviceGroupIds` to [src/flow/countySpecifics.mjs](./src/flow/countySpecifics.mjs) (and make a PR to this repo).


### Find personDetailsServices

* Open [https://polisen.se/tjanster-tillstand/pass-och-nationellt-id-kort/boka-tid-hitta-passexpedition/](https://polisen.se/tjanster-tillstand/pass-och-nationellt-id-kort/boka-tid-hitta-passexpedition/)
* Navigate with the link to your county (e.g. [https://bokapass.nemoq.se/Booking/Booking/Index/uppsala](https://bokapass.nemoq.se/Booking/Booking/Index/uppsala))
* Open Networktab in dev tools (`ctrl/cmd`+`shift`+`I`), tick `Preserve Log`.
* (Optional:) Filter for `Doc`.
* Press `Boka ny tid`.
* Select the first `[county]` (post) request (with a 302 Status).
* In the `payload` tab, take note of the `ServiceGroupId` which is the value you need.

### Fins serviceGroupIds
* See concepts from above.
* Navigate the form until you come to the `Uppgifter till bokningen` step.
* Fill the form for name and booking type.
* (Optional:) Clear requests history in the dev tools network tab.
* Press `Nästa`.
* In the latest post request (`[county]`, status 302).
* In the `payload` tab, take note of:
  * `Customers[0].Services[0].ServiceId` = `serviceId0`
  * `Customers[0].Services[0].ServiceTextName` = `serviceText0`
  * `Customers[0].Services[1].ServiceId` = `serviceId1`
  * `Customers[0].Services[1].ServiceTextName` = `serviceText1`