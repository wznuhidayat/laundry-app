<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

import { useServiceStore } from '~/stores/service';
import { useDeliverStore } from '#build/imports';
import { useDiscountStore } from '#build/imports';
const serviceStore = useServiceStore();
const deliverStore = useDeliverStore();
const discountStore = useDiscountStore();
await useFetch(() => serviceStore.fetchServices());
const services = computed(() => serviceStore.services);

await useFetch(() => deliverStore.fetchDelivers());
const delivers = computed(() => deliverStore.delivers);

await useFetch(() => discountStore.fetchDiscounts());
const discounts = computed(() => discountStore.discounts);
</script>

<template>
  <NuxtLayout name="admin">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-9 grid grid-cols-3 gap-4">
        <CardProduct v-for="service in services" :key="service.id" :service="service" />
      </div>
      <div class="col-span-3">
        <div class="card bg-base-100 h-[calc(100vh-8rem)]">
          <div class="card-body flex justify-between h-full">
            <div class="flex-none">
              <h1 class="card-title">Cart</h1>
            </div>
            <div class="grow space-y-3 overflow-y-auto">
              <CartItem />
              <CartItem />
              <CartItem />
              <CartItem />
            </div>
            <div class="flex-none card-actions">
              <div class="w-full">
              <ul class="space-y-2">
                <li class="flex justify-between">
                  <span>Subtotal</span>
                  <span>$200</span>
                </li>
                <li class="grid grid-cols-12">
                  <div class="col-span-8 group transition duration-300 ease-in-out">
                      <div>Shipping</div>
                      <select class="select hidden transition duration-300 ease-in-out select-sm select-bordered w-full max-w-xs group-hover:flex">
                          <option disabled selected>Select Shipping</option>
                          <option v-for="deliver in delivers" :key="deliver.id" :value="deliver.id">{{ deliver.name }}</option>
                      </select>
                    </div>
                    <div class="col-span-4 flex items-center justify-end">$200</div>
                </li>
                <li class="grid grid-cols-12">
                  <div class="col-span-8 group transition duration-300 ease-in-out">
                    <div>Discount</div>
                    <select class="hidden select transition duration-300 ease-in-out select-sm select-bordered w-full max-w-xs group-hover:flex">
                        <option disabled selected>Select Discount</option>
                        <option v-for="discount in discounts" :key="discount.id" :value="discount.id">{{ discount.value }}</option>
                    </select>
                  </div>
                  <div class="col-span-4 flex items-center justify-end">$200</div>
                </li>
                <li class="flex justify-between font-bold">
                  <span>Total</span>
                  <span>$200</span>
                </li>
              </ul>
            </div>
              <button class="btn btn-primary btn-block font-bold">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>