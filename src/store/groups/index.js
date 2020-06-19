import { firestoreAction } from 'vuexfire'
import { db } from 'boot/firebase'

const state = {
  groups: []
}

const mutations = {

}

const getters = {
  groupsById (state) {
    return state.groups.reduce((byId, group) => {
      byId[group.id] = group
      return byId
    }, {})
  },
  countGroups: state => state.groups.length
}

const actions = {
  bindGroups: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef('groups', db.collection('groups'))
  }),
  unbindGroups: firestoreAction(context => {
    return context.unbindFirestoreRef('groups', db.collection('groups'))
  })
}

export default {
  namespaced: true,
  mutations,
  state,
  actions,
  getters
}
