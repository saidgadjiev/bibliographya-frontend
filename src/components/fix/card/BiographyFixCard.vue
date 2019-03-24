<template>
  <v-card>
    <biography-fix-title class="pb-0" v-bind="$attrs"/>
    <biography-card-title :show-menu="false" v-bind="biography"/>
    <v-divider></v-divider>
    <biography-card-text
      v-if="_showBiography"
      v-bind="biography"
      class="pb-1"
      :biography-clamp="$attrs['biography-clamp']"
      :tree-clamp="$attrs['tree-clamp']"
      :tree-clamp-size="$attrs['tree-clamp-size']"
    />
    <biography-like-info v-bind.sync="biography" class="pb-1"/>
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
import BiographyLikeInfo from '../../biography/card/BiographyLikeInfo'
export default {
  name: 'BiographyFixCard',
  components: { BiographyLikeInfo, BiographyFixActions, BiographyCardText, BiographyCardTitle, BiographyFixTitle, BiographyCardActions },
  props: {
    biography: Object
  },
  computed: {
    _showBiography () {
      return !!this.biography.biography
    }
  }
}
</script>

<style scoped>

</style>
