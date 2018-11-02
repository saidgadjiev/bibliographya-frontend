<template>
  <div>
    <v-card-text v-if="isEditBiography" class="grey lighten-3">
      <v-layout row wrap>
        <v-flex xs12>
          <v-textarea
            auto-grow
            class="w-100"
            v-model="editBiography"
            label="Биография"
            type="text"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="grey lighten-3">
      <div v-if="isEditBiography">
        <v-btn @click="doSaveBiography" flat color="orange">Сохранить</v-btn>
        <v-btn @click="isEditBiography = !isEditBiography" flat color="orange">Отменить</v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click="doEditBiography">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditBiography',
  data () {
    return {
      isEditBiography: false,
      editBiography: ''
    }
  },
  props: {
    biographyId: Number
  },
  computed: {
    ...mapGetters([
      'getBiographyById'
    ]),
    biography () {
      let biography = this.getBiographyById(this.biographyId)

      return biography ? biography.biography : null
    }
  },
  methods: {
    doEditBiography () {
      this.isEditBiography = !this.isEditBiography
      this.editBiography = this.biography
    },
    doSaveBiography () {
      let that = this

      if (this.editBiography === this.biography) {
        that.isEditBiography = false

        return
      }

      this.$store.dispatch('updateBiographyById', {
        id: this.biographyId,
        biography: this.editBiography
      }).then(
        () => {
          that.isEditBiography = false
          that.eeditBiography = ''
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
