<template>
  <v-navigation-drawer
    class="sidebar"
    fixed
  >
    <sign-in mode="navbar"/>
  </v-navigation-drawer>
</template>

<script>
import authService from '../../services/auth-service'
import { getRedirectUri } from '../../config'
import SignIn from '../../components/auth/SignIn'

export default {
  name: 'NavBar',
  components: { SignIn },
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
