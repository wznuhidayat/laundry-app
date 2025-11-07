<script setup lang="ts">
import { computed } from 'vue';
import { useOrderStore } from '#build/imports';

definePageMeta({
  layout: 'admin'
})
const orderStore = useOrderStore();
await useFetch(async () => {
  await Promise.all([
    orderStore.fetchSummary(),
    orderStore.fetchLastWeekSummary(),
  ]);
});
const summary = computed(() => orderStore.summary);
const chartData = computed(() => (
  orderStore.lastWeekTotals.length
    ? orderStore.lastWeekTotals.map((item) => ({
        date: item.date,
        totalOrder: item.totalOrders ?? 0,
      }))
    : []
));

const categories = {
  totalOrder: {
    name: 'Total Order',
    color: '#3b82f6',
  },
}
const xFormatter = (index: number) => chartData.value[index]?.date ?? '';
const yFormatter = (value: number) => (
  Number.isInteger(value) ? `${value}` : ''
);

</script>

<template>
  <NuxtLayout name="admin">
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card flex flex-row justify-between bg-white shadow-sm p-6">
        <div class="flex items-center">
          <h3 class="text-4xl font-bold ">{{ summary.totalOrders }}</h3>
        </div>
        <div>
          <h3 class="text-xl font-semibold">Order</h3>
          <p class="text-gray-500">Total sales overview</p>
        </div>
        
      </div>
      <div class="card flex flex-row justify-between bg-white shadow-sm p-6">
        <div class="flex items-center">
          <h3 class="text-4xl font-bold ">{{ summary.totalOrdersCompleted }}</h3>
        </div>
        <div>
          <h3 class="text-xl font-semibold">Order Finished</h3>
          <p class="text-gray-500">Total users overview</p>
        </div>
      </div>
      <div class="card flex flex-row justify-between bg-white shadow-sm p-6">
        <div class="flex items-center">
          <h3 class="text-4xl font-bold ">{{ summary.totalDeliveries }}</h3>
        </div>
        <div>
          <h3 class="text-xl font-semibold">Send Delivery</h3>
          <p class="text-gray-500">Total orders overview</p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-1 gap-6">
      <div class="card bg-white shadow-sm p-6 mt-6">
       <LineChart
          :data="chartData"
          :categories="categories"
          :xFormatter="xFormatter"
          :yFormatter="yFormatter"
          :height="300"
          xLabel="Date"
          yLabel="Orders"
        />
    </div>
    </div>
  </NuxtLayout>
</template>
