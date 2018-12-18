<template>
  <base-card>
    <template slot="title">
      <biography-card-title-moderation v-bind="$attrs"/>
      <v-spacer></v-spacer>
      <biography-card-menu v-bind="$attrs"/>
      <biography-card-title v-bind="$attrs"/>
    </template>
    <template slot="text">
    </template>
    <template slot="actions">
      <biography-card-actions v-bind="$attrs" v-on="$listeners"/>
    </template>
  </base-card>
</template>

<script>
import BiographyCardTitleModeration from './card/BiographyCardTitleModeration'
import BiographyCardActions from './card/BiographyCardActions'
import BiographyCardMenu from './card/BiographyCardMenu'
import BiographyCardTitle from './card/BiographyCardTitle'
import BaseCard from './card/BaseCard'
import BiographyCardText from './card/BiographyCardText'
import TreeView from '../tree/TreeView.vue'
import Comments from '../comment/Comments'

export default {
  name: 'biography-card',
  components: {
    BaseCard,
    BiographyCardTitleModeration,
    BiographyCardActions,
    BiographyCardTitle,
    BiographyCardMenu,
    BiographyCardText,
    TreeView,
    Comments
  }
}
</script>

<style scoped>
  @import "../../../static/bibliography.css";
</style>
