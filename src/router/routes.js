
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/auth', component: () => import('pages/Auth.vue') },
      { path: '/dash', component: () => import('pages/Dashboard.vue') },
      { path: '/releases', component: () => import('pages/Releases.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') },
      { path: '/titles', component: () => import('pages/Titles.vue') },
      { path: '/groups', component: () => import('pages/Groups.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
