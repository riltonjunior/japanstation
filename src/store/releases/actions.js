import {
  api
} from 'boot/axios'

const setReleases = ({
  commit
}) => {
  return new Promise((resolve, reject) => {
    api.get('/releases')
      .then(response => {
        commit('SET_RELEASES', response.data)
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const setRelease = ({
  commit
}, id) => {
  return new Promise((resolve, reject) => {
    api.get(`/releases/${id}`)
      .then(response => {
        commit('SET_CURRENT_RELEASE', response.data)
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const addRelease = ({
  commit
}, release) => {
  return new Promise((resolve, reject) => {
    api.post('/releases', release)
      .then(response => {
        console.log(response.data)
        commit('ADD_RELEASE', release)
        resolve(response.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export {
  setReleases,
  setRelease,
  addRelease
}
