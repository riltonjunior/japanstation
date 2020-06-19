<template>
  <q-dialog ref="dialog" @hide="onDialogHide" toolbar>
    <q-card class="q-dialog-plugin">
      <q-toolbar>
          <q-toolbar-title>Editar grupo</q-toolbar-title>
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
        </q-form>
      </div>
      <q-card-actions align="right">
        <q-btn color="primary" label="Salvar alterações" @click="onOKClick" no-caps/>
        <q-btn color="primary" label="Cancelar" @click="onCancelClick" no-caps/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { db } from '../../boot/firebase'
import { showErrorMessage } from '../../functions/function-show-error-message'
import { showNotify } from '../../functions/function-show-notify'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'EditGroupForm',
  props: {
    editGroup: Object
  },
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
    updateGroup () {
      const groupRef = this.group
      const groupDB = db.collection('groups').doc(groupRef.uid)

      return groupDB.update({
        name: groupRef.name,
        typeTitles: groupRef.typeTitles,
        typeReleases: groupRef.typeReleases,
        urlSite: groupRef.urlSite,
        urlStreaming: groupRef.urlStreaming,
        urlTracker: groupRef.urlTracker,
        updated_at: Date.now()
      }).then(function () {
        console.log('Group', groupRef.name, 'updated')
        this.watcher()
      }).catch(function (error) {
        console.error('Error writing document: ', error)
        showErrorMessage('Ocorreu um erro na sua edição.')
      })
    },
    reset () {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    show () {
      this.$refs.dialog.show()
      this.group = this.editGroup
    },
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onOKClick () {
      if (this.group.name.length !== 0) {
        this.updateGroup()
        showNotify('info', 'Grupo atualizado com sucesso.')
        this.$emit('ok')
        this.hide()
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
