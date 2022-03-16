# Pass bokning
This is a helper script to be able to book a time for Uppsala/Stockholm passport time.

# Requirements
Nodejs v17

# Getting started
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
  "county": "uppsala", // Allowed/supported: uppsala, stockholm
  "endDate": "2022-05-31" // How long to allow the automated booking to work
}
```

```bash
corepack enable pnpm # Make sure pnpm exists
pnpm install # install dependencies
pnpm run start # runs the command.
```

Once the script succeeds in creating a booking it will create a file called `result/success.json` and any time you run the script with that file existing, the script will close with doing anything.


# Cron
To automate this script run with a similar crontab:
```
*/15 * * * * [PATH_TO_NODE_DIR]/node [PATH_TO_REPO]/src/index.mjs
```
