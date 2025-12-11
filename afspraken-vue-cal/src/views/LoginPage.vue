<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../services/authService';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    await login(username.value, password.value);
    router.push('/agenda');
  } catch (err) {
    errorMessage.value = 'Login mislukt. Controleer je gegevens.';
    console.error(err);
  }
};
</script>

<style>
.login-page { max-width: 400px; margin: auto; padding: 2rem; }
.error { color: red; }
</style>
