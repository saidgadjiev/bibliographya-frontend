<template>
  <v-card>
    <biography-card-title v-bind="$attrs"/>
    <v-divider></v-divider>
    <biography-card-text v-bind="$attrs"/>
    <v-divider></v-divider>
    <biography-card-actions v-bind="$attrs" v-on="$listeners"/>
  </v-card>
</template>

<script>
import BiographyCardActions from './card/BiographyCardActions'
import BiographyCardTitle from './card/BiographyCardTitle'
import BiographyCardText from './card/BiographyCardText'

export default {
  name: 'biography-card',
  components: {
    BiographyCardActions,
    BiographyCardTitle,
    BiographyCardText
  }
}
</script>

<style scoped>
  @import "../../../static/bibliography.css";
</style>
