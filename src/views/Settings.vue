<template>
  <v-layout row fill-height>
    <v-flex xs12 sm8>
      <v-card>
        <alert-message :types="alertTypes"/>
        <v-card-text class="pb-0">
          <v-form>
            <v-text-field
              v-validate="'required'"
              :error-messages="errors.collect('oldPassword')"
              :append-icon="showOldPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
              :type="showOldPassword ? 'text' : 'password'"
              @click:append="showOldPassword = !showOldPassword"
              v-model="savePasswordForm.oldPassword"
              class="mt-2"
              name="oldPassword"
              label="Старый пароль"
            ></v-text-field>
            <div class="error--text word-break-all" v-if="_isError(HttpStatus.BAD_REQUEST)">
              Старый пароль введен неверно.&nbsp;<router-link class="bibliographya-a" to="/restore">Забыли пароль?
            </router-link>
            </div>
            <v-text-field
              v-validate="'required'"
              :error-messages="errors.collect('newPassword')"
              :append-icon="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
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
        <v-card-text class="pb-0">
          <div class="error--text word-break-all" v-if="!settings.emailVerified">
            Кто то другой привязал вашу почту к своей странице. Подтвердите пожалуйста почту или вход на страницу будет
            утерян.
            <router-link to="/settings/email" class="bibliographya-a">
              <strong>Подтвердить</strong>
            </router-link>
          </div>
          <v-text-field
            :value="settings.email"
            disabled
            label="Почта"
            type="text"
            name="email"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pt-0" style="justify-content: center">
          <v-btn
            v-if="settings.emailVerified"
            color="blue darken-3"
            class="white--text"
            @click="changeEmail">
            Изменить
          </v-btn>
        </v-card-actions>
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

export default {
  name: 'Settings',
  mixins: [alert, request],
  components: { AlertMessage },
  data () {
    return {
      showOldPassword: false,
      showNewPassword: false,
      alertTypes: ['alert-success'],
      settings: {
        email: '',
        emailVerified: true
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
          required: () => 'Введите новый пароль'
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
            that.settings.email = response.data.email
            that.settings.emailVerified = response.data.emailVerified
          }
        )
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
    },
    changeEmail () {
      this.$router.push('/settings/email')
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
