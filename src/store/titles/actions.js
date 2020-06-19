import { api } from 'boot/axios'
import { firestoreAction } from 'vuexfire'
import { db } from 'boot/firebase'

const setTitles = ({ commit }) => {
  return new Promise((resolve, reject) => {
    api.get('/titles')
      .then(response => {
        commit('SET_TITLES', response.data)
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const setTitle = ({ commit, id }) => {
  return new Promise((resolve, reject) => {
    api.get(`/titles/${id}`)
      .then(response => {
        commit('SET_CURRENT_RELEASE', response.data)
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const addTitles = ({ commit }, title) => {
  commit('ADD_TITLE', title)
}

const setCurrentTitle = ({ commit }, title) => {
  commit('SET_CURRENT_TITLE', title)
}

const changeStep = ({ commit }, step) => {
  commit('SET_STEP', step)
}

const bindTitles = firestoreAction(({ bindFirestoreRef }) => {
  return bindFirestoreRef('titles', db.collection('titles'))
})
const unbindTitles = firestoreAction(context => {
  return context.unbindFirestoreRef('titles', db.collection('titles'))
})

export {
  setTitles,
  setTitle,
  addTitles,
  setCurrentTitle,
  changeStep,
  bindTitles,
  unbindTitles
}
