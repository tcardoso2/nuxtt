<template>
  <v-app bright>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <!--Important: v-img will only load resources from static -->
      <v-img src="/static/images/Logo.png" max-width="177px" max-height="42px"></v-img>
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-toolbar-title class="custom">Welcome {{ isAuthenticated ? `${loggedInUser}!` : '' }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        color="#E45471"
        style="color: white"
        width="110"
        @click="isAuthenticated ? userLogout() : userLogin()"
        >
        {{ isAuthenticated ? 'Logout' : 'Login' }}
      </v-btn>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
@font-face {
  font-family: Gilroy-Bold;
  src: url(/custom.static/expressive.static/fonts/Gilroy-Bold.ttf);
}

.custom {
  color: #1748AF;
}

  
  @-webkit-keyframes Background {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }
  
  @-moz-keyframes Background {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }
  
  @keyframes Background {
    0% {
      background-position: 0% 50%
    }
    50% {
      background-position: 100% 50%
    }
    100% {
      background-position: 0% 50%
    }
  }
  
  .v-application {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(https://i.imgur.com/wCG2csZ.png);
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    
    background: linear-gradient(253deg, #0cc898, #1797d2, #864fe1);
    background-size: 300% 300%;
    -webkit-animation: Background 25s ease infinite;
    -moz-animation: Background 25s ease infinite;
    animation: Background 25s ease infinite;
  }
  
  h1 {
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    font-weight: 800;
    font-size: 4em;
    letter-spacing: -2px;
    text-align: center;
    text-shadow: 1px 2px 1px rgba(0, 0, 0, .6);
  }
  
  h1:after {
    display: block;
    color: #fff;
    letter-spacing: 1px;
    font-family: 'Poiret One', sans-serif;
    content: 'Subtitle goes here';
    font-size: .4em;
    text-align: center;
  }
  
  .button-line {
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    text-align: center;
    font-size: 1.4em;
    opacity: .8;
    padding: 20px 40px;
    text-decoration: none;
    transition: all .5s ease;
    margin: 0 auto;
    display: block;
    width: 100px;
  }
  
  .button-line:hover {
    opacity: 1;
  }
</style>

<script>
import '@/styles/overrides.sass'
import { mapGetters } from 'vuex'

export default {
  head: {
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.2/socket.io.js",
      },
    ],
  },
  auth: process.env.NO_AUTH_DEV !== '1' ,
  middleware: process.env.NO_AUTH_DEV == '1' ? [] : [ 'auth'],  
  data () {
    return {
      //messages: [],
      clipped: false,
      drawer: false,
      fixed: false,
      user: this.loggedInUser,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Player',
          to: '/custom.pages/expressive.pages/player/welcome' //TODO: Substitute by another route
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Facilitator',
          to: '/custom.pages/expressive.pages/facilitator/dashboard'
        }
      ],
      miniVariant: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    welcome() {
      console.log("  :: layouts:default: Layout user: ", this.loggedInUser)
      return `Welcome ${this.loggedInUser || ''}`
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$store.dispatch('auth/login', this.login )
      } catch (err) {
        console.log(err)
      }
    },
    async userLogout() {
      try {
        await this.$store.dispatch('auth/logout')
      } catch (err) {
        console.log(err)
      }
    }

  }
}
</script>
