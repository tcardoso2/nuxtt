# testApp1

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

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

Customizations:
===============
- sass-loader

Issues:
=======
- The node module custom dependency "sass-loader", version 11.0.1 does not work with the current vue's version.
  - remedy: https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function install/downgrade to version 10.1.1

Version History:
================
* v.0.1.5:
  - Added github Hello World Workflow (WIP)
  - Added Authentication module - components not requiring must specify "auth:false"
  - Added Socket.io (experimental),
    - some memory persistence to be able to remember game states between pages;
* v.0.1.4:
  - Some customizations for custom sass, for better integration with custom sites
* v.0.1.3:
  - API continuation of tests, create list, find by name and by id (user)
* v.0.1.2:
  - First test with server Middleware - api testing. Tested some more 3rd party components
* v.0.1.1:
  - First test with MongoDB middleware
* v.0.1.0:
  - First version. Playing around. Added a couple of test middleware. Trying out external 3rd party components.
