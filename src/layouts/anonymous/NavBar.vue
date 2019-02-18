<template>
  <v-navigation-drawer
    class="md-drawer"
  >
    <v-card class="elevation-12">
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
  </v-navigation-drawer>
</template>

<script>
import authService from '../../services/auth-service'
import { getRedirectUri } from '../../config'

export default {
  name: 'NavBar',
  methods: {
    auth (provider) {
      authService.getOauthUrl(provider, getRedirectUri(provider))
        .then(
          response => {
            window.location.href = response.data
          }
        )
    }
  }
}
</script>

<style scoped>
  .md-drawer {
    height: auto !important;
    z-index: inherit;
    width: 240px !important;
    left: unset !important;
    background-color: inherit !important;
  }

</style>
