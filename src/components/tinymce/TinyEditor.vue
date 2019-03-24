<template>
  <div>
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
// Import TinyMCE
import tinymce from 'tinymce/tinymce'

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
    this.content = this.value ? this.value : ''

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
  methods: {
    init () {
      let options = {
        mobile: {
          plugins: [ 'autosave', 'lists', 'autolink' ],
          toolbar: [ 'undo', 'bold', 'italic', 'underline', 'link', 'unlink', 'bullist', 'numlist', 'fontsizeselect',
            'forecolor', 'styleselect', 'styleselect' ]
        },
        selector: '#' + this.id,
        min_height: 500,
        language: 'ru',
        branding: false,
        readonly: this.readonly ? 1 : 0,
        toolbar1: 'formatselect | bold italic  strikethrough  forecolor backcolor ' +
          '| link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  ' +
          '| removeformat fontname fontsize', // this.$el.childNodes[0].setAttribute('test', 't')
        plugins: ['advlist autoresize autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table directionality',
          'template paste textpattern imagetools toc help hr codesample'
        ],
        menubar: 'edit view insert format table',
        removed_menuitems: 'code visualblocks visualchars visualaid image media template codesample charmap pagebreak nonbreaking ' +
          'anchor toc codeformat',
        init_instance_callback: this.initEditor,
        skin: 'oxide'
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
</style>
