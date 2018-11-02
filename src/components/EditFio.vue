<template>
  <div>
    <v-card-text v-if="isEditFio" class="grey lighten-3">
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="editLastName"
            label="Фамилия"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="editFirstName"
            label="Имя"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="editMiddleName"
            label="Отчество"
            type="text"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="grey lighten-3">
      <div v-if="isEditFio">
        <v-btn @click="doSaveFio" flat color="orange">Сохранить</v-btn>
        <v-btn @click="isEditFio = false" flat color="orange">Отменить</v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon @click="doEditFio">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditFio',
  data () {
    return {
      isEditFio: false,
      editFirstName: '',
      editLastName: '',
      editMiddleName: ''
    }
  },
  props: {
    biographyId: Number
  },
  computed: {
    ...mapGetters([
      'getBiographyById'
    ]),
    firstName () {
      let biography = this.getBiographyById(this.biographyId)

      return biography ? biography.firstName : null
    },
    lastName () {
      let biography = this.getBiographyById(this.biographyId)

      return biography ? biography.lastName : null
    },
    middleName () {
      let biography = this.getBiographyById(this.biographyId)

      return biography ? biography.middleName : null
    }
  },
  methods: {
    ...mapActions([
      'updateFioById'
    ]),
    doEditFio () {
      this.isEditFio = !this.isEditFio
      this.editFirstName = this.firstName
      this.editLastName = this.lastName
      this.editMiddleName = this.middleName
    },
    doSaveFio () {
      let that = this

      if (this.editFirstName === this.firstName &&
          this.editLastName === this.lastName &&
          this.editMiddleName === this.middleName
      ) {
        that.isEditFio = false

        return
      }
      this.updateFioById({
        id: this.biographyId,
        firstName: this.editFirstName,
        lastName: this.editLastName,
        middleName: this.editMiddleName
      }).then(
        () => {
          that.isEditFio = false
          that.editFirstName = ''
          that.editLastName = ''
          that.editMiddleName = ''
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
