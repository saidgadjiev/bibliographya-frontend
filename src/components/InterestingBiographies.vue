<template>
  <v-layout row justify-center>
    <v-flex xs12 v-for="(item, index) in items" :key="index">
      <biography-card2
        :tree-size="treeSize"
        biographyClampSize="50"
        :biography="item"
        fio-class="body-2"
        biography-title-class="body-1"
        biography-class="caption"
      >
        <div slot="treeClamp" v-if="treeSize">
          <a class="caption" href="#" @click="treeSize = undefined">Показать содержание</a>
        </div>
        <div slot="treeClamp" v-else>
          <a class="caption" href="#" @click="treeSize = 1">Скрыть содержание</a>
        </div>
        <div slot="biographyClamp"  class="mt-3">
          <a class="caption" :href="'#/biography/' + item.id">Читать дальше</a>
        </div>
      </biography-card2>
    </v-flex>
  </v-layout>
</template>

<script>
import BiographyCard2 from './biography/BiographyCard'

export default {
  name: 'InterestingBiographies',
  data () {
    return {
      treeClampSize: 1,
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
