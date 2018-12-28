<template>
  <div></div>
</template>

<script>
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

    this.$store.dispatch('socialSignIn', {
      provider: this.providerId,
      code: this.$route.query.code
    })
      .then(
        response => {
          that.$router.push('/')
        }
      )
  }
}
</script>

<style scoped>

</style>
