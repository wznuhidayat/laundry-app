<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
const data = [
  { date: '2025-10-28', totalOrder: 15 },
  { date: '2025-10-29', totalOrder: 22 },
  { date: '2025-10-30', totalOrder: 18 },
  { date: '2025-10-31', totalOrder: 25 },
  { date: '2025-11-01', totalOrder: 20 },
  { date: '2025-11-02', totalOrder: 27 },
  { date: '2025-11-03', totalOrder: 30 },
]

const categories = {
  totalOrder: {
    name: 'Total Order',
    color: '#3b82f6',
  },
}

const xFormatter = (i: number) => data[i].date

</script>

<template>
  <NuxtLayout name="admin">
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card flex flex-row justify-between bg-white shadow-sm p-6">
        <div class="flex items-center">
          <h3 class="text-4xl font-bold ">1,245</h3>
        </div>
        <div>
          <h3 class="text-xl font-semibold">Order</h3>
          <p class="text-gray-500">Total sales overview</p>
        </div>
        
      </div>
      <div class="card flex flex-row justify-between bg-white shadow-sm p-6">
        <div class="flex items-center">
          <h3 class="text-4xl font-bold ">578</h3>
        </div>
        <div>
          <h3 class="text-xl font-semibold">Order Finished</h3>
          <p class="text-gray-500">Total users overview</p>
        </div>
      </div>
      <div class="card flex flex-row justify-between bg-white shadow-sm p-6">
        <div class="flex items-center">
          <h3 class="text-4xl font-bold ">246</h3>
        </div>
        <div>
          <h3 class="text-xl font-semibold">Send Delivery</h3>
          <p class="text-gray-500">Total orders overview</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card bg-white shadow-sm p-6 mt-6">
       <LineChart
          :data="data"
          :categories="categories"
          :height="300"
          xLabel="Date"
          yLabel="Total Order"
        />
    </div>
    </div>
  </NuxtLayout>
</template>