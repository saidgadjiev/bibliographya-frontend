<template>
  <v-layout justify-center row class="ma-0 pa-0">
    <error-card v-if="error" :trigger="gotoSignIn"></error-card>
    <progress-circular v-else/>
  </v-layout>
</template>

<script>
import { WELCOME, WELCOME_TITLE } from '../messages'
import { getRedirectUri } from '../config'
import ErrorCard from '../components/error/ErrorCard'
import ProgressCircular from '../components/progress/ProgressCircular'

export default {
  name: 'OAuthCallback',
  data () {
    return {
      error: false
    }
  },
  components: { ProgressCircular, ErrorCard },
  props: {
    providerId: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.signIn()
  },
  methods: {
    gotoSignIn () {
      this.$router.push('/signIn')
    },
    signIn () {
      this.error = false
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
            },
            e => {
              that.error = true
            }
          )
      } else {
        this.$store.dispatch('errorSocialSignIn', {
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
