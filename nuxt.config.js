//import webpack from 'webpack'

import colors from 'vuetify/es5/util/colors'

process.env.DEBUG = 'nuxt:*' //Comment to disable debuging logs

export default {
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
    '@/styles/bootstrap.min.css',
    '@/styles/custom.styles/Webkrafts.css',
    '~/assets/custom.assets/_shift_default.css'
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
    'bootstrap-vue/nuxt'
  ],
  
  //Custom
  bootstrapVue: {
    bootstrapCSS: false, 
    bootstrapVueCSS: false
  },

  // Middleware: https://nuxtjs.org/docs/2.x/directory-structure/middleware
  router: {
    middleware: [
      'example'
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
      dark: true,
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
