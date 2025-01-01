<script setup>
import { useAuthStore } from '~~/stores/auth';
const authStore = useAuthStore();
const logout = async () => {
    await authStore.logout();
    navigateTo('/login');
}
</script>

<template>
    <div class="col-span-1 bg-primary p-4 card shadow-lg">
          <h2 class="text-2xl font-extrabold text-center text-slate-100">Laundry App</h2>
          <ul class="mt-6 ">
            <li class="hover:bg-secondary card py-2 px-4"><nuxt-link to="/dashboard" class="text-slate-100 font-semibold ">Dashboard</nuxt-link></li>
            <li class="hover:bg-secondary card py-2 px-4"><nuxt-link to="/orders" class="text-slate-100 font-semibold ">Orders</nuxt-link> </li>
            <li class="hover:bg-secondary card py-2 px-4"><nuxt-link to="/order-history" class="text-slate-100 font-semibold ">Order History</nuxt-link> </li>
            <li class="hover:bg-secondary card py-2 px-4"><nuxt-link to="/dashboard" class="text-slate-100 font-semibold ">Master</nuxt-link> </li>
            <li class="hover:bg-secondary card py-2 px-4"><nuxt-link to="/customers" class="text-slate-100 font-semibold ">Customers</nuxt-link> </li>
            <li class="hover:bg-secondary card py-2 px-4"><a href="#" class="text-slate-100 font-semibold " @click="logout">Logout</a></li>
          </ul>
        </div>
</template>