<template>
    <div class="row q-gutter-sm items-start">
        <q-card class="group-card col-sm-6 col-md-2 shadow-13" v-for="(group, key, index) in groups" :key="index">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" style="height:100%" spinner-color="primary">
                <div class="absolute-bottom">
                    <div class="row no-wrap" style="width: 100%">
                    <div class="col">
                        <div class="text-subtitle2">{{group.name}}</div>
                        <div class="text-blue">0 Titles</div>
                    </div>

                    <div class="col-auto">
                        <q-btn color="white" round flat icon="add">
                        <q-menu fit auto-close anchor="center middle" self="center middle"  transition-show="scale" transition-hide="scale">
                            <q-btn-group flat>
                                <q-btn :icon="fasExternalLinkAlt" text-color="positive" size="sm"></q-btn>
                                <q-btn :icon="fasEdit" text-color="info" size="sm" @click="editGroup(group)"></q-btn>
                                <q-btn :icon="fasTrashAlt" text-color="negative" size="sm" @click="deleteGroup(group.id)"></q-btn>
                            </q-btn-group>
                        </q-menu>
                        </q-btn>
                    </div>
                    </div>
                </div>
            </q-img>
            <EditGroupForm />
        </q-card>
    </div>
</template>

<script>
import { db } from '../../boot/firebase'
import { fasEdit, fasExternalLinkAlt, fasTrashAlt } from '@quasar/extras/fontawesome-v5'
import { mapActions, mapState, mapGetters } from 'vuex'
import EditGroupForm from './EditGroupForm'

export default {
  name: 'GridGroup',
  data () {
    return {
    //   groups: []
    }
  },
  components: {
    EditGroupForm
  },
  computed: {
    ...mapState('groups', ['groups']),
    ...mapGetters('groups', ['countGroups'])
  },
  methods: {
    ...mapActions('groups', ['bindGroups', 'unbindGroups']),
    editGroup (group) {
      this.$q.dialog({
        component: EditGroupForm,
        parent: this,
        editGroup: group
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      })
    },
    deleteGroup (id) {
      this.$q.dialog({
        title: 'Você tem certeza?',
        message: 'Esta ação não poderá ser revertida.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        db.collection('groups').doc(id).delete().then((res) => {
          console.log('Documento deletado:', id)
          console.log(res)
        }).catch((err) => {
          console.error('Erro ao apagar o documento:', err)
        })
      })
    },
    setGroups () {
      db.collection('groups').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.groups.push(doc)
        })
      })
    }
  },
  async mounted () {
    await this.bindGroups()
  },
  created () {
    this.fasEdit = fasEdit
    this.fasExternalLinkAlt = fasExternalLinkAlt
    this.fasTrashAlt = fasTrashAlt
  },
  destroyed () {
    this.unbindGroups()
  }
}
</script>

<style lang="sass">
.group-card
    min-width: 250px!important
    min-height: 110px!important
    // max-height: 133px
</style>
