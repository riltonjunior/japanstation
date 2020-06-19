import { Notify, Loading } from 'quasar'

export function showNotify (errorType, errorMessage) {
  Loading.hide()
  Notify.create({ type: errorType, message: errorMessage })
}
