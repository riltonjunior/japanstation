<template>
  <q-page class="flex items-start justify-start" style="min-height: auto!important" padding>
    <div class="full-width q-mb-md">
      <Title name="Groups"/>
      <q-btn color="primary" @click="addNewGroup" label="Adicionar Novo Grupo" />
    </div>
      <AddNewGroupForm />
      <GridGroup />
  </q-page>
</template>

<script>
import AddNewGroupForm from 'components/groups/AddNewGroupForm'
import GridGroup from 'components/groups/GridGroup'
import Title from 'components/elements/Title'
export default {
  name: 'Auth',
  components: {
    AddNewGroupForm,
    GridGroup,
    Title
  },
  methods: {
    addNewGroup () {
      this.$q.dialog({
        component: AddNewGroupForm,
        parent: this
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      })
    }
  }
}
</script>
