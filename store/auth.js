// store/auth.js

// reusable aliases for mutations
export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  LOGOUT: 'LOGOUT',
}

export const namespaced = true

export const state = () => ({
  access_token: null, // JWT access token
  refresh_token: null, // JWT refresh token
  id: null, // user id
  email_address: null, // user email address
})

export const mutations = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER] (state, { id, email }) {
    state.id = id
    state.email_address = email
  },

  // store new or updated token fields in the state
  [AUTH_MUTATIONS.SET_PAYLOAD] (state, { access, refresh = null }) {
    state.access_token = access.token
    state.access_token_expires = access.expires 
    // refresh token is optional, only set it if present
    if (refresh) {
      state.refresh_token = refresh.token
      state.refresh_token_expires = refresh.expires 
    }
  },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT] (state) {
    state.id = null
    state.email_address = null
    state.access_token = null
    state.refresh_token = null
  },
}

export const actions = {
  async login ({ commit, dispatch }, { email, password }) {
    // make an API call to login the user with an email address and password
    const { data: { user, tokens } } = await this.$axios.post(
    //let result = await this.$axios.post(
      '/auth/login', 
      { email, password }
    )
    // commit the user and tokens to the state
    console.log(user)
    commit(AUTH_MUTATIONS.SET_USER, user)
    commit(AUTH_MUTATIONS.SET_PAYLOAD, tokens)
  },

  async register ({ commit }, { email_addr, password }) {
    // make an API call to register the user
    const { data: { data: { user, payload } } } = await this.$axios.post(
      '/auth/register', 
      { email_address, password }
    )
    
    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, user)
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // given the current refresh token, refresh the user's access token to prevent expiry
  async refresh ({ commit, state }) {
    console.log("  :: store:auth ==> Running refresh!")
    const { refresh_token } = state
    console.log(refresh_token)
    // make an API call using the refresh token to generate a new access token
    const { data: { data: { payload } } } = await this.$axios.post(
      '/auth/refresh-tokens', 
      { refreshToken: refresh_token }
    )

    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // logout the user
  logout ({ commit, state }) {
    commit(AUTH_MUTATIONS.LOGOUT)
  },
}

export const getters = {
  // determine if the user is authenticated based on the presence of the access token
  isAuthenticated: (state) => {
    console.log("  :: store:auth ==> Running isAuthenticated!")
    return state.access_token && state.access_token !== ''
  },
}