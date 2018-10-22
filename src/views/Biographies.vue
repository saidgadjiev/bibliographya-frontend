<template>
    <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                        aspect-ratio="2.75"
                ></v-img>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                        <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat to="/details">Читать дальше</v-btn>
                </v-card-actions>
                <v-card-actions class="pl-3">
                    <v-btn icon>
                        <v-icon color="primary">fas fa-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon color="primary">fas fa-comment</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Account', icon: 'account_box' },
        { title: 'Admin', icon: 'gavel' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
