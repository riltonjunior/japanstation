<template>
  <div class="q-pa-md col-12 col-md-6">
    <q-card>
      <q-tabs
        v-model="tab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" :label="$t('login')" />
        <q-tab name="register" :label="$t('register')" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              type="email"
              v-model="userForm.email"
              :label="$t('yourEmail')"
              :rules="[
                val =>
                  isValidEmailAddress(val) || 'Favor inserir um email válido.'
              ]"
              ref="email"
              lazy-rules
            />

            <q-input
              filled
              type="password"
              v-model="userForm.password"
              :label="$t('yourPassword')"
              :rules="[
                val => val.length >= 6 || 'Favor inserir ao menos 6 caracteres.'
              ]"
              ref="password"
              lazy-rules
            />
            <div>
              <q-btn :label="$t('submit')" type="submit" color="primary" />
              <!-- <q-btn @click.prevent="loginWithGoogle" color="secundary" style="margin-left:5px" class="text-grey-8" icon="edit" :label="$t('signInWithGoogle')" /> -->
            </div>
          </q-form>
        </q-tab-panel>
        <q-tab-panel name="register">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              type="email"
              v-model="userForm.email"
              :label="$t('yourEmail')"
              :rules="[
                val =>
                  isValidEmailAddress(val) || 'Favor inserir um email válido.'
              ]"
              ref="email"
              lazy-rules
            />

            <q-input
              filled
              type="password"
              v-model="userForm.password"
              :label="$t('yourPassword')"
              :rules="[
                val => val.length >= 6 || 'Favor inserir ao menos 6 caracteres.'
              ]"
              ref="password"
              lazy-rules
            />

            <q-toggle v-model="userForm.accept" :label="$t('acceptTerms')" />

            <div>
              <q-btn :label="$t('submit')" type="submit" color="primary" />
            </div>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginRegister',
  // props: ['tab'],
  data () {
    return {
      userForm: {
        email: '',
        password: '',
        accept: false
      },
      tab: 'login'
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser', 'loginWithGoogle']),
    isValidEmailAddress (email) {
      // eslint-disable-next-line no-useless-escape
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(String(email).toLowerCase())
    },
    onSubmit () {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab === 'login') {
          this.loginUser(this.userForm)
        } else {
          if (this.userForm.accept) {
            this.registerUser(this.userForm)
            // console.log(this.userForm)
          } else {
            console.log('Favor aceitar os termos de uso.')
          }
        }
      }
    },
    onReset () {
      this.email = ''
      this.password = ''
    }
    // onSubmitRegister() {
    //   if (this.accept) {
    //     console.log(this.email)
    //     console.log(this.password)
    //   } else {
    //     console.log('Aceite os termos de uso.')
    //   }
    // },
    // onResetRegister() {
    //   this.email = '',
    //   this.password = '',
    //   this.accept = ''
    // }
  }
}
</script>
