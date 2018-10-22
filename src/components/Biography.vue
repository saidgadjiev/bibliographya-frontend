<template>
  <v-layout row fill-height="true">
    <v-flex xs4>
      <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="subheading">Jonathan Lee</div>
            <div class="body-1">heyfromjonathan@gmail.com</div>
          </v-flex>
        </v-layout>
      </v-img>
    </v-flex>
    <v-flex xs8>
      <v-expansion-panel
        expand
      >
        <v-expansion-panel-content
          expand-icon="fas fa-chevron-down"
        >
          <div slot="header">Фамилия Имя Отчество</div>
          <v-card>
            <v-card-text class="grey lighten-3">Гаджиев Саид Аливич</v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content
          expand-icon="fas fa-chevron-down"
        >
          <div slot="header">Биография</div>
          <v-card>
            <v-card-text class="grey lighten-3">
              Родился в селении Кища в 1995 году в семье бизнесмена Али и учительницы по информатике Муминат.
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'biography'
}
</script>

<style scoped>

</style>
