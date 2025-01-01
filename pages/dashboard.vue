<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <NuxtLayout name="admin">
    <div class="card bg-white shadow-sm p-6">
      <h3 class="text-2xl font-semibold">Overview</h3>
      <p class="text-gray-500">This is an overview section of the dashboard.</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card bg-white shadow-sm p-6">
        <h3 class="text-xl font-semibold">Order</h3>
        <p class="text-gray-500">Total sales overview</p>
      </div>
      <div class="card bg-white shadow-sm p-6">
        <h3 class="text-xl font-semibold">Order Finished</h3>
        <p class="text-gray-500">Total users overview</p>
      </div>
      <div class="card bg-white shadow-sm p-6">
        <h3 class="text-xl font-semibold">Send Delivery</h3>
        <p class="text-gray-500">Total orders overview</p>
      </div>
    </div>
  </NuxtLayout>
</template>