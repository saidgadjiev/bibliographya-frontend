<template>
  <v-layout row fill-height justify-center>
      <progress-circular v-if="settingsLoading"/>
    <v-flex xs12 v-else>
      <alert-message :types="alertTypes"/>
      <v-card>
        <v-card-title v-if="!settings.email && !settings.phone">
          <h4>Внимание!</h4>
          <span class="d-block">
            У вас ни телефон ни электронная почта не привязаны к аккаунту. Вы потеряете доступ к аккаунту.
            Крайне рекомендуем привязать либо телефон, либо электронную почту, если вы хотите сохранить доступ к аккаунту.
          </span>
        </v-card-title>
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
          <span>Почта</span>
          <span>{{ settings.email }}</span>
          <router-link class="bib-a" to="/settings/email">Изменить</router-link>
        </v-card-text>
        <v-divider></v-divider>
          <v-card-text style="display: flex; justify-content: space-between">
            <span>Телефон</span>
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
import { REQUEST, TITLE } from '../config'
import ProgressCircular from '../components/progress/ProgressCircular'
import pullToRefresh from '../mixins/pullToRefresh'

export default {
  name: 'Settings',
  mixins: [alert, request, pullToRefresh],
  components: { ProgressCircular, AlertMessage },
  metaInfo () {
    return {
      title: TITLE.SETTINGS
    }
  },
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
    pullToRefresh (loaded) {
      loaded('done')
      this.settingsLoading = true
      this.loadSettings()
    },
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
