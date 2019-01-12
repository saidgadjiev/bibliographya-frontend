<template>
  <div>
    <toolbar
      @help="helpDialogVisible = true"
    ></toolbar>
    <v-textarea
      rows="20"
      v-model="_text"
      :label="label"
      type="text"
    ></v-textarea>
    <help-dialog
      :visible.sync="helpDialogVisible"
      :help="d_help"
    ></help-dialog>
  </div>
</template>

<script>
import { CONFIG } from '../../markdown/config'
import HelpDialog from './HelpDialog'
import Toolbar from './Toolbar'

export default {
  name: 'MarkdownEditor',
  components: { Toolbar, HelpDialog },
  data () {
    return {
      d_help: null,
      helpDialogVisible: false
    }
  },
  props: {
    label: {
      type: String
    },
    text: {
      type: String
    }
  },
  computed: {
    _text: {
      get () {
        return this.text
      },
      set (val) {
        this.$emit('update:text', val)
      }
    }
  },
  created () {
    this.initLanguage()
  },
  methods: {
    initLanguage () {
      let lang = CONFIG.langList.indexOf(this.language) >= 0 ? this.language : 'ru'

      this.d_help = CONFIG[`help_${lang}`]
    }
  }
}
</script>

<style scoped>

</style>
