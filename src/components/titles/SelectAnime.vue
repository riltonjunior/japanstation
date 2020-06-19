<template>
    <div class="q-pa-md" style="min-width: 500px">
          <q-input
              name="title"
              v-model="title"
              color="primary"
              label="Digite o nome do anime"
              filled
              clearable
              v-on:keyup.enter="getAnime(title)"
          >
            <template v-slot:after>
              <q-btn icon="search" type="submit" @click.prevent="getAnime(title)" flat size="lg"/>
            </template>
          </q-input>
            <div>
            </div>
        <div class="margin" v-if="animes.length > 0">
          <transition
          transition-show="jump-down"
          transition-hide="jump-up"
          >
            <q-select
              filled
              v-model="choosenTitle"
              :options="animes"
              :display-value="displayTitle()"
              transition-show="jump-up"
              transition-hide="jump-up"
              label="Escolha uma opção">
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                  style="max-width: 460px"
                >
                  <q-item-section side>
                    <q-avatar size="xl" rounded>
                      <q-img :src="scope.opt.attributes.posterImage.tiny" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.attributes.canonicalTitle }} ({{ scope.opt.attributes.startDate | getYear }}) </q-item-label>
                    <q-item-label caption :lines="2">{{ scope.opt.attributes.synopsis }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge> {{scope.opt.attributes.subtype.toUpperCase()}} </q-badge>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sem resultados
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            </transition>
            <!-- <select v-model="choosenTitle">
              <option v-for="(anime, index) in animes" :key="index" :value="anime">{{ anime.attributes.canonicalTitle }}</option>
            </select> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SelectAnime',
  data () {
    return {
      animes: [],
      title: '',
      choosenTitle: '',
      choosenTitleGenres: null,
      loadingTitles: false
    }
  },
  watch: {
    choosenTitle (newVar, oldVar) {
      this.setCurrentTitle(newVar)
      console.log(newVar)
    }
  },
  computed: {
    ...mapState('titles', ['titles', 'currentTitle']),
    ...mapState('auth', ['isLoggedIn', 'user'])
  },
  filters: {
    getYear (year) {
      return year.slice(0, 4)
    },
    captilize (word) {
      return word.replace(/^./, word[0].toUpperCase())
    }
  },
  methods: {
    ...mapActions('titles', ['setCurrentTitle', 'changeStep']),
    displayTitle () {
      if (this.choosenTitle) {
        return this.choosenTitle.attributes.canonicalTitle + ' (' + this.choosenTitle.attributes.startDate.slice(0, 4) + ')'
      } else {
        return ''
      }
    },
    getAnime (title) {
      const SearchURL = 'https://kitsu.io/api/edge/anime'
      axios
        .get(SearchURL, {
          params: {
            'filter[text]': title
          }
        })
        .then(response => {
          console.log('Resposta:', response.data.data)
          this.animes = response.data.data
        })
        .catch(err => {
          console.log('Erro:', err)
        })
        .finally(() => {
          console.log('finally')
        })
    },
    getGenres (id) {
      const SearchURL = `https://kitsu.io/api/edge/anime/${id}/genres`
      axios
        .get(SearchURL)
        .then(response => {
          this.choosenTitleGenres = response.data.data
        })
        .catch(err => {
          console.log('Erro:', err)
        })
        .finally(() => {
          console.log('finally')
        })
    }
  }
}
</script>

<style scoped>
select {
    color: rgb(37, 37, 37);
    font-size: 1.25rem;
    padding: 10px;
    width: 500px;
}

.margin {
  margin-top: 10px
}

ul {
    text-align: left !important;
    list-style: none;
}

div {
    max-width: 800px;
}
</style>
