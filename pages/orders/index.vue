<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

import { useServiceStore } from '~/stores/service';
import { discountLabel } from '#build/imports';
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

const cart = reactive([]);

const handleAddToCart = (item, qtyCart) => {
  const index = cart.findIndex(i => i.id === item.id)
  if (index !== -1) {
      cart[index].qty += qtyCart
  } else {
      cart.push({ ...item, qty: qtyCart })
  }
}

const increaseQty = (id) => {
  const item = cart.find((i) => i.id === id);
  if (item) item.qty++;
};

const decreaseQty = (id) => {
  const item = cart.find((i) => i.id === id);
  if (item && item.qty > 1) item.qty--;
};

const totalCart = computed(() => {
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
})
const selectedShipping = ref(null);
const amountShipping = computed(() => {
  const selectedDeliver = delivers.value.find(d => d.id == selectedShipping.value);
  return selectedDeliver ? selectedDeliver.price : 0;
})

const selectedDiscountId = ref(null);
const amountDiscount = computed(() => {
  const selectedDiscount = discounts.value.find(d => d.id == selectedDiscountId.value);
  if(!selectedDiscount) return 0;
  if(selectedDiscount.type == 'amount') return selectedDiscount.value;
  return totalCart.value * (selectedDiscount.value / 100);
});

const total = computed(() => {
  return parseFloat(totalCart.value) - parseFloat(amountDiscount.value) - parseFloat(amountShipping.value)
})
const removeFromCart = (id) => {
  cart.splice(cart.indexOf(id), 1)
}
</script>

<template>
  <NuxtLayout name="admin">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-9 grid grid-cols-3 gap-4">
        <CardProduct v-for="service in services" :key="service.id" :service="service"  @addToCart="handleAddToCart"  />
      </div>
      <div class="col-span-3">
        <div class="card bg-base-100 h-[calc(100vh-8rem)]">
          <div class="card-body flex justify-between h-full">
            <div class="flex-none">
              <h1 class="card-title">Cart</h1>
            </div>
            <div class="grow space-y-3 overflow-y-auto">
              <CartItem v-for="item in cart" :key="item.id" :item="item"  @removeFromCart="removeFromCart"  @increase="increaseQty"
              @decrease="decreaseQty"/>
            </div>
            <div class="flex-none card-actions">
              <div class="w-full">
              <ul class="space-y-2">
                <li class="flex justify-between">
                  <span>Subtotal</span>
                  <span>{{ totalCart }}</span>
                </li>
                <li class="grid grid-cols-12">
                  <div class="col-span-8 group transition duration-300 ease-in-out">
                      <div>Shipping</div>
                      <select class="select hidden transition duration-300 ease-in-out select-sm select-bordered w-full max-w-xs group-hover:flex" v-model="selectedShipping">
                          <option disabled selected>Select Shipping</option>
                          <option v-for="deliver in delivers" :key="deliver.id" :value="deliver.id" :data-price="deliver.price">{{ deliver.name }}</option>
                      </select>
                    </div>
                    <div class="col-span-4 flex items-center justify-end">{{ amountShipping }}</div>
                </li>
                <li class="grid grid-cols-12">
                  <div class="col-span-8 group transition duration-300 ease-in-out">
                    <div>Discount</div>
                    <select class="hidden select transition duration-300 ease-in-out select-sm select-bordered w-full max-w-xs group-hover:flex" v-model="selectedDiscountId">
                        <option disabled selected>Select Discount</option>
                        <option v-for="discount in discounts" :key="discount.id" :value="discount.id" :data-type="discount.type" :data-value="discount.value">{{ discountLabel(discount.type, discount.value) }}</option>
                    </select>
                  </div>
                  <div class="col-span-4 flex items-center justify-end">{{ amountDiscount }}</div>
                </li>
                <li class="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{{ total }}</span>
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