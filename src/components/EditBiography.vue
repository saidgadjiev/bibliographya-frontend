<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="lastName"
            label="Фамилия"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="firstName"
            label="Имя"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="middleName"
            label="Отчество"
            type="text"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            auto-grow
            class="w-100"
            v-model="biographyText"
            label="Биография"
            type="text"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="doSave" flat color="orange">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'EditProfile',
  data () {
    return {
      editFirstName: '',
      editLastName: '',
      editMiddleName: '',
      editBiography: ''
    }
  },
  props: {
    biography: {
      required: true,
      type: Object
    }
  },
  computed: {
    firstName: {
      get () {
        return this.biography.firstName
      },
      set (newVal) {
        this.editFirstName = newVal
      }
    },
    lastName: {
      get () {
        return this.biography.lastName
      },
      set (newVal) {
        this.editLastName = newVal
      }
    },
    middleName: {
      get () {
        return this.biography.middleName
      },
      set (newVal) {
        this.editMiddleName = newVal
      }
    },
    biographyText: {
      get () {
        return this.biography.biography
      },
      set (newVal) {
        this.editBiography = newVal
      }
    }
  },
  methods: {
    doSave () {
      this.$store.dispatch('updateBiography', {
        id: this.biography.id,
        firstName: this.editFirstName,
        lastName: this.editLastName,
        middleName: this.editMiddleName,
        biography: this.editBiography
      })
    }
  }
}
</script>

<style scoped>

</style>
