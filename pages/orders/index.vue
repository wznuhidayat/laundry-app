<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

import { useServiceStore } from '~/stores/service';
import { discountLabel } from '#build/imports';
import { useDeliverStore } from '#build/imports';
import { useDiscountStore } from '#build/imports';
import { useCartStore } from '#build/imports';
const serviceStore = useServiceStore();
const deliverStore = useDeliverStore();
const discountStore = useDiscountStore();
await useFetch(() => serviceStore.fetchServices());
const services = computed(() => serviceStore.services);

await useFetch(() => deliverStore.fetchDelivers());
const delivers = computed(() => deliverStore.delivers);

await useFetch(() => discountStore.fetchDiscounts());
const discounts = computed(() => discountStore.discounts);
const cartStore = useCartStore();
const cart = reactive([]);

const selectedShipping = ref(null);
// const amountShipping = computed(() => {
//   const selectedDeliver = delivers.value.find(d => d.id == selectedShipping.value);
//   return selectedDeliver ? selectedDeliver.price : 0;
// })

const amountDiscount = 0;
watch(selectedShipping, (newValue) => {
  const selectedDeliver = delivers.value.find(deliver => deliver.id === newValue);
  if (selectedDeliver) {
    cartStore.setTotalShipping(selectedDeliver.price);
    cartStore.setShipping(selectedDeliver);
  }
});

const selectedDiscount = ref(null);
watch(selectedDiscount, (newValue) => {
  const selectedDiscount = discounts.value.find(discount => discount.id === newValue);
  if (selectedDiscount) {
    cartStore.setDiscount(selectedDiscount);
  }
})


// const amountDiscount = computed(() => {
//   const selectedDiscount = discounts.value.find(d => d.id == selectedDiscountId.value);
//   if(!selectedDiscount) return 0;
//   if(selectedDiscount.type == 'amount') return selectedDiscount.value;
//   return totalCart.value * (selectedDiscount.value / 100);
// });
const total = 0;
// const total = computed(() => {
//   return parseFloat(totalCart.value) - parseFloat(amountDiscount.value) - parseFloat(amountShipping.value)
// })
const removeFromCart = (id) => {
  cart.splice(cart.indexOf(id), 1)
}
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
              <CartItem v-for="item in cartStore.cart" :key="item.id" :item="item" />
            </div>
            <div class="flex-none card-actions">
              <div class="w-full">
              <ul class="space-y-2">
                <li class="flex justify-between">
                  <span>Subtotal</span>
                  <span>{{ cartStore.subtotal }}</span>
                </li>
                <li class="grid grid-cols-12">
                  <div class="col-span-8 group transition duration-300 ease-in-out">
                      <div>Shipping</div>
                      <select class="select hidden transition duration-300 ease-in-out select-sm select-bordered w-full max-w-xs group-hover:flex" v-model="selectedShipping">
                          <option disabled selected>Select Shipping</option>
                          <option v-for="deliver in delivers" :key="deliver.id" :value="deliver.id" :data-price="deliver.price">{{ deliver.name }}</option>
                      </select>
                    </div>
                    <div class="col-span-4 flex items-center justify-end">{{ cartStore.totalShipping }}</div>
                </li>
                <li class="grid grid-cols-12">
                  <div class="col-span-8 group transition duration-300 ease-in-out">
                    <div>Discount</div>
                    <select class="hidden select transition duration-300 ease-in-out select-sm select-bordered w-full max-w-xs group-hover:flex" v-model="selectedDiscount">
                        <option disabled selected>Select Discount</option>
                        <option v-for="discount in discounts" :key="discount.id" :value="discount.id" :data-type="discount.type" :data-value="discount.value">{{ discountLabel(discount.type, discount.value) }}</option>
                    </select>
                  </div>
                  <div class="col-span-4 flex items-center justify-end">{{ cartStore.totalDiscount }}</div>
                </li>
                <li class="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{{ cartStore.total }}</span>
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