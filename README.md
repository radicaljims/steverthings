## SteverThings

https://twitter.com/SteverThings

A webtask that updates a Twitter account with links to the day's latest Steve posts on /r/StrangerThings.

### Creating task

`wt create steve.js --name steverthings --secret consumer_key=... --secret consumer_secret=... --secret access_token=... --secret access_token_secret...` 

### Creating cron task

`wt cron create --schedule "0 17 * * *" steve.js --name steverthings --secret consumer_key=... --secret consumer_secret=... --secret access_token=... --secret access_token_secret...`

### Dependencies

 * Auth0 Webtask platform - https://webtask.io/
 * Node - https://nodejs.org/en/
 * Axios - https://github.com/axios/axios
 * Twit - https://github.com/ttezel/twit
