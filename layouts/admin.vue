<script setup>
definePageMeta({
  middleware: 'auth', // Middleware untuk otentikasi
});
</script>

<template>
  <div class="h-screen bg-base-200 p-6">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Navbar -->
      <!-- Main Content -->
      <div class="col-span-9 space-y-6">
        <Navbar />
        <slot /> <!-- Tempat untuk konten halaman -->
      </div>
      <ToastAlert />
    </div>
  </div>
</template>