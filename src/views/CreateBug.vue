<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <alert-message :types="['alert-success']"/>
      <v-card>
        <v-card-title>
          <div class="pa-3" v-html="_message"></div>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-validate="'required'"
              v-model="bugForm.theme"
              :error-messages="errors.collect('theme')"
              label="Тема ошибки"
              type="text"
              name="theme"
            ></v-text-field>
            <v-textarea
              auto-grow
              rows="10"
              v-validate="'required'"
              v-model="bugForm.bugCase"
              :error-messages="errors.collect('bugCase')"
              label="Шаги воспроизведения ошибки"
              type="text"
              name="bugCase"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions style="justify-content: center">
          <v-btn class="white--text" color="blue darken-3" @click="save" :loading="loading" :disabled="loading">
            Создать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { CREATE_BUG_TITLE, BUG_CREATED } from '../messages'
import bugTrackingService from '../services/bug-tracking-service'
import AlertMessage from '../components/alert/AlertMessage'
import alert from '../mixins/alert'

export default {
  name: 'BugsList',
  mixins: [alert],
  components: { AlertMessage },
  data () {
    return {
      loading: false,
      bugForm: {
        theme: '',
        bugCase: ''
      }
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        theme: {
          required: () => 'Введите тему ошибки'
        },
        bugCase: {
          required: () => 'Введите шаги воспроизведения ошибки'
        }
      }
    })
  },
  computed: {
    _message () {
      return CREATE_BUG_TITLE
    }
  },
  methods: {
    resetForm () {
      this.bugForm.theme = ''
      this.bugForm.bugCase = ''
      this.$validator.reset()
    },
    save () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          that.loading = true

          bugTrackingService.create(that.bugForm)
            .then(
              response => {
                that.loading = false
                that.setAlertSuccess(BUG_CREATED)
                that.resetForm()
              },
              e => {
                that.loading = false
              }
            )
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
