<template>
  <v-layout row fill-height justify-center>
      <progress-circular v-if="settingsLoading"/>
    <v-flex xs12 v-else>
      <alert-message :types="alertTypes"/>
      <v-card>
        <v-card-text class="pb-0">
          <v-form>
            <v-text-field
              v-validate="'required'"
              :error-messages="errors.collect('oldPassword')"
              :append-icon="showOldPassword ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"
              :type="showOldPassword ? 'text' : 'password'"
              @click:append="showOldPassword = !showOldPassword"
              v-model="savePasswordForm.oldPassword"
              class="mt-2"
              name="oldPassword"
              label="Старый пароль"
            ></v-text-field>
            <div class="error--text word-break-word" v-if="_isError(HttpStatus.BAD_REQUEST)">
              Старый пароль введен неверно.&nbsp;<router-link class="bib-a" to="/restore">Забыли пароль?
            </router-link>
            </div>
            <v-text-field
              v-validate="'required|min:6'"
              :error-messages="errors.collect('newPassword')"
              :append-icon="showNewPassword ? 'mdi-lock-open-outline' : 'mdi-lock-outline'"
              :type="showNewPassword ? 'text' : 'password'"
              @click:append="showNewPassword = !showNewPassword"
              v-model="savePasswordForm.newPassword"
              class="mt-2"
              name="newPassword"
              label="Новый пароль"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="pt-0" style="justify-content: center">
          <v-btn
            color="blue darken-3"
            class="white--text"
            :loading="_isRequest(Request.SAVE_PASSWORD)"
            :disabled="_isRequest(Request.SAVE_PASSWORD)"
            @click="savePassword">
            Сохранить
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-text style="display: flex; justify-content: space-between">
          <span v-if="$vuetify.breakpoint.mdAndUp">Электронная почта</span>
          <span>{{ settings.email }}</span>
          <router-link class="bib-a" to="/settings/email">Изменить</router-link>
        </v-card-text>
        <v-divider></v-divider>
          <v-card-text style="display: flex; justify-content: space-between">
            <span v-if="$vuetify.breakpoint.mdAndUp">Номер телефона</span>
            <span>{{ settings.phone }}</span>
            <router-link class="bib-a" to="/settings/phone">Изменить</router-link>
          </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import alert from '../mixins/alert'
import request from '../mixins/request'
import settingsService from '../services/settings-service'
import AlertMessage from '../components/alert/AlertMessage'
import { PASSWORD_CHANGE_SUCCESS } from '../messages'
import { REQUEST } from '../config'
import ProgressCircular from '../components/progress/ProgressCircular'

export default {
  name: 'Settings',
  mixins: [alert, request],
  components: { ProgressCircular, AlertMessage },
  data () {
    return {
      settingsLoading: true,
      showOldPassword: false,
      showNewPassword: false,
      alertTypes: ['alert-success'],
      settings: {
        phone: '',
        email: ''
      },
      savePasswordForm: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  created () {
    this.$validator.localize('ru', {
      custom: {
        oldPassword: {
          required: () => 'Введите старый пароль'
        },
        newPassword: {
          required: () => 'Введите новый пароль',
          min: () => 'Пароль слишком короткий. Используйте хотя бы 6 символов.'
        }
      }
    })
    this.loadSettings()
  },
  methods: {
    loadSettings () {
      let that = this

      settingsService.getGeneralSettings()
        .then(
          response => {
            that.settings = response.data
          }
        ).finally(() => {
          that.settingsLoading = false
        })
    },
    resetSavePasswordForm () {
      this.savePasswordForm.oldPassword = ''
      this.savePasswordForm.newPassword = ''
      this.$validator.reset()
    },
    savePassword () {
      let that = this

      this.$validator.validateAll().then(result => {
        if (result) {
          that.setRequest(REQUEST.SAVE_PASSWORD)

          settingsService.savePassword(that.savePasswordForm)
            .then(
              () => {
                that.resetSavePasswordForm()
                that.setAlertSuccess(PASSWORD_CHANGE_SUCCESS)
              },
              e => {
                if (e.response.status === that.HttpStatus.BAD_REQUEST) {
                  that.setAlertError(e)
                }
              }
            ).finally(() => {
              that.clearRequest()
            })
        }
      })
    }
  },
  watch: {
    'savePasswordForm.oldPassword' () {
      if (this.alertType === 'alert-danger') {
        this.clearAlert()
      }
    }
  }
}
</script>

<style scoped>

</style>
