<template>
  <list
    :infinite-load="infiniteLoad"
    :infinite-id.sync="infiniteId"
    :delete-id="deleteId"
    :delete-index="deleteIndex"
  >
    <template slot="header">
      <v-layout align-center justify-center row>
        <v-btn class="primary white--text" @click="createCategory()">
          Создать категорию
        </v-btn>
      </v-layout>
    </template>
    <template slot="item" slot-scope="{ item, index }">
      <category-card
        disable-link
        :category="item"
      >
      </category-card>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-btn
            color="red darken-3"
            class="white--text"
            block
            @click="remove(item, index)"
            :loading="removeLoading"
          >Удалить
          </v-btn>
        </v-flex>
        <v-flex xs12 sm8>
          <v-btn
            block
            class="white--text"
            color="blue darken-3"
            @click="edit(item.id)"
          >Редактировать
          </v-btn>
        </v-flex>
      </v-layout>
    </template>
  </list>
</template>

<script>
import fileService from '../services/file-service'
import biographyCategoryService from '../services/biography-category-service'
import List from '../components/list/List'
import CategoryCard from '../components/category/CategoryCard'

export default {
  name: 'CategoriesAdmin',
  data () {
    return {
      removeLoading: false,
      infiniteId: +new Date(),
      deleteId: +new Date(),
      deleteIndex: -1
    }
  },
  methods: {
    createCategory () {
      this.$router.push('/create/category')
    },
    remove: function (category, index) {
      this.removeLoading = true
      let that = this

      biographyCategoryService.remove(category.id)
        .then(
          () => {
            ++that.deleteId
            that.deleteIndex = index
          }
        )
        .finally(() => {
          that.removeLoading = false
        })
    },
    edit (categoryId) {
      this.$router.push('/edit/categories/' + categoryId)
    },
    infiniteLoad (limit, offset) {
      let that = this

      return biographyCategoryService.getCategories(limit, offset)
        .then(
          response => {
            if (response.status === 200) {
              response.data.content.forEach(function (val) {
                if (that.$vuetify.breakpoint.mdAndUp) {
                  val.flex = 6
                } else {
                  val.flex = 12
                }
              })
            }

            return response
          }
        )
    }
  },
  components: {
    List,
    CategoryCard
  }
}
</script>

<style scoped>

</style>
