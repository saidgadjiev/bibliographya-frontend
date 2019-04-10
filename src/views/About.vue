<template>
  <v-layout row justify-center wrap>
    <v-flex xs12>
      <v-card class="blue darken-3" :class="{'pa-5': $vuetify.breakpoint.mdAndUp}">
        <v-card-text>
          <h3 style="color: #64B5F6">Бибилиография это</h3>
          <h1
            class="font-weight-black white--text"
            style="font-size: 2.20rem;letter-spacing: -.1rem"
          >
            Cервис, где вы можете написать свою автобиографию и поделиться ею с другими людьми. Так же вы можете
            поделиться биографиями людей, о которых вы хотели бы рассказать.
          </h1>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="green">
        <v-card-title primary-title>
          <h1
            class="font-weight-black white--text"
            style="font-size: 2.20rem;">Расскажите о себе</h1>
        </v-card-title>
        <v-card flat>
          <v-card-title>
          <span class="title word-break-word">Гаджиев Саид
          <v-icon small color="blue darken-3" class="pb-1">mdi-check-decagram</v-icon>
        </span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <div class="toc word-break-word">
                <ol>
                  <li><a class="bib-a">Биография</a>
                    <ol>
                      <li><a class="bib-a">Школа</a>
                      </li>
                      <li><a class="bib-a">Когда был
                        спортсменом</a></li>
                      <li><a class="bib-a">Университет</a>
                      </li>
                    </ol>
                  </li>
                </ol>
              </div>
              <div>
                <div><a class="subheading font-weight-bold">Показать
                  содержание...</a></div>
              </div>
            </div>
            <div class="pt-1">
              <p><strong>Гаджиев Саид&nbsp;</strong>- владелец и разработчик сервиса <strong>Библиография</strong>.</p>
              <h1>Биография</h1>
              <p>Приветствую тебя, уважаемый читатель. Меня зовут Саид. По национальн...</p><a
              class="bib-a h4 font-weight-bold subheading">
              Читать дальше...
            </a></div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card class="pink lighten-1">
        <v-card-title primary-title>
          <h1
            class="font-weight-black white--text"
            style="font-size: 2.20rem;">Опубликуйте биографию, чтобы другие могли ее прочитать</h1>
        </v-card-title>
        <v-card flat>
          <v-card-title>
          <span class="title word-break-word">Гаджиев Саид
          <v-icon small color="blue darken-3" class="pb-1">mdi-check-decagram</v-icon>
        </span>
            <v-menu left close-on-content-click v-model="menuVisible">
              <template #activator="{ on }">
                <v-btn
                  class="absolute-activator"
                  color="light-blue lighten-2"
                  absolute
                  right
                  icon
                  v-on="on"
                >
                  <v-icon :small="$vuetify.breakpoint.smAndDown" color="blue darken-3">{{ _icon }}</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-title>
                    Опубликовать
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <div class="toc word-break-word">
                <ol>
                  <li><a class="bib-a">Биография</a>
                    <ol>
                      <li><a class="bib-a">Школа</a>
                      </li>
                      <li><a class="bib-a">Когда был
                        спортсменом</a></li>
                      <li><a class="bib-a">Университет</a>
                      </li>
                    </ol>
                  </li>
                </ol>
              </div>
              <div>
                <div><a class="subheading font-weight-bold">Показать
                  содержание...</a></div>
              </div>
            </div>
            <div class="pt-1">
              <p><strong>Гаджиев Саид&nbsp;</strong>- владелец и разработчик сервиса <strong>Библиография</strong>.</p>
              <h1>Биография</h1>
              <p>Приветствую тебя, уважаемый читатель. Меня зовут Саид. По национальн...</p><a
              class="bib-a h4 font-weight-bold subheading">
              Читать дальше...
            </a></div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card class="indigo darken-1">
        <v-card-title primary-title>
          <h1
            class="font-weight-black white--text"
            style="font-size: 2.20rem;">Читайте биографии других, ставьте "Мне нравится", комментируйте, делитесь в соц.
            сетях</h1>
        </v-card-title>
        <v-card flat>
          <v-card-title>
          <span class="title word-break-word">Рокфеллер Джон
          <v-icon small color="blue darken-3" class="pb-1">mdi-check-decagram</v-icon>
        </span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <div class="toc word-break-word">
                <ol>
                  <li><a class="bib-a">Биография</a>
                    <ol>
                      <li><a class="bib-a">Карьера</a></li>
                      <li><a class="bib-a">Семья</a>
                      </li>
                      <li><a class="bib-a">Благотворительность</a>
                      </li>
                    </ol>
                  </li>
                </ol>
              </div>
              <div>
                <div><a class="subheading font-weight-bold">Показать
                  содержание...</a></div>
              </div>
              <p class="word-break-word">
              <p><strong>Джон Рокфеллер</strong> - американский предприниматель, филантроп, первый официальный
                долларовый миллиардер в истории человечества.</p>
              <h2>Биография</h2>
              <p>Справедливости ради стоит ска...</p><a class="bib-a h4 font-weight-bold subheading">
              Читать дальше...
            </a></div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions style="background-color: #B3E5FC">
            <div class="d-flex align-center">
              <v-btn icon flat color="blue darken-1">
                <v-icon>fas fa-heart</v-icon>
              </v-btn>
              <span style="font-size: 18px; color: #007bff">10</span>
            </div>
            <div class="ml-4 d-flex align-center">
              <v-icon color="blue darken-1">mdi-comment-outline</v-icon>
              <span style="font-size: 18px;color: #007bff" class="pl-1">100</span>
            </div>
            <v-speed-dial
              class="ml-4"
              v-model="shares"
              direction="right"
              open-on-hover
            >
              <template #activator>
                <v-btn icon flat color="blue darken-1" v-model="shares">
                  <v-icon color="blue darken-1">mdi-share-outline</v-icon>
                </v-btn>
              </template>
              <v-btn
                fab
                dark
                small
                color="primary"
              >
                <v-icon dark style="font-size: 24px;">fab fa-vk</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="green darken-1"
              >
                <v-icon dark style="font-size: 24px;">fab fa-whatsapp</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="blue lighten-1"
              >
                <v-icon dark style="font-size: 24px;">fab fa-telegram</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      shares: true,
      menuVisible: true
    }
  },
  computed: {
    _icon () {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return 'fas fa-angle-down'
      }

      return 'fas fa-ellipsis-h'
    }
  }
}
</script>

<style scoped>
  .absolute-activator {
    top: 10px;
  }
</style>
