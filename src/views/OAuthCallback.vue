<template>
  <v-layout justify-center align-center row fill-height>
  <v-progress-circular
    :size="50"
    color="primary"
    indeterminate
  ></v-progress-circular>
  </v-layout>
</template>

<script>
import { WELCOME, WELCOME_TITLE } from '../messages'
import { getRedirectUri } from '../config'

export default {
  name: 'OAuthCallback',
  props: {
    providerId: {
      type: String,
      required: true
    }
  },
  mounted () {
    let that = this

    if (this.$route.query.code) {
      this.$store.dispatch('socialSignIn', {
        provider: this.providerId,
        code: this.$route.query.code,
        redirectUri: getRedirectUri(this.providerId)
      })
        .then(
          user => {
            that.$router.push('/')
            if (user.isNew) {
              that.$swal.fire({
                title: WELCOME_TITLE,
                text: WELCOME,
                type: 'info',
                showCloseButton: true
              })
            }
          }
        )
    } else {
      this.$store.dispatch('errorSocialSignIn', {
        provider: this.providerId,
        error: this.$route.query.error,
        errorDescription: this.$route.query.error_description
      })
    }
  }
}
</script>

<style scoped>

</style>
