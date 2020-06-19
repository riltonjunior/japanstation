<template>
  <q-dialog ref="dialog" @hide="onDialogHide" toolbar style="width: 500px">
    <q-card class="q-dialog-plugin" style="width: 700px; max-width: 80vw;">
      <q-toolbar>
        <q-toolbar-title>Adicionar novo título</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <div v-if="step == 1">
        <q-card-section class="q-pt-none">
          <SelectAnime />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="changeStep(2)" color="primary" label="Continue" />
        </q-card-actions>
      </div>

      <div v-if="step == 2">
        <q-card-section class="q-pt-none">
          <EditTitleForm :editTitle="currentTitle" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="changeStep(3)" color="primary" label="Continue" />
          <q-btn
            flat
            @click="changeStep(1)"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-card-actions>
      </div>

      <div v-if="step == 3">
        <q-card-section class="q-pt-none">
          Fim.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="primary" label="Finish" />
        </q-card-actions>

        <div></div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import SelectAnime from 'components/titles/SelectAnime'
import EditTitleForm from 'components/titles/EditTitleForm'

import { showErrorMessage } from '../../functions/function-show-error-message'
import { showNotify } from '../../functions/function-show-notify'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddNewTitleForm',
  components: {
    SelectAnime,
    EditTitleForm
  },
  computed: {
    ...mapState('titles', ['titles', 'currentTitle', 'step']),
    ...mapGetters('titles', ['currentStep']),
    ...mapState('auth', ['isLoggedIn', 'user'])
  },
  methods: {
    ...mapActions('titles', ['setCurrentTitle', 'changeStep']),

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
          // this.AddNewGroup()
          showNotify('info', 'Grupo adicionado com sucesso.')
          this.$emit('ok')
          this.hide()
        } else {
          console.log(this.group.name.length)
          showErrorMessage(
            'Você deve aceitar os termos de uso para continuar.'
          )
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

<style></style>
