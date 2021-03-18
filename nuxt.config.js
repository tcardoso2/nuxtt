//import webpack from 'webpack'

import colors from 'vuetify/es5/util/colors'

process.env.DEBUG = 'nuxt:*' //Comment to disable debuging logs

export default {
  //https://nuxtjs.org/blog/nuxt-static-improvements/
  //target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - testApp1',
    title: 'testApp1',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    /*link: [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
      },
      {
        rel: "stylesheet",
        href: "/styles/bootstrap.min.css"
      },

    ],*/
    script: [
      {
        src: "https://code.jquery.com/jquery-3.4.1.slim.min.js",
        type: "text/javascript"
      },
      {
        src: "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
        type: "text/javascript"
      }, {
        src: "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
        type: "text/javascript"
      }
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //{ src: '@/plugins/bootstrap' },
    { src: '@/plugins/chartist' },
    { src: '@/plugins/webfontloader', mode: 'client' } //Loaded client only
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  //TODO: Can't seem to add this on a component level?
  css: [
    //'bootstrap', 
    //'@/styles/bootstrap.min.css',
    //,'@/assets/custom.assets/scss/custom.scss' //Enable custom scss files here!
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  //Custom
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader','css-loader','sass-loader',],
      }
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    //Custom
    //'bootstrap-vue/nuxt',
    //'@nuxtjs/axios',
    //'@nuxtjs/auth-next',
    '~/io',
    'nuxt-basic-auth-module'
    //,'~/data'
  ],

  basic: {
    name: process.env.BASIC_NAME || '5_userS$',
    pass: process.env.BASIC_PASS || 'pa##4RD!',
    enabled: process.env.BASIC_ENABLED === 'true' // require boolean value(nullable)
  },
  
  env: {
    WS_URL: process.env.WS_URL || 'http://localhost:3000'
  },

  /*auth: {
    // Options
    // Google: see https://auth.nuxtjs.org/providers/google
    strategies: {
      social: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          token: undefined,
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
          logout: 'https://example.com/logout'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'token',
        grantType: 'authorization_code',
        accessType: undefined,
        redirectUri: undefined,
        logoutRedirectUri: undefined,
        clientId: '592050063363-5765j495f9i5q061oq4q2crc3i9pg0j8.apps.googleusercontent.com',
        scope: ['openid', 'profile', 'email'],
        state: 'UNIQUE_AND_NON_GUESSABLE',
        codeChallengeMethod: '',
        responseMode: '',
        acrValues: '',
        // autoLogout: false
      }
    }
  },*/

  //Custom
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },

  // Middleware: https://nuxtjs.org/docs/2.x/directory-structure/middleware
  router: {
    middleware: [
      //'auth'
    ]
  },

  serverMiddleware: [
    '~/serverMiddleware/body',
    '~/serverMiddleware/api'
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  //Could not add jquery as plugin, see it's added to page header instead
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*plugins: [
      new webpack.ProvidePlugin({
        // global modules
        $j: 'jquery',
        _: 'lodash'
      })
    ]*/
  }
}
