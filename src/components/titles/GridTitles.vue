<template>
   <div class="row q-gutter-sm items-start full-width">
    <q-card class="anime-card col-sm-6 col-md-2 shadow-13"  v-for="(title, key, index) in titles" :key="index">
      <q-img :src="title.posterImage.medium">
        <div class="absolute-bottom">
          <div class="text-subtitle2">{{ title.title }}</div>
          <div class="text-caption"><q-chip square color="primary" text-color="white" dense>{{ title.showType }}</q-chip> <span v-if="title.episodeCount > 1">{{title.episodeCount}} Episodes</span></div>
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'GridTitles',
  computed: {
    ...mapState('titles', ['titles']),
    ...mapGetters('titles', ['countTitles'])
  },
  methods: {
    ...mapActions('titles', ['bindTitles', 'unbindTitles'])
  },
  async mounted () {
    await this.bindTitles()
  },
  destroyed () {
    this.unbindTitles()
  }
}
</script>

<style lang="sass" scoped>
.anime-card
  // width: 100%
  min-width: 120px
  @media(min-width: 1024px)
    width: 15.89%
  @media(min-width: 768px)
    width: 18.89%
</style>
