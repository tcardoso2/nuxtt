<template>
  <div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input type="text" v-model="login.email" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="login.password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    <div v-if="isAuthenticated">
      User: {{ loggedInUser }}
    </div>
  </div>
</template>

<script>
//Put in layout?
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async userLogin() {
      try {
        await this.$store.dispatch('auth/login', this.login )

        /*let response = await this.$auth.loginWith('local', { data: this.login })
        if(response.status && response.statusText == "OK")
          console.log(":: Login: Received status Ok...")
          if(response.data.user && response.data.user.role) {
            console.log(":: Login: Received user record...")
            if(response.data.tokens) {
              console.log(":: Saving session...")
              this.$router.push('/')

              //this.$toast.success('Logging in...')
              //this.$auth.setUser(response.data.user)
              this.$auth.setUserToken(response.data.tokens.access, response.data.tokens.refresh)
                .then(() => console.log('Logged In!'))
                .catch((e) => console.error('Error in saving user token...', e))
            }
          }
        }*/
        //Process response here!

/*

{
    "data": {
        "user": {
            "role": "user",
            "name": "fake name",
            "email": "fake@example.com",
            "id": "6055b5bcd59239a0a0e8859d"
        },
        "tokens": {
            "access": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDU1YjViY2Q1OTIzOWEwYTBlODg1OWQiLCJpYXQiOjE2MTYzMTI1MjgsImV4cCI6MTYxNjMxNDMyOCwidHlwZSI6ImFjY2VzcyJ9.EXmVqAHu7c74Lw63iRpx7g4ejrFXtBaMM12qPIyoZFY",
                "expires": "2021-03-21T08:12:08.729Z"
            },
            "refresh": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDU1YjViY2Q1OTIzOWEwYTBlODg1OWQiLCJpYXQiOjE2MTYzMTI1MjgsImV4cCI6MTYxODkwNDUyOCwidHlwZSI6InJlZnJlc2gifQ.nvi-iPzMnVB_Ke6qnsCt-0NFzY90Z1RAvMvj1kZZJTY",
                "expires": "2021-04-20T07:42:08.729Z"
            }
        }
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "620",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "url": "http://localhost:3333/v1/auth/login",
        "method": "post",
        "data": "{\"email\":\"fake@example.com\",\"password\":\"password1\"}",
        "headers": {
            "Content-Type": "application/json;charset=utf-8"
        },
        "baseURL": "http://localhost:3000/",
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1
    },
    "request": {}
}
*/

      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>