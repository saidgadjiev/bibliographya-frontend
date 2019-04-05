<template>
  <v-card>
    <biography-fix-title class="pb-0" v-bind="$attrs"/>
    <biography-card-title v-bind.sync="biography"/>
    <v-divider></v-divider>
    <biography-card-text
      v-if="_showBiography"
      v-bind="biography"
      class="pb-1"
      :biography-clamp="$attrs['biography-clamp']"
      :tree-clamp="$attrs['tree-clamp']"
      :tree-clamp-size="$attrs['tree-clamp-size']"
    />
    <v-divider></v-divider>
    <biography-card-actions v-bind.sync="biography"/>
    <biography-fix-actions v-bind="$attrs" v-on="$listeners"/>
  </v-card>
</template>

<script>
import BiographyCardActions from '../../biography/card/BiographyCardActions'
import BiographyFixTitle from './BiographyFixTitle'
import BiographyCardTitle from '../../biography/card/BiographyCardTitle'
import BiographyCardText from '../../biography/card/BiographyCardText'
import BiographyFixActions from './BiographyFixActions'
export default {
  name: 'BiographyFixCard',
  components: { BiographyCardText, BiographyCardTitle, BiographyFixTitle, BiographyFixActions, BiographyCardActions },
  props: {
    biography: Object
  },
  computed: {
    _showBiography () {
      return !!this.biography.bio
    }
  }
}
</script>

<style scoped>

</style>
