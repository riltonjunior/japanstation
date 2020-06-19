<template>
  <q-page class="flex row justify-center items-center">
      <LoginRegister tab='login'></LoginRegister>
  </q-page>
</template>

<script>
import LoginRegister from 'components/auth/LoginRegister'
export default {
  name: 'Auth',
  components: {
    LoginRegister
  }
}
</script>
