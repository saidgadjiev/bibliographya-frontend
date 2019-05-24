<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <alert-message :types="['alert-success']"/>
      <v-card>
        <v-card-title style="line-height: 1.5rem; flex-direction: column;">
          <span class="pa-3 title text-xs-center d-block">
            Есть предложение как улучшить сервис? Хотите рассказать о том, что вам понравилось и чтобы вы хотели добавить?
          </span>
          <span class="title text-xs-center">
            Напишите нам. Давайте вместе сделаем сервис лучше.
          </span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-textarea
              auto-grow
              rows="10"
              v-validate="'required'"
              v-model="feedbackForm.content"
              :error-messages="errors.collect('content')"
              label="Отзыв"
              type="text"
              name="content"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions style="justify-content: center">
          <v-btn large class="white--text" color="blue darken-3" @click="save" :loading="loading" :disabled="loading">
            Отправить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import feedbackService from '../services/feedback-service'
import AlertMessage from '../components/alert/AlertMessage'
import alert from '../mixins/alert'
import { THANK_FOR_REPLY } from '../messages'
import { TITLE } from '../config'

export default {
  name: 'CreateFeedback',
  components: { AlertMessage },
  mixins: [alert],
  data () {
    return {
      loading: false,
      feedbackForm: {
        content: ''
      }
    }
  },
  metaInfo: {
    title: TITLE.FEEDBADCK
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        content: {
          required: () => 'Поле обязательное'
        }
      }
    })
  },
  methods: {
    resetForm () {
      this.feedbackForm.content = ''
      this.$validator.reset()
    },
    save () {
      let self = this

      this.$validator.validateAll().then(result => {
        if (result) {
          self.loading = true
          feedbackService.create(this.feedbackForm)
            .finally(() => {
              self.resetForm()
              self.loading = false
              self.setAlertSuccess(THANK_FOR_REPLY)
            })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
