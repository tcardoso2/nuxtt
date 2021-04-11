
export const getters = {
  isAuthenticated(state) {
    console.log("  :: store:index ==> Running isAuthenticated!")
    if(process.env.NO_AUTH_DEV == '1' && process.env.NODE_ENV == 'development') {
      console.log("  :: store:index ==> Detected Dev environment and NO_AUTH_DEV, will skip auth...!")
      return true;
    }
    if(state.auth) {
      return state.auth.access_token && state.auth.access_token !== ''
    }
  },
  loggedInUser(state) {
    console.log("  :: store:index ==> Running loggedInUser!")
    console.log(state.auth)
    if(process.env.NO_AUTH_DEV == '1' && process.env.NODE_ENV == 'development') {
      console.log("  :: store:index ==> Detected Dev environment and NO_AUTH_DEV, will skip auth...!")
      return "guest"
    }
    if(state.auth) {
      return state.auth.name
    }
  }
}

// store/index.js

// ....
export const actions = {
    // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
    // automatically refresh the access token on the initial request to the server, if possible
    async nuxtServerInit ({ dispatch, commit, state }) {
      const { access_token, refresh_token } = state.auth
      console.log("  :: store:index ==> Running nuxt")
      console.log(state)
      /*if (access_token && refresh_token) {
        try {
          // refresh the access token
          await dispatch('auth/refresh')
        } catch (e) {
          // catch any errors and automatically logout the user
          await dispatch('auth/logout')
        }
      }*/
    },
  }
  // ...