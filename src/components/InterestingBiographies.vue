<template>
  <v-layout row justify-center>
    <v-flex xs12 v-for="(item, index) in items" :key="index">
      <biography-card2
        :biography="item"
        fio-class="body-2"
        biography-title-class="body-1"
        biography-class="caption"
      >
        <div slot="biographyClamp"  class="mt-3">
          <a :href="'#/biography/' + item.id">Читать дальше</a>
        </div>
        <template slot="actions">
          <v-divider class="m-0"></v-divider>
          <v-card-actions class="pt-0 pb-0">
            <v-btn icon>
              <v-icon color="primary" style="font-size:14px">fas fa-heart</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-icon color="primary" style="font-size:14px">fas fa-eye</v-icon>
          </v-card-actions>
        </template>
      </biography-card2>
    </v-flex>
  </v-layout>
</template>

<script>
import BiographyCard2 from '../components/BiographyCard2'

export default {
  name: 'InterestingBiographies',
  data () {
    return {
      items: [
        {
          firstName: 'Тест',
          lastName: 'Тестовый',
          middleName: 'Тестович',
          biography: 'Тест'
        }
      ]
    }
  },
  components: {
    BiographyCard2
  }
}
</script>

<style scoped>

</style>
