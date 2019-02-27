<template>
  <v-card>
    <alert-message/>
    <v-card-text>
      <v-form data-vv-scope="savePasswordForm">
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
        <div class="error--text word-break-all" v-if="_oldPasswordError">
          Старый пароль введен неверно.&nbsp;<router-link class="bibliographya-a" to="/restore">Забыли пароль?</router-link>
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
        <v-btn
          color="blue darken-3"
          class="white--text"
          block
          :loading="_savePasswordRequest"
          :disabled="_savePasswordRequest"
          @click="savePassword">
          Изменить
        </v-btn>
      </v-form>
      <v-divider></v-divider>
      <v-form>
        <v-text-field
          :value="getUser.userAccount.email"
          disabled
          label="Почта"
          type="text"
          name="email"
        ></v-text-field>
        <v-btn
          color="blue darken-3"
          class="white--text"
          block
          @click="changeEmail">
          Изменить
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import userAccountsService from '../services/user-account-service'
import AlertMessage from '../components/alert/AlertMessage'
import { PASSWORD_CHANGE_SUCCESS } from '../messages'
import { mapGetters, mapActions, mapState } from 'vuex'

const REQUEST = {
  NONE: -1,
  SAVE_PASSWORD: 0
}

const ERROR = {
  NONE: -1,
  OLD_PASSWORD_WRONG: 0
}

export default {
  name: 'ProfileSettings',
  components: { AlertMessage },
  data () {
    return {
      showOldPassword: false,
      showNewPassword: false,
      request: REQUEST.NONE,
      error: ERROR.NONE,
      savePasswordForm: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    ...mapActions('alert', [
      'clear'
    ]),
    savePassword () {
      let that = this

      this.$validator.validateAll('savePasswordForm').then(result => {
        if (result) {
          that.request = REQUEST.SAVE_PASSWORD

          userAccountsService.savePassword(that.savePasswordForm)
            .then(
              () => {
                that.request = REQUEST.NONE
                that.$store.dispatch('alert/success', PASSWORD_CHANGE_SUCCESS)
              },
              e => {
                that.request = REQUEST.NONE

                if (e.response.status === 412) {
                  that.error = ERROR.OLD_PASSWORD_WRONG
                }
              }
            )
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'getUser'
    ]),
    ...mapState('alert', ['type', 'error']),
    _oldPasswordError () {
      return this.error === ERROR.OLD_PASSWORD_WRONG
    },
    _savePasswordRequest () {
      return this.request === REQUEST.SAVE_PASSWORD
    }
  },
  beforeDestroy () {
    this.clear()
  }
}
</script>

<style scoped>

</style>
