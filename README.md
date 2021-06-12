# nuxtt

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how Nuxt works, check out [Nuxt.js docs](https://nuxtjs.org).

History:
========

- v 0.2.7: Added root index.vue page with games. For now hard-coded (WIP), but intention is to have then listed dinamically. Still some work required on UI
- v 0.2.6: Integrated with Amazon Cognito - still some cleaning up to do 
- v 0.2.5: Added socket.io hooks specific to each application, separately tracked from this repo, fixed points issue for client users, now updates the user both during game and at start
- v 0.2.4: Added auth.player_ids to the cookies, to be able to record players in a different manner than facis, and to allow holistic automated testin in future with several players
- v 0.2.3: Changes on the way io structures messages, added users channel
- v 0.2.2: Adding cookie-based session Id (XY Game), revamping the socket communication
- v 0.2.1: Adding tests for Authentication (WIP)
- v 0.2.0: Implementation of Login authentication, via external API (JWT) (WIP)
- v 0.1.8: Adding pm2 scripts, added basic auth 
- v 0.1.7: Testing with custom app - starting to bring over middleware and serverMiddleware modules;
  - included mongoose as dependency
  - included plugins from master and cleaned up configuration a bit
  - included other necessary dependencies
  - included io (socket-server)
  - included node-persist
- v 0.1.6: Revamped app, added "expressinit.js" to start as express server with Nuxt middleware;
