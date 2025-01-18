<script setup>
definePageMeta({
  middleware: 'auth', // Middleware untuk otentikasi
});
import { Icon } from '@iconify/vue';
const isDropdownOpen = ref(false);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col bg-base-200">
      <!-- Page content here -->
      <div class="w-full space-y-4">
        <Navbar />
        <div class="p-4">
          <slot />
        </div>
      </div>
      <ToastAlert />
    </div>
    <Sidebar />
  </div>

</template>