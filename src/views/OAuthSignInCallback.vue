<template>
  <v-layout row wrap justify-center>
    <progress-circular v-if="_isRequest(Request.SIGN_IN)"/>
  </v-layout>
</template>

<script>
import request from '../mixins/request'
import { WELCOME, WELCOME_TITLE } from '../messages'
import { socialAutheticator } from '../auth/auth'
import ProgressCircular from '../components/progress/ProgressCircular'
import { SOCIAL_SIGN_IN, ERROR_SOCIAL_SIGN_IN } from '../store/action-types'

export default {
  name: 'OAuthCallback',
  mixins: [request],
  data () {
    return {
      error: false
    }
  },
  components: { ProgressCircular },
  props: {
    providerId: {
      type: String,
      required: true
    }
  },
  created () {
    this.signIn()
  },
  methods: {
    signIn () {
      this.error = false
      let that = this

      if (this.$route.query.code) {
        this.$store.dispatch(SOCIAL_SIGN_IN, {
          provider: this.providerId,
          code: this.$route.query.code,
          redirectUri: socialAutheticator.getSignInRedirectUri(this.providerId)
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
            },
            e => {
              that.$router.push('/signIn')
            }
          )
      } else {
        this.$store.dispatch(ERROR_SOCIAL_SIGN_IN, {
          provider: this.providerId,
          error: this.$route.query.error,
          errorDescription: this.$route.query.error_description
        })
          .then(
            response => {
              that.$router.push('/signIn')
            },
            e => {
              that.$router.push('/signIn')
            }
          )
      }
    }
  }
}
</script>

<style scoped>

</style>
