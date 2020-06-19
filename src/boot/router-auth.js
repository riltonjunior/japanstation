import { LocalStorage } from 'quasar'
export default async ({ router }) => {
  router.beforeEach((to, from, next) => {
    const isLoggedIn = LocalStorage.getItem('isLoggedIn')
    if (!isLoggedIn && to.path !== '/auth') {
      console.log('Nav Guard: On.')
      next('/auth')
    } else {
      next()
    }
  })
}
