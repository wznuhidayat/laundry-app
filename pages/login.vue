<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useToastStore } from '~/stores/toast';
const toast = useToastStore();

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
    toast.showToast(error, 'error');
  }
};
</script>
<template>
  <div class="grid grid-cols-12 h-screen items-center">
    <div class="col-span-12 hidden md:flex md:col-span-6 items-end bg-primary h-screen p-10">
      <div class="max-h-sm space-y-4">
        <h1 class="text-5xl font-bold  text-white">Laundry APP</h1>
        <p class="text-white text-xl font-semibold">Quick, Easy, and Reliable Laundry Service – Your Fresh Clothes Are Just a Click Away!</p>
      </div>
    </div>
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
          
        </div>
        <button
          class="btn btn-primary btn-block "
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  <ToastAlert />
</template>
  