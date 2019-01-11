export default {
  props: {
    firstName: {
      type: String,
      default: ''
    },
    lastName: {
      type: String,
      default: ''
    },
    middleName: {
      type: String,
      default: ''
    }
  },
  computed: {
    fullName () {
      let full = this.lastName + ' ' + this.firstName
      if (this.middleName) {
        return full + ' ' + this.middleName
      }

      return full
    }
  }
}
