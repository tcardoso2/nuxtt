// store/auth.js

// reusable aliases for mutations
export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  LOGOUT: 'LOGOUT',
  SET_GAME_CODE: 'SET_GAME_CODE',
  SET_PLAYER_ID: 'SET_PLAYER_ID'
}

export const namespaced = true

export const state = () => ({
  access_token: null, // JWT access token
  refresh_token: null, // JWT refresh token
  id: null, // user id
  email_address: null, // user email address
  game_code: null, // game code
  player_ids: {} // game code
})

export const mutations = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER] (state, user) {
    state.id = user.id
    state.email_address = user.email
    state.name = user.name
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
    //Hard-code
    state.loggedIn = true
    console.log("Last state is: ", state)
  },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT] (state) {
    state.id = null
    state.email_address = null
    state.access_token = null
    state.refresh_token = null,
    state.loggedIn = false,
    name = ''
  },

  [AUTH_MUTATIONS.SET_GAME_CODE] (state, gameCode) {
    state.game_code = gameCode
    console.log("Last state is: ", state)
  },

  [AUTH_MUTATIONS.SET_PLAYER_ID] (state, { user, playerId }) {
    state.player_ids[user] = playerId
    console.log("Last state is: ", state)
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

  async register ({ commit }, { email_address, password }) {
    // make an API call to register the user
    const { data: { data: { user, payload } } } = await this.$axios.post(
      '/auth/register', 
      { email_address, password }
    )
    
    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, user)
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  async user ({ commit, dispatch }, { id }) {
    // make an API call to login the user with an email address and password
    const { data: { user } } = await this.$axios.get(
      `/auth/users/${id}`
    )
    // commit the user and tokens to the state
    console.log(user)
    commit(AUTH_MUTATIONS.SET_USER, user)
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
  async logout ({ commit, state }) {
    console.log("  :: store:auth ==> Running logout!")
    const { refresh_token } = state
    const data = await this.$axios.post(
      '/auth/logout', 
      { refreshToken: refresh_token }
    )
    console.log(`  :: store:auth ==> ${data}`)
    commit(AUTH_MUTATIONS.LOGOUT)
  },

  // set the game code
  async setGameCode ({ commit }, { gameCode }) {
    console.log("  :: store:auth ==> Running setGameCode!")
    // commit the game code to the state
    commit(AUTH_MUTATIONS.SET_GAME_CODE, gameCode)
  },

  // set the player Id (there can be several player ids in the session)
  async setPlayerId ({ commit, state }, { user, playerId }) {
    console.log("  :: store:auth ==> Running setPlayerId!", user, playerId)
    // commit the player Id to the state, but check if by chance is there (could be if you run several games with same Id, so I force for different ids on same browser)
    if(state.player_ids[user]) {
      console.warn(`User ${user} already exists, there could be issues if the same username was used for another session, the user should clean existing game cookies`)
      //return false
    }
    commit(AUTH_MUTATIONS.SET_PLAYER_ID, { user, playerId })
    return true
  }
}

export const getters = {
  // determine if the user is authenticated based on the presence of the access token
  isAuthenticated: (state) => {
    console.log("  :: store:auth ==> Running isAuthenticated!")
    if(process.env.NO_AUTH_DEV == '1' && process.env.NODE_ENV == 'development') {
      console.log("  :: store:index ==> Detected Dev environment and NO_AUTH_DEV, will skip auth...!")
      return true;
    }
    return state.access_token && state.access_token !== ''
  },
}