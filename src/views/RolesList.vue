<template>
    <list
      :infinite-load="infiniteLoad"
    >
      <template slot="item" slot-scope="{ item }">
        <role-card
          v-bind="item"
        >
        </role-card>
      </template>
    </list>
</template>

<script>
import List from '../components/list/List'
import rolesService from '../services/roles-service'
import RoleCard from '../components/role/card/RoleCard'

export default {
  name: 'RolesList',
  components: { RoleCard, List },
  methods: {
    infiniteLoad () {
      return rolesService.getRoles()
    }
  }
}
</script>

<style scoped>

</style>
