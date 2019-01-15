<template>
  <v-card-text>
    <span>Биография:</span>
    <tree-view :items="tree" v-bind="$attrs"></tree-view>
    <clamp
      class="markdown-body"
      :source="biographyHtml"
      :clamp="biographyClamp"
      :clamp-size="biographyClampSize"
      :clamp-link="_biographyLink"
      clamp-link-label="Читать дальше"
    ></clamp>
  </v-card-text>
</template>

<script>
import TreeView from '../../tree/TreeView'
import Clamp from '../../markdown/HtmlClamp'
import markdown from '../../../mixins/markdown'

export default {
  name: 'BiographyCardText',
  mixins: [markdown],
  data () {
    return {
      biographyHtml: '',
      tree: []
    }
  },
  props: {
    biography: {
      type: String,
      default: ''
    },
    biographyClamp: {
      type: Boolean,
      default: false
    },
    biographyClampSize: {
      type: Number
    },
    resetIds: {
      type: Boolean,
      default: true
    },
    id: {
      type: Number
    }
  },
  computed: {
    _biographyLink () {
      return '/biography/' + this.id
    }
  },
  components: {
    Clamp,
    TreeView
  }
}
</script>

<style scoped>

</style>
