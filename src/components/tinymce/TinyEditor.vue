<template>
  <div>
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// Import TinyMCE
import tinymce from 'tinymce/tinymce'

// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/media'
import 'tinymce/plugins/noneditable'
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
import 'tinymce/plugins/visualchars'

import 'tinymce/skins/ui/oxide/skin.mobile.min.css'

const axios = require('axios')

export default {
  name: 'TinyEditor',
  props: {
    id: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    mediaUrl: {
      type: String,
      default: ''
    },
    mediaBasePath: {
      type: String,
      default: ''
    },
    value: { default: '' }
  },
  data () {
    return {
      content: '',
      editor: null,
      checkerTimeout: null,
      isTyping: false
    }
  },
  mounted () {
    this.content = this.value ? this.value : ''

    this.init()
  },
  beforeDestroy () {
    if (this.editor) {
      tinymce.remove(this.editor)
    }
  },
  watch: {
    value: function (newValue) {
      if (!this.isTyping) {
        if (this.editor !== null) {
          this.editor.setContent(newValue)
        } else {
          this.content = newValue || ''
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
  computed: {
    ...mapGetters([
      'isAuthorized'
    ])
  },
  methods: {
    init () {
      let that = this

      let plugins, toolbar, removeMenuItems, mobileToolbar

      plugins = ['advlist autoresize spellchecker autolink lists link image imagetools charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime nonbreaking save table directionality',
        'template textpattern help hr codesample autosave'
      ]

      mobileToolbar = [ 'undo', 'redo', 'bold', 'italic', 'underline', 'link', 'unlink', 'image', 'bullist', 'numlist', 'fontsizeselect',
        'forecolor', 'styleselect', 'removeformat' ]
      toolbar = 'save | spellchecker | formatselect | bold italic  strikethrough  forecolor backcolor image ' +
        '| link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  ' +
        '| removeformat fontname fontsize'
      removeMenuItems = 'code visualblocks visualchars visualaid template media codesample charmap pagebreak nonbreaking anchor toc codeformat'

      let options = {
        theme_url: '/static/js/themes/silver/theme.min.js',
        mobile: {
          theme_url: '/static/js/themes/mobile/theme.min.js',
          toolbar: mobileToolbar,
          plugins: ['autosave', 'lists', 'autolink']
        },
        image_caption: true,
        selector: '#' + this.id,
        skin_url: '/static/css/tinymce',
        content_css: [
          '/static/fonts/roboto.css',
          '/static/css/tinyMCE.css'
        ],
        min_height: 400,
        max_height: 700,
        language: 'ru',
        language_url: '/static/tinymce/langs/ru.js',
        branding: false,
        readonly: this.readonly ? 1 : 0,
        relative_urls: false,
        convert_urls: false,
        spellchecker_languages: 'Russian=ru',
        spellchecker_rpc_url: 'http://speller.yandex.net/services/tinyspell',
        toolbar1: toolbar, // this.$el.childNodes[0].setAttribute('test', 't')
        plugins: plugins,
        menubar: 'edit view insert format table',
        removed_menuitems: removeMenuItems,
        init_instance_callback: this.initEditor,
        setup: function (editor) {
          editor.on('init', function (e) {
            editor.setContent(that.content)
            that.$emit('input', that.content)
            that.$emit('init', editor)
          })
        },
        save_onsavecallback: function () {
          that.$emit('save')
        },
        images_upload_handler: function (blobInfo, success, failure) {
          let formData = new FormData()

          formData.append('file', blobInfo.blob(), blobInfo.filename())

          axios.put(that.mediaUrl, formData)
            .then(
              response => {
                success(that.mediaBasePath + '/' + response.data.location)
                that.$emit('upload', response.data.location)
              },
              e => {
                if (e.response) {
                  failure('Image upload failed due to a XHR Transport error. Code: ' + e.response.status)
                }
              }
            )
        }
      }
      tinymce.init(options)
    },
    initEditor (editor) {
      this.editor = editor
      let that = this

      editor.on('KeyUp', (e) => {
        that.submitNewContent()
      })
      editor.on('Change', (e) => {
        if (that.editor.getContent() !== that.value) {
          that.submitNewContent()
        }
        that.$emit('editorChange', e)
      })
      if (this.readonly) {
        this.editor.setMode('readonly')
      } else {
        this.editor.setMode('design')
      }

      this.$emit('editorInit', editor)
    },
    submitNewContent () {
      this.isTyping = true
      let that = this
      if (this.checkerTimeout !== null) { clearTimeout(this.checkerTimeout) }
      this.checkerTimeout = setTimeout(() => {
        that.isTyping = false
      }, 300)

      this.$emit('input', this.editor.getContent())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
