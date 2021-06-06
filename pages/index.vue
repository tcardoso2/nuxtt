<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
          <h1>Games List</h1>
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome {{ username ? ', you are logged in!' : '' }}
        </v-card-title>
        <v-card-text class="font-weight-light">
          Get Socket component to retrieve list of games
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around" style="width:400px">
          <v-sheet
            v-for="(item, i) in games"
            :key="i"
            elevation="10"
            rounded
            class="sheetSpacing"
            width="30%"
            min-width="100"
          >{{ item }}
            <v-card-actions>
              <router-link :to="`custom.pages/${item}.pages/facilitator/dashboard`">Navigate to {{ item }}</router-link>
            </v-card-actions>
          </v-sheet>
          <v-spacer />
          <v-btn v-if="username" color="primary" @click="logOut">
            Logout
          </v-btn>
        </v-card-actions>
          <v-alert
            outlined
            type="warning"
            prominent
            border="left"
          >
            Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum. Nullam vel sem. Pellentesque dapibus hendrerit tortor.
          </v-alert>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  components: {
  },
  layout: 'default_noauth',
  data() {
    return {
      email: null,
      userId: null,
      username: null,
      games: [ 'expressive', 'xy' ]
    };
  },
  created() {
    if(this.$auth.user) {
      this.email = this.$auth.user.email;
      this.userId = this.$auth.user.sub;
      this.username = this.$auth.user.username;
    }
  },
  methods: {
    logOut() {
      this.$auth.logout();
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Gilroy-Bold;
  src: url(/custom.static/expressive.static/fonts/Gilroy-Bold.ttf);
}

.sheetSpacing {
  padding: 4px;
  margin: 4px;
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
</style>