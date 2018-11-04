<template>
  <v-card>
    <v-alert
      v-model="alert"
      dismissible
      type="success"
      color="light-green darken-2"
      id="alert"
    >
      Изменения сохранены.
      Новые данные будут отражены на Вашей странице.
    </v-alert>
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
  name: 'EditBiographyCard',
  data () {
    return {
      options: {
        duration: 300,
        offset: -61,
        easing: 'easeInOutCubic'
      },
      alert: false,
      firstName: '',
      lastName: '',
      middleName: '',
      biographyText: ''
    }
  },
  props: {
    biography: Object
  },
  mounted () {
    this.firstName = this.biography.firstName
    this.lastName = this.biography.lastName
    this.middleName = this.biography.middleName
    this.biographyText = this.biography.biography
  },
  methods: {
    doSave () {
      let that = this

      this.$store.dispatch('updateBiography', {
        id: this.biography.id,
        firstName: this.firstName,
        lastName: this.lastName,
        middleName: this.middleName,
        biography: this.biographyText
      }).then(
        () => {
          that.alert = true
          that.$nextTick(function () {
            that.$vuetify.goTo('#alert', that.options)
          })
        },
        e => {
          console.log(e)
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
