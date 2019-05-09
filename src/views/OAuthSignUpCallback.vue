<template>
  <v-layout row wrap justify-center>
    <progress-circular v-if="_isRequest(Request.SIGN_UP)"/>
  </v-layout>
</template>

<script>
import request from '../mixins/request'
import { socialAutheticator } from '../auth/auth'
import ProgressCircular from '../components/progress/ProgressCircular'
import { SOCIAL_SIGN_UP, ERROR_SOCIAL_SIGN_UP } from '../store/action-types'

export default {
  name: 'OAuthCallback',
  mixins: [request],
  components: { ProgressCircular },
  props: {
    providerId: {
      type: String,
      required: true
    }
  },
  created () {
    this.signUp()
  },
  methods: {
    signUp () {
      this.error = false
      let that = this

      if (this.$route.query.code) {
        this.$store.dispatch(SOCIAL_SIGN_UP, {
          provider: this.providerId,
          code: this.$route.query.code,
          redirectUri: socialAutheticator.getSignUpRedirectUri(this.providerId)
        })
          .then(
            () => {
              that.$router.push('/signUp/confirm')
            },
            e => {
              that.$router.push('/signUp')
            }
          )
      } else {
        this.$store.dispatch(ERROR_SOCIAL_SIGN_UP, {
          provider: this.providerId,
          error: this.$route.query.error,
          errorDescription: this.$route.query.error_description
        })
          .finally(() => {
            that.$router.push('/signUp')
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
