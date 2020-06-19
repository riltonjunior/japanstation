<template>
  <q-dialog ref="dialog" @hide="onDialogHide" toolbar>
    <q-card class="q-dialog-plugin">
      <q-toolbar>
          <q-toolbar-title>Adicionar novo grupo</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
      <div class="q-pa-md">
        <q-form class="q-gutter-md">
          <q-input type="text" label="Nome do grupo" v-model="group.name" dense filled required autofocus />
          <div class="bg-grey-4 q-pa-sm rounded-borders">
            Tipos de títulos
            <q-option-group
              type="toggle"
              :options="optionTypeTitles"
              inline
              v-model="group.typeTitles"
              dense
              filled
            />
          </div>
          <div class="bg-grey-4 q-pa-sm rounded-borders">
            Tipos de releases
            <q-option-group
              type="toggle"
              :options="optionTypeReleases"
              inline
              v-model="group.typeReleases"
              dense
              filled
            />
          </div>
          <q-input type="url" label="Site oficial" v-model="group.urlSite" dense filled />
          <q-input type="url" label="Streaming" v-model="group.urlStreaming" dense filled />
          <q-input type="url" label="IRC" v-model="group.urlTracker" dense filled />
          <q-toggle
            v-model="group.accept"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            label="Aceito os termos de uso e concordo com as políticas do site."
          />
          <!-- <div>
            <q-btn type="submit" label="Salvar" class="q-ml-sm" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div> -->
        </q-form>
      </div>
      <q-card-actions align="right">
        <q-btn color="primary" label="Adicionar novo grupo" @click="onOKClick" no-caps/>
        <q-btn color="primary" label="Cancelar" @click="onCancelClick" no-caps/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { db, firebase } from '../../boot/firebase'
import { mapState, mapGetters } from 'vuex'
import { uid } from 'quasar'

import { showErrorMessage } from '../../functions/function-show-error-message'
import { showNotify } from '../../functions/function-show-notify'

export default {
  name: 'AddNewGroupForm',
  data () {
    return {
      group: {
        uid: '',
        name: '',
        typeTitles: [],
        typeReleases: [],
        urlSite: '',
        urlStreaming: '',
        urlTracker: '',
        accept: false,
        created_at: '',
        updated_at: '',
        releases: []
      },
      optionTypeTitles: [
        {
          label: 'Anime',
          value: 'anime'
        },
        {
          label: 'Mangá',
          value: 'manga'
        }
      ],
      optionTypeReleases: [
        {
          label: 'Fansub',
          value: 'fansub'
        },
        {
          label: 'Streaming',
          value: 'streaming'
        },
        {
          label: 'RAW',
          value: 'raw'
        },
        {
          label: 'AMV',
          value: 'amv'
        },
        {
          label: 'PV',
          value: 'pv'
        },
        {
          label: 'Hentai',
          value: 'hentai'
        }
      ]
    }
  },
  computed: {
    ...mapState('groups', ['groups']),
    ...mapState('auth', ['isLoggedIn', 'user']),
    ...mapGetters({
      usersById: 'users/usersById'
    })
  },
  methods: {
    AddNewGroup () {
      const currentUID = uid()
      const groupRef = this.group
      db.collection('groups')
        .where('name', '==', groupRef.name)
        .get()
        .then(function (doc) {
          if (doc.empty) {
            db.collection('groups')
              .doc(currentUID)
              .set({
                uid: currentUID,
                name: groupRef.name,
                typeTitles: groupRef.typeTitles,
                typeReleases: groupRef.typeReleases,
                urlSite: groupRef.urlSite,
                urlStreaming: groupRef.urlStreaming,
                urlTracker: groupRef.urlTracker,
                accept: groupRef.accept,
                created_at: firebase.firestore.Timestamp.now(),
                updated_at: Date.now(),
                releases: []
              })
              .then(function () {
                console.log('Group:', groupRef.name)
              })
              .catch(function (error) {
                console.error('Error writing document: ', error)
                showErrorMessage('Ocorreu um erro na sua adição.')
              })
          } else {
            console.log('Já existe um grupo com este nome.')
          }
        })
        .then(res => {
          this.group = {
            uid: '',
            name: '',
            typeTitles: [],
            typeReleases: [],
            urlSite: '',
            urlStreaming: '',
            urlTracker: '',
            accept: false,
            created_at: '',
            updated_at: '',
            releases: []
          }
        })
    },
    reset () {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onOKClick () {
      if (this.group.name.length !== 0) {
        if (this.group.accept) {
          this.AddNewGroup()
          showNotify('info', 'Grupo adicionado com sucesso.')
          this.$emit('ok')
          this.hide()
        } else {
          console.log(this.group.name.length)
          showErrorMessage('Você deve aceitar os termos de uso para continuar.')
        }
      } else {
        showErrorMessage('Para continuar, dê nome ao seu grupo.')
      }
    },

    onCancelClick () {
      this.hide()
    }
  }
}
</script>

<style>
</style>
