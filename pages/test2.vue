<template>
    <user-profile />
</template>

<script>
// Styles
import DashboardView from '~/views/Dashboard.vue'
//Difference between view and component? Both work
import UserProfile from '~/views/UserProfile.vue'

export default {
  components: {
    DashboardView,
    UserProfile
  }
}
</script>