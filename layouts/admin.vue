<script setup>
definePageMeta({
  middleware: 'auth', // Middleware untuk otentikasi
});
const isSidebarOpen = ref(true);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <div class="drawer md:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col bg-base-200">
      <!-- Page content here -->
      <div class="w-full space-y-4">
        <Navbar @toggle-sidebar="toggleSidebar" :is-open="isSidebarOpen" />
        <div class="p-4">
          <slot />
        </div>
      </div>
      
      <ToastAlert />
    
    </div>
    <Sidebar :is-open="isSidebarOpen" />
  </div>

</template>