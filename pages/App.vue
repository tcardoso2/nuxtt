<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Styles
  import '@/styles/overrides.sass'

  import Router from '../router'
  //import vuetify from '../plugins/vuetify'
  import '../plugins'
  import Store from '../store'
  import { sync } from 'vuex-router-sync'

  sync(Store, Router)

  export default {
    components: {
      Router,
      Store
    }   
  }
</script>
