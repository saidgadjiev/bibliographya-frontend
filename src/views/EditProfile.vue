<template>
  <edit-biography :biography="biography"></edit-biography>
</template>

<script>
import EditBiography from '../components/EditBiography'
import { mapGetters } from 'vuex'

export default {
  name: 'EditProfile',
  components: {
    EditBiography
  },
  computed: {
    ...mapGetters([
      'getBiographyByUsername',
      'getUsername'
    ]),
    biography () {
      return this.getBiographyByUsername(this.getUsername)
    }
  }
}
</script>

<style scoped>

</style>
