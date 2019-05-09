import { ROLES } from '../config'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      Roles: ROLES
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'isAuthorized'
    ])
  }
}
