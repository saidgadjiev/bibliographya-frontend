<template>
  <v-card-text class="pt-0">
    <small class="font-weight-bold">
      <a class="bib-a" style="color: #37474F !important;" @click="showLikes">Понравилось {{ likesCount }} людям</a>
    </small>
    <likes v-bind="_attrs" v-on="$listeners" :visible.sync="likesDialogVisible"/>
  </v-card-text>
</template>

<script>
import Likes from '../../like/Likes'
export default {
  name: 'BiographyLikeInfo',
  inheritAttrs: false,
  components: { Likes },
  data () {
    return {
      likesDialogVisible: false
    }
  },
  props: {
    likesCount: Number
  },
  methods: {
    showLikes () {
      if (this.likesCount > 0) {
        this.likesDialogVisible = true
      }
    }
  },
  computed: {
    _attrs () {
      return Object.assign({},
        this.$attrs,
        {
          likesCount: this.likesCount
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
