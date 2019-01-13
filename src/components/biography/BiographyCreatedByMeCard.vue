<template>
  <v-card>
    <biography-card-title-moderation class="pb-0" v-bind="$attrs"/>
    <biography-card-title v-bind="$attrs"/>
    <v-divider></v-divider>
      <biography-card-text v-bind="$attrs"/>
    <v-divider></v-divider>
    <biography-card-actions v-bind="$attrs" v-on="$listeners"/>
    <biography-card-user-actions class="pt-0" v-bind="$attrs" v-on="$listeners"/>
  </v-card>
</template>

<script>
import BiographyCardTitleModeration from './card/BiographyCardTitleModeration'
import BiographyCardActions from './card/BiographyCardActions'
import BiographyCardUserActions from './card/BiographyCardUserActions.vue'
import BiographyCardMenu from './card/BiographyCardMenu'
import BiographyCardTitle from './card/BiographyCardTitle'
import BiographyCardText from './card/BiographyCardText'

export default {
  name: 'biography-card',
  components: {
    BiographyCardUserActions,
    BiographyCardTitleModeration,
    BiographyCardActions,
    BiographyCardTitle,
    BiographyCardMenu,
    BiographyCardText
  }
}
</script>

<style scoped>
  @import "../../../static/css/bibliography.css";
</style>
