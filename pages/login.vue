<template>
  <v-card raised class="login">
    <v-card-title class="headline justify-center">
      Login to Expressive
    </v-card-title>
    <v-card-title class="justify-center">
      <div>
        <label for="username">Username</label>
        <input id="username" v-model="login.email" />
      </div>
      <v-spacer style="height:10px" />
      <div>
        <label>Password</label>
        <input type="password" v-model="login.password" />
      </div>
      <v-spacer style="height:10px" />
      <v-card-actions class="justify-center">
        <v-btn
          color="#E45471"
          style="color: white"
          nuxt
          class="login"
          @click.stop="userLogin"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card-title>
  </v-card>
</template>

<style scoped>
.login {
  margin: auto;
  margin-top: 15vh;
  border-radius: 10px;
  padding: 5% 5%;
  text-align: center;
  width: 50%;
}
input {
  border: 1px black solid;
}

</style>

<script>
//Put in layout?
import { mapGetters } from 'vuex'

export default {
  layout: 'custom.layouts/expressive.layouts/default',
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
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>