<template>
  <q-page
    class="flex items-start justify-start"
    style="min-height: auto!important"
    padding
  >

    <div class="full-width q-mb-md">
      <Title name="Titles" />
      <q-btn
        color="primary"
        @click="addNewTitle"
        label="Adicionar Novo Título"
      />
    </div>

    <AddNewTitleForm></AddNewTitleForm>

    <GridTitles></GridTitles>
  </q-page>
</template>

<script>
import GridTitles from 'components/titles/GridTitles'
import Title from 'components/elements/Title'
import AddNewTitleForm from 'components/titles/AddNewTitleForm'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageTitles',
  components: {
    Title,
    GridTitles,
    AddNewTitleForm
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('titles', ['titles', 'currentTitle', 'step']),
    ...mapGetters('titles', ['currentStep']),
    ...mapState('auth', ['isLoggedIn', 'user'])
  },
  methods: {
    ...mapActions('titles', ['setCurrentTitle', 'changeStep']),
    addNewTitle () {
      this.$q.dialog({
        component: AddNewTitleForm,
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

<style>

</style>
