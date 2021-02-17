<template>
    <DashboardView />
    <!--nuxt keep-alive :keep-alive-props="{ max: 10 }" /-->
</template>

<script>
// Styles
import DashboardView from '~/views/Dashboard.vue'

export default {
  components: {
    DashboardView
  }
}
</script>