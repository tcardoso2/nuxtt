<template>
    <regular-tables />
</template>

<script>
// Styles
import DashboardView from '~/views/Dashboard.vue'
import RegularTables from '~/views/RegularTables.vue'
//Difference between view and component? Both work

export default {
  components: {
    DashboardView,
    RegularTables
  }
}
</script>