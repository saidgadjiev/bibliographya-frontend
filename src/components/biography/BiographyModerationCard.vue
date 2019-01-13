<template>
  <v-card>
    <biography-card-title-moderation class="pb-0" v-bind="$attrs"/>
    <biography-card-title v-bind="$attrs"/>
    <v-divider></v-divider>
    <biography-card-text v-bind="$attrs"/>
    <v-divider></v-divider>
    <biography-card-actions v-bind="$attrs" v-on="$listeners"/>
    <biography-moderation-card-actions v-bind="$attrs" v-on="$listeners"/>
  </v-card>
</template>

<script>
import BiographyCardTitleModeration from './card/BiographyCardTitleModeration'
import BiographyModerationCardActions from './card/BiographyModerationCardActions.vue'
import BiographyCardActions from './card/BiographyCardActions.vue'
import BiographyCardTitle from './card/BiographyCardTitle'
import BiographyCardText from './card/BiographyCardText'
import TreeView from '../tree/TreeView.vue'

export default {
  name: 'BiographyModerationCard',
  components: {
    BiographyCardTitleModeration,
    BiographyModerationCardActions,
    BiographyCardTitle,
    BiographyCardActions,
    BiographyCardText,
    TreeView
  }
}
</script>

<style scoped>
  @import "../../../static/css/bibliography.css";
</style>
