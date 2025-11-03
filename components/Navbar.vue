<script setup>
import { Icon } from '@iconify/vue';
import { useAuthStore } from '~~/stores/auth';
const authStore = useAuthStore();
const logout = async () => {
  await authStore.logout();
  navigateTo('/login');
}
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});
</script>
<template>
    <div class="navbar bg-base-100 rounded-lg">
        <div class="navbar-start">
            <button @click="$emit('toggleSidebar')" class="btn btn-square btn-ghost">
                <Icon v-if="isOpen" icon="ic:baseline-menu-open" class="h-6 w-6" /> <Icon v-else icon="ic:baseline-menu" class="h-6 w-6" />
            </button>
        </div>
        <div class="navbar-center">
        </div>
        <div class="navbar-end space-x-2">
            <button class="btn btn-ghost btn-circle">
                <div class="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span class="badge badge-xs badge-primary indicator-item"></span>
                </div>
            </button>
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <a class="justify-between p-4">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a class=" p-4">Settings</a></li>
                    <li><a class=" p-4" href="javascript:void(0)" @click="logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>