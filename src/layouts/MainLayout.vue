<template>
  <q-layout class="bg-grey-3">
    <q-header class="text-dark" style="background: #FFFFFF;" reveal elevated>
      <q-toolbar style="height: 82px">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        />

        <q-toolbar-title>
          Japanstation
        </q-toolbar-title>

        <div v-if="isLoggedIn">Olá, {{ user.email }} - <a @click="logoutUser" class="cursor-pointer">{{ $t('logout') }}</a></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="menuOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        </q-item-label>
        <SideLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container style="max-width:1160px; margin: auto;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import SideLink from 'components/SideLink'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MainLayout',

  components: {
    SideLink
  },

  data () {
    return {
      menuOpen: false,
      essentialLinks: [
        {
          title: 'Home',
          caption: 'Dashboard',
          icon: 'home',
          link: '/dash'
        },
        {
          title: 'Releases',
          caption: 'Search, add and edit releases',
          icon: 'tv',
          link: '/releases'
        },
        {
          title: 'Titles',
          caption: 'Search, add and edit titles',
          icon: 'movie',
          link: '/titles'
        },
        {
          title: 'Groups',
          caption: 'Search, add and edit groups',
          icon: 'group',
          link: '/groups'
        },
        {
          title: 'Profile',
          caption: 'Search, add and edit groups',
          icon: 'account_circle',
          link: '/profile'
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['isLoggedIn']),
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser'])
  }
}
</script>
