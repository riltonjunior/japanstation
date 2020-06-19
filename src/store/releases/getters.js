// export function postErrors (state) {
// }

const releaseErrors = state => state.releaseErrors
const releases = state => state.releases
const pagination = state => state.pagination
const currentRelease = state => state.currentRelease

export {
  releaseErrors,
  releases,
  pagination,
  currentRelease
}
