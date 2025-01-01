<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  try {
    error.value = '';
    await authStore.login({ email: email.value, password: password.value });
    navigateTo('/dashboard'); // Redirect setelah login
  } catch (err) {
    error.value = err.body || 'Invalid credentials';
  }
};
</script>
<template>
  <div class="grid grid-cols-12 h-screen items-center px-6">
    <div class="col-span-12 md:col-span-6">
      <div class="max-w-sm mx-auto">
        <h2 class="text-4xl font-bold">Login</h2>
        <p class="text-gray-400">Welcome back! Log in to continue.</p>
      </div>
      
      <form class="mt-6 max-w-sm mx-auto space-y-4" @submit.prevent="handleLogin">
        <div class="">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input 
            v-model="email"
            class="input input-bordered w-full "
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            v-model="password"
            class="input input-bordered w-full " 
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <div role="alert" class="alert bg-red-400 p-2  flex" v-if="error">
            <svg @click="error = ''"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ error }}</span>
          </div>
        </div>
        <button
          class="btn btn-primary btn-block "
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
    <div class="hidden md:flex col-span-6 items-center bg-primary h-screen px-6">
      <div class="max-w-sm">
        <h1 class="text-4xl font-bold  text-white">Laundry APP</h1>
        <p class="text-white font-semibold">Quick, Easy, and Reliable Laundry Service – Your Fresh Clothes Are Just a Click Away!</p>
      </div>
    </div>
  </div>
</template>
  