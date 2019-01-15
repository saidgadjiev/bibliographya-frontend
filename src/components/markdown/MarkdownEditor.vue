<template>
  <div>
    <tiny-editor id="d1" v-model="_text" :other_options="options1"></tiny-editor>
    <strong class="headline preview-header font-weight-medium">Предпросмотр</strong>
    <div class="preview" v-html="text"></div>
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
import markdown from '../../mixins/markdown'
import TinyEditor from 'vue-tinymce-editor'

export default {
  name: 'MarkdownEditor',
  mixins: [markdown],
  components: { Toolbar, HelpDialog, TinyEditor },
  data () {
    return {
      d_help: null,
      helpDialogVisible: false,
      options1: {
        height: 300,
        language_url: 'http://localhost:8080/static/tinymce/lang/ru.js',
        menubar: 'edit view insert format tables',
        /* menu: {
          edit: {title: 'Изменить', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace'},
          view: {title: 'Вид', items: 'fullscreen preview'},
          insert: {title: 'Вставить', items: 'link inserttable | hr | insertdatetime'},
          format: {title: 'Формат', items: 'bold italic underline strikethrough subscript superscript | blockformats align | removeformat'},
          tables: {title: 'Таблица', items: 'inserttable tableprops deletetable column row | cell'}
        } */
        removed_menuitems: 'code visualblocks visualchars visualaid image media template codesample charmap pagebreak nonbreaking ' +
          'anchor toc codeformat'
      }
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
    _compiledText () {
      let compiled = ''

      this.$render(this.text, function (res) {
        compiled = res
      })

      return compiled
    },
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
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style scoped>
  .preview {
    height: 300px;
    overflow: scroll;
    font-size: 20px;
  }

  .preview-header {
    color: #1B5E20;
  }
</style>
