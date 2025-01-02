<script setup>
definePageMeta({
  middleware: 'auth', // Middleware untuk otentikasi
});
console.log('loaded')
</script>

<template>
  <div class="h-screen bg-base-200 p-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Navbar -->
      <!-- Main Content -->
      <div class="col-span-3 space-y-6">
        <Navbar />
        <slot /> <!-- Tempat untuk konten halaman -->
      </div>
    </div>
  </div>
</template>