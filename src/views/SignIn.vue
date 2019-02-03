<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="elevation-12">
        <v-card-title primary-title style="justify-content: center">
          <h3 class="headline font-weight-bold mb-0">Вход в Библиографию</h3>
        </v-card-title>
        <v-card-actions>
          <v-layout row wrap>
            <v-flex xs12>
              <v-btn
                class="white--text"
                block
                color="light-green darken-2"
                @click="auth('vk')"
              ><v-icon
                left
                color="blue darken-3">
                fab fa-vk
              </v-icon>
                Войти через VK
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { getRedirectUri } from '../config'
import authService from '../services/auth-service'

export default {
  name: 'SignIn',
  computed: {
    ...mapGetters([
      'status'
    ]),
    ...mapState('alert', ['type'])
  },
  methods: {
    ...mapActions('alert', [
      'clear'
    ]),
    auth (provider) {
      authService.getOauthUrl(provider, getRedirectUri(provider))
        .then(
          response => {
            window.location.href = response.data
          }
        )
    }
  },
  beforeDestroy () {
    this.clear()
  }
}
</script>

<style scoped>

</style>
