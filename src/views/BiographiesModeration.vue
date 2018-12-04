<template>
  <biographies
    v-if="isAuthenticated"
    :filter="'creatorName=eq:' + getUsername"
    show-status
  ></biographies>
</template>

<script>
import Biographies from './BiographiesList'
import { mapGetters } from 'vuex'

export default {
  name: 'CreatedByMeBiographies',
  components: {
    Biographies
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'getUsername'
    ])
  }
}
</script>

<style scoped>

</style>
