<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <sign-in/>
    </v-flex>
  </v-layout>
</template>

<script>
import SignIn from '../components/auth/SignIn'

export default {
  name: 'SignInView',
  components: { SignIn }
}
</script>

<style scoped>

</style>
