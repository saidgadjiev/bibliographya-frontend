<template>
  <list
    :infinite-load="infiniteLoad"
    :delete-id="deleteId"
    :delete-index="deleteIndex"
  >
    <template slot="item" slot-scope="{ item, index }">
      <biography-card
        v-bind.sync="item"
        @biography-removed="biographyRemoved(index)"
        show-moderation-block
        show-user-actions
        :show-settings="showPublish(item)"
        show-publish
        show-anonymous-switch
        biography-clamp
        tree-clamp
        :show-moderation-actions="item.actions.length > 0"
        :tree-clamp-size="_treeClampSize"
      ></biography-card>
    </template>
    <template slot="no-results">
      <v-card>
        <v-card-text>
          <h4>У вас еще нет созданных биографий.</h4>
        </v-card-text>
        <v-card-actions style="justify-content: center">
          <v-btn color="green darken-2" @click="createBiography" class="white--text">
            Создать биографию
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import biographyService from '../services/biography-service'
import { MODERATION_STATUS, TREE_CLAMP_SIZE, BIOGRAPHY_CLAMP_SIZE } from '../config'
import BiographyCard from '../components/biography/card/BiographyCard'

export default {
  name: 'CreatedByMeBiographiesList',
  data () {
    return {
      deleteIndex: 0,
      deleteId: +new Date()
    }
  },
  methods: {
    showPublish (item) {
      return item.moderationStatus === MODERATION_STATUS.APPROVED
    },
    createBiography () {
      this.$router.push('/create/biography')
    },
    biographyRemoved (index) {
      this.deleteIndex = index
      ++this.deleteId
    },
    infiniteLoad (limit, offset) {
      return biographyService.getMyBiographies(limit, offset, BIOGRAPHY_CLAMP_SIZE)
    }
  },
  computed: {
    _treeClampSize () {
      return TREE_CLAMP_SIZE
    }
  },
  components: {
    List,
    BiographyCard
  }
}
</script>

<style scoped>

</style>
