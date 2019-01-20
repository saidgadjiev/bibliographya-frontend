<template>
  <div>
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
// Import TinyMCE
import tinymce from 'tinymce/tinymce'

// A theme is also required
import 'tinymce/themes/modern/theme'
import 'tinymce/themes/mobile/theme'

// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/media'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/print'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/bbcode'
import 'tinymce/plugins/code'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/help'
import 'tinymce/plugins/image'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/legacyoutput'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/save'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/table'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/toc'
import 'tinymce/plugins/visualchars'

export default {
  name: 'tinymce',
  props: {
    id: {
      type: String,
      required: true
    },
    value: { default: '' }
  },
  data () {
    return {
      content: '',
      editor: null,
      cTinyMce: null,
      checkerTimeout: null,
      isTyping: false
    }
  },
  mounted () {
    this.content = this.value

    this.init()
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  watch: {
    value: function (newValue) {
      if (!this.isTyping) {
        if (this.editor !== null) {
          this.editor.setContent(newValue)
        } else {
          this.content = newValue
        }
      }
    },
    readonly (value) {
      if (value) {
        this.editor.setMode('readonly')
      } else {
        this.editor.setMode('design')
      }
    }
  },
  methods: {
    init () {
      let options = {
        theme: 'modern',
        mobile: {
          theme: 'mobile',
          plugins: [ 'autosave', 'lists', 'autolink' ],
          toolbar: [ 'undo', 'bold', 'italic', 'underline', 'link', 'unlink', 'bullist', 'numlist', 'fontsizeselect',
            'forecolor', 'styleselect', 'styleselect' ]
        },
        selector: '#' + this.id,
        skin: false,
        height: 300,
        language_url: '/static/tinymce/lang/ru.js',
        branding: false,
        toolbar1: 'formatselect | bold italic  strikethrough  forecolor backcolor ' +
          '| link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  ' +
          '| removeformat fontname fontsize', // this.$el.childNodes[0].setAttribute('test', 't')
        plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'template paste textcolor colorpicker textpattern imagetools toc help emoticons hr codesample'
        ],
        menubar: 'edit view insert format tables',
        removed_menuitems: 'code visualblocks visualchars visualaid image media template codesample charmap pagebreak nonbreaking ' +
          'anchor toc codeformat',
        init_instance_callback: this.initEditor
      }
      tinymce.init(options)
    },
    initEditor (editor) {
      this.editor = editor
      editor.on('KeyUp', (e) => {
        this.submitNewContent()
      })
      editor.on('Change', (e) => {
        if (this.editor.getContent() !== this.value) {
          this.submitNewContent()
        }
        this.$emit('editorChange', e)
      })
      editor.on('init', (e) => {
        editor.setContent(this.content)
        this.$emit('input', this.content)
      })
      if (this.readonly) {
        this.editor.setMode('readonly')
      } else {
        this.editor.setMode('design')
      }

      this.$emit('editorInit', editor)
      this.editor.setContent(this.content)
    },
    submitNewContent () {
      this.isTyping = true
      if (this.checkerTimeout !== null) { clearTimeout(this.checkerTimeout) }
      this.checkerTimeout = setTimeout(() => {
        this.isTyping = false
      }, 300)

      this.$emit('update:value', this.editor.getContent())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../../../node_modules/tinymce/skins/lightgray/skin.min.css';
  @import '../../../node_modules/tinymce/skins/lightgray/content.mobile.min.css';
  @import '../../../node_modules/tinymce/skins/lightgray/skin.mobile.min.css';
</style>
