<template>
  <v-card>
    <v-card-title primary-title style="justify-content: center">
      <div class="text-xs-center">
        <h3 style="color: #455A64">Все самые интересные биографии и факты только у нас.</h3>
        <h2>Присоединяйся!</h2>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 md4>
          <v-btn color="primary" block :href="tgLink">
            <v-icon left>
              fab fa-telegram-plane
            </v-icon>
            Телеграмм
          </v-btn>
        </v-flex>
        <v-flex xs12 md4>
          <v-btn color="green darken-3" class="white--text" block href="https://facebook.com/bibliographya" target="_blank">
            <v-icon left>
              fab fa-facebook-f
            </v-icon>
            Facebook
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { TG_LINK } from '../config'

export default {
  name: 'Social',
  data () {
    return {
      tgLink: TG_LINK
    }
  }
}
</script>

<style scoped>

</style>
