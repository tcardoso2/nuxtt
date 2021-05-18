<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12" v-if="loggedIn">
        <v-card-title>Logging in.</v-card-title>
        <v-card-text
          >Logging in, please wait...
          <v-progress-circular indeterminate color="green"></v-progress-circular>
        </v-card-text>
      </v-card>
      <v-card class="elevation-12" v-else>
        <v-card-title>You're not logged in</v-card-title>
        <v-card-text>Click the button to log into your account. </v-card-text>
        <v-card-actions>
          <v-btn @click="login" color="primary">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<!--template>
  <article>
    <div class="container" :class="{'sign-up-active': userSignUp}">
      <div class="overlay-container">
        <div class="overlay" :class="{'overlay-faci': !userSignUp}">
          <div class="overlay-left">
            <h2>Not the Facilitator?</h2>
              <p>Please login with your Player Info</p>
              <v-btn
                id="signIn"
                color="#E45471"
                style="color: white;"
                nuxt
                class="login invert"
                @click="userSignUp = !userSignUp"
              >
                Player Sign-in
              </v-btn>
            </div> 
            <div class="overlay-right">
              <h2>Are you the Facilitator?</h2>
              <p>Please enter your details</p>
              <v-btn
                color="#E45471"
                style="color: white"
                min-width="175px"
                nuxt
                class="login invert"
                @click="userSignUp = !userSignUp"
              >
                Facilitator Sign-in
              </v-btn>
            </div>
          </div>
        </div>
      <form class="sign-up" action="#">
        <h2>Facilitator Sign-in</h2>
        <div>Use your email and Game Code</div>
        <input type="email" placeholder="Facilitator Email" v-model="login.email"/>
        <input type="password" placeholder="Game Code" v-model="login.email"/>
        <v-btn
          color="#E45471"
          style="color: white"
          nuxt
          class="login invert"
          @click.stop="userRegistration"
        >
          Sign-in
        </v-btn>
      </form>
      <form class="sign-in" action="#">
        <h2>Player Sign-In</h2>
        <div>Use the Game Code provided <br /> by your facilitator</div>
        <input id="pEmail" type="email" placeholder="Player Email" v-model="login.email" />
        <input id="pPass" type="password" placeholder="Game Code" v-model="login.password"/>
        <a v-if="displayForget" href="#">Forget your password?</a>
        <v-btn
          color="#E45471"
          style="color: white" 
          nuxt
          class="login"
          @click.stop="login"
        >
          Sign-in
        </v-btn>
        <div id="pLoginError" class="error">
          {{ errorMessage }}
        </div>
    </form>
    </div>
  </article>
</template-->

<!--template>
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
          @click.stop="login"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card-title>
  </v-card>
</template-->

<style lang="scss" scoped>
  article{
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    min-height:100vh;
  }
  .container {
    position: relative;
    width:768px;
    height:480px;
    border-radius:10px;
    overflow:hidden;
    box-shadow: 0 15px 30px rgba(0,0,0,.2),
      0 10px 10px rgba(0,0,0,.2);
    background: linear-gradient(to bottom, #efefef, #ccc);

  .overlay-container{
    position:absolute;
    top:0;
    left:50%;
    width:50%;
    height:100%;
    overflow:hidden;
    transition:transform .5s ease-in-out;
    z-index:100;
     }
    .overlay{
      position: relative;
      left:-100%;
      height:100%;
      width:200%;
      border: 1px solid ;
      background:linear-gradient(to bottom right, #1758bf, #002063);
      color:#fff;
      transform:translateX(0);
      transition:transform .5s ease-in-out;
    }
    .overlay-faci{ 
      background:linear-gradient(to bottom left, #bf58bf, #8b446e);
    }

    @mixin overlays($property){
      position:absolute;
      top:0; 
      display:flex;
      align-items:center;
      justify-content: center;
      flex-direction:column;
      padding:140px 80px;
      width:calc(50% -80px);
      height:calc(100% -140px);
      text-align:center;
      transform:translateX($property);
      transition: transform .5s ease-in-out;
      
    }
    .overlay-left{
      @include overlays(-40%);
    }
    .overlay-right{
      @include overlays(0);
      right:0;
    }
  }
  h2{
    margin:0;
  }
  p{
    margin: 20px 0 30xp;
      }
  a{
    color:#222;
    text-decoration:none;
    margin:15px 0;
    font-size:1rem;
  }
  button{
    border-radius:20px;
    border: 1px solid #004083;
    background-color:#1748af;
    color:#fff;
    font-size:1rem;
    font-weight:bold;
    padding: 10px 40px;
    margin-top:5px;
    letter-spacing:1px;
    text-transform: uppercase;
    transition:transform .1s ease-in;
    
    &:active{
      transform:scale(.9);
    }
    &:focus{
      outline:none;
    }
 }
  button.invert{
    background-color:transparent;
    border-color:#fff;
  }
  form{
    position:absolute;
    top:0;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    padding: 140px 90px;
    width:calc(50% -120px);
    height:calc(100% -180px);
    text-align:center;
    background:linear-gradient(to bottom, #efefef, #ccc);
    transition: all .5s ease-in-out;
  div{
    font-size:1rem;
  }
  input{
    background-color:#eee;
    border:none;
    padding: 8px 15px;
    margin:6px 0;
    width:calc(100% -30px);
    border-radius:15px;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.4), 
      0 -1px 1px #fff,
      0 1px 0 #fff;
    overflow:hidden;
    &:focus{
      outline:none;
      background-color:#fff;
          }
  }
     }
  
  .sign-in{
    left:0;
    z-index:2;
  }
  .sign-up{
    left:0;
    z-index:1;
    opacity:0;
  }
  .sign-up-active{
    .sign-in{
      transform:translateX(100%);
    }
    .sign-up{
      transform:translateX(95%);
      opacity:1;
      z-index:5;
      animation:show .5s;
    }
    .overlay-container{
      transform:translateX(-100%);
    }
    .overlay{
      transform:translateX(50%);
    }
    .overlay-left{
      transform:translateX(0);
    }
    .overlay-right{
      transform:translateX(20%);
    }
  }
  @keyframes show{
    0%{
      opacity:0;
      z-index:1;
    }
    49%{
      opacity:0;
      z-index:1;
    }
    50%{
      opacity:1;
      z-index:1;
    }
  }

.login {
  margin: auto;
  margin-top: 5vh;
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
      displayForget: false,
      userSignUp: false,
      errorMessage: '',
      login2: {
        email: '',
        password: ''
      },
      loggedIn: false
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  created() {
    this.loggedIn = this.$auth.strategy.token.get()
    console.log(`Created:: loggedIn ${this.loggedIn}`)
  },
  methods: {
    login() {
      this.$auth.loginWith("awsCognito");
    },
    logout() {
      this.$auth.logOut("awsCognito");
    },
    //Custom Locally hosted function
    async loginLocal() {
      try {
        console.log(this.login)
        if(this.validate()) {
          await this.$store.dispatch('auth/login', this.login )
          this.$router.push({ name: 'login', query: { redirect: '/path' } });
        }
      } catch (err) {
        if(err == "Error: Request failed with status code 401") {
          this.errorMessage = "Wrong username / password"
        } else {
          this.errorMessage = "Error. Please contact Admin"
        }
        console.log(err)
      }
    },
    async userRegistration() {
    },
    validate(){
      if (!this.login.password) {
        this.errorMessage = "Password is required"
        return false
      }
      return true
    }
  }
}
</script>