<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent width="600px" :fullscreen="$vuetify.breakpoint.smAndDown">
      <v-card>
        <v-card-title>
          <span class="headline">Понравилось 6 людям</span>
        </v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>
                <router-link class="bibliographya-a">Гаджиев Саид</router-link>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'Likes'
  }
</script>

<style scoped>

</style>
