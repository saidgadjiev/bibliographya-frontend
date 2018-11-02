<template>
  <v-expansion-panel
    v-model="defaultExpand"
    expand
  >
    <v-expansion-panel-content
      readonly
      expand-icon="fas fa-chevron-down"
    >
      <div slot="header">Фамилия Имя Отчество</div>
      <editable-fio :biography-id="biographyId"></editable-fio>
    </v-expansion-panel-content>
    <v-expansion-panel-content
      expand-icon="fas fa-chevron-down"
    >
      <div slot="header">Биография</div>
      <editable-biography :biography-id="biographyId"></editable-biography>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from 'vuex'
import EditableFio from './EditableFio'
import EditableBiography from './EditableBiography'

export default {
  name: 'profile-biography',
  data () {
    return {
      defaultExpand: [true]
    }
  },
  computed: {
    ...mapGetters([
      'getBiographyByUsername',
      'getUsername'
    ]),
    biographyId () {
      let biography = this.getBiographyByUsername(this.getUsername)

      return biography ? biography.id : null
    }
  },
  components: {
    EditableFio,
    EditableBiography
  }
}
</script>

<style scoped>

</style>
