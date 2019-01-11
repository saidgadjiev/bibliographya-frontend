<template>
  <list
    :infinite-load="infiniteLoad"
  >
    <template slot="item" slot-scope="{ item }">
      <user-card
        v-bind.sync="item"
        :all-roles="_roles"
      ></user-card>
    </template>
  </list>
</template>

<script>
import List from '../components/list/List'
import UserCard from '../components/user/UserCard'
import usersService from '../services/users-service'
import rolesService from '../services/roles-service'

export default {
  name: 'UsersList',
  components: { UserCard, List },
  methods: {
    infiniteLoad (limit, offset) {
      let that = this

      return usersService.getUsers(limit, offset)
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
  asyncComputed: {
    _roles: {
      get () {
        return rolesService.getRoles()
          .then(
            response => {
              return response.data
            }
          )
      },
      default: []
    }
  }
}
</script>

<style scoped>

</style>
