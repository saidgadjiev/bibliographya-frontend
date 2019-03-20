<template>
  <v-layout row justify-center>
    <v-flex xs12>
      <v-card class="blue darken-3" :class="{'pa-5': $vuetify.breakpoint.mdAndUp}">
        <v-card-text>
          <h3 style="color: #64B5F6">Бибилиография это</h3>
          <h1
              class="font-weight-black white--text"
              style="font-size: 2.20rem;letter-spacing: -.1rem"
          >
            Сервис в котором люди с разных уголков мира могут узнать друг о друге и познакомиться с историями жизни друг друга. Поделитесь с миром своей автобиографией, или людей о которых вы хотели бы рассказать.
          </h1>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>

</style>
