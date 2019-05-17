<template>
  <v-card height="100">
    <v-card-text style="height:100%">
      <v-layout row fill-height>
        <v-flex shrink align-self-center>
          <v-icon style="font-size: 1.5rem" @click="closeSuggest">
            fas fa-times
          </v-icon>
        </v-flex>
        <v-flex shrink align-self-center class="pl-2">
          <div style="display: flex; flex-direction: row; align-items: center">
            <bibliographya-native-icon/>
            <div style="display: flex; flex-direction: column; align-items: center" class="pl-1">
              <span>Приложение</span>
              <span style="font-size: 1.2rem" class="font-weight-medium">Биографии</span>
            </div>
          </div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex shrink align-self-center>
          <a :href="_intent" class="bib-a font-weight-medium">ОТКРЫТЬ</a>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import BibliographyaNativeIcon from '../../components/icon/BibliographyaNativeIcon'
import nativeApp from '../../mixins/native-app'

export default {
  name: 'OpenNativeBar',
  mixins: [nativeApp],
  components: { BibliographyaNativeIcon },
  methods: {
    closeSuggest () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
