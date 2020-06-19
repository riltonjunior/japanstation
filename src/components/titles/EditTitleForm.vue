<template>
      <div class="q-pa-md" style="width: 500px">
        <div class="q-gutter-md">
          <q-img v-if="title.posterImage.medium" :src="title.posterImage.medium" style="max-width: 180px; height: 265px;"></q-img>
          <q-input type="text" label="Title name" v-model="title.title" readonly  filled />
          <q-input type="text" label="Title name (Japanese)" v-model="title.title_jp" readonly  filled />
          <q-input type="text" label="Title name (Portuguese)" v-model="title.title_br" filled required autofocus />
          <q-input type="textarea" label="Synopsys" v-model="title.synopsis_br" autogrow filled required autofocus />
          <q-btn color="primary" @click.prevent="AddNewTitle">Salvar</q-btn>
        </div>
      </div>
</template>

<script>
import { db, firebase } from '../../boot/firebase'
import { showErrorMessage } from '../../functions/function-show-error-message'
// import { showNotify } from '../../functions/function-show-notify'
import { mapState, mapGetters } from 'vuex'
import { uid } from 'quasar'

export default {
  name: 'EditTitleForm',
  props: {
    editTitle: Object
  },
  data () {
    return {
      title: {
        uid: '',
        title: '',
        synopsis_en: '',
        synopsis_br: '',
        title_br: '',
        posterImage: '',
        created_at: ''
      }
    }
  },
  computed: {
    ...mapState('titles', ['titles', 'currentTitle']),
    ...mapState('auth', ['isLoggedIn', 'user']),
    ...mapGetters({
      usersById: 'users/usersById'
    })
  },
  methods: {
    AddNewTitle () {
      const currentUID = uid()
      const titleRef = this.title
      const editTitleRef = this.editTitle
      const userRef = this.user

      db.collection('titles')
        .where('title', '==', titleRef.title)
        .get()
        .then(function (doc) {
          if (doc.empty) {
            db.collection('titles')
              .doc(currentUID)
              .set({
                uid: currentUID,
                title: editTitleRef.attributes.canonicalTitle,
                title_br: titleRef.title_br,
                title_jp: editTitleRef.attributes.titles.ja_jp,
                synopsis_en: editTitleRef.attributes.synopsis,
                synopsis_br: titleRef.synopsis_br,
                kitsu_id: editTitleRef.id,
                type: editTitleRef.type,
                showType: editTitleRef.attributes.showType,
                status: editTitleRef.attributes.status,
                startDate: editTitleRef.attributes.startDate,
                endDate: editTitleRef.attributes.endDate,
                episodeCount: editTitleRef.attributes.episodeCount,
                episodeLength: editTitleRef.attributes.episodeLength,
                slug: editTitleRef.attributes.slug,
                youtubeVideoId: editTitleRef.attributes.youtubeVideoId,
                nsfw: editTitleRef.attributes.nsfw,
                ageRatingGuide: editTitleRef.attributes.ageRatingGuide,
                ageRating: editTitleRef.attributes.ageRating,
                tba: editTitleRef.attributes.tba,
                posterImage: editTitleRef.attributes.posterImage,
                coverImage: editTitleRef.attributes.coverImage,
                kitsuLatestUpdate: editTitleRef.attributes.updatedAt,
                created_by: userRef.id,
                created_at: firebase.firestore.Timestamp.now(),
                updated_at: firebase.firestore.Timestamp.now(),
                releases: []
              })
              .then(function () {
                console.log('Title:', titleRef.title)
              })
              .catch(function (error) {
                console.error('Error writing document: ', error)
                showErrorMessage('Ocorreu um erro na sua adição.')
              })
          } else {
            console.log('Já existe um titulo com este nome.')
          }
        })
        .then(res => {
          this.title = {
            uid: '',
            title: '',
            synopsis_en: '',
            synopsis_br: '',
            title_br: '',
            posterImage: '',
            created_at: ''
          }
        })
    },
    updateTitle () {
      const titleRef = this.group
      const titleDB = db.collection('titles').doc(titleRef.uid)

      return titleDB.update({
        name: titleRef.name,
        updated_at: Date.now()
      }).then(function () {
        console.log('Title', titleRef.name, 'updated')
        this.watcher()
      }).catch(function (error) {
        console.error('Error writing this title: ', error)
        showErrorMessage('Ocorreu um erro na sua edição.')
      })
    },
    reset () {
      Object.assign(this.$data, this.$options.data.apply(this))
    }
    // this.updateGroup()
    // showNotify('info', 'Grupo atualizado com sucesso.')
  },
  mounted () {
    if (this.editTitle !== null) {
      this.title = {
        uid: '',
        title: this.editTitle.attributes.canonicalTitle,
        title_br: '',
        title_jp: this.editTitle.attributes.titles.ja_jp,
        synopsis_en: this.editTitle.attributes.synopsis,
        synopsis_br: this.editTitle.attributes.synopsis,
        posterImage: this.editTitle.attributes.posterImage,
        created_at: ''
      }
    }
  }
}
</script>

<style>
</style>
