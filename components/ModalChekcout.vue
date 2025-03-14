<script setup>
import { useCartStore } from '#build/imports';
import { Icon } from '@iconify/vue';
import  { useCustomerStore } from '#build/imports';
import { useDebounceFn } from '@vueuse/core'
const customerStore = useCustomerStore();
const searchQuery = ref('');
const debouncedSearch = useDebounceFn((query) => {
  if(!query) return
  customerStore.searchCustomers(query);
}, 500)

watch(searchQuery, (query) => {
  debouncedSearch(query)
})
const clearSearch = () => {
  searchQuery.value = ''
  customerStore.searchResults = []
}
const selectCustomer = (customer) => {
  searchQuery.value = ''
  customerStore.searchResults = []
  cartStore.setCustomer(customer)
}

const cartStore = useCartStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['cancel']);

</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 z-10 overflow-y-auto bg-slate-900 bg-opacity-50" aria-labelledby="modal-title"
    role="dialog" aria-modal="true">
    <div class="card flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="relative inline-block py-24 space-y-2 px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-base-200 rounded-lg shadow-xl rtl:text-right  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div class="flex items-center justify-center">
          </div>
          <div class="space-y-4">
            <div class="relative flex flex-col items-center gap-2 bg-base-200 rounded-lg w-full ">
              <input type="text" placeholder="Search Customer..." v-model="searchQuery" autocomplete="off"
                class="input input-bordered w-full pr-10" />
              <button v-if="customerStore.searchResults.length === 0" class="absolute right-4 top-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-1.15 1.15L21 21z" />
                </svg>
              </button>
              <button v-else class="absolute right-4 top-3" @click="clearSearch()">
                <Icon icon="ic:outline-cancel" class="h-5 w-5" />
              </button>
              <ul v-if="customerStore.searchResults.length > 0" class="menu dropdown-content bg-base-100 rounded-lg w-full z-1 p-2 shadow-sm">
                <li v-for="customer in customerStore.searchResults" :key="customer.id" @click="selectCustomer(customer)">
                  <div class="flex gap-4 px-2">
                    <div class="avatar">
                      <div class="w-10 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div class="flex flex-col ">
                      <span class="font-bold text-sm">{{ customer.name }}</span>
                      <span class="text-xs">{{ customer.phone }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <ul class="list space-y-2">
              <li class="list-row flex justify-between font-semibold text-gray-600">
                <span>Customer</span>
                <span>{{ cartStore.customer ? cartStore.customer.name : 'Guest' }}</span>
              </li>
              <li class="list-row flex justify-between font-semibold text-gray-600">
                <span>Subtotal</span>
                <span>{{ currency(cartStore.subtotal) }}</span>
              </li>
              <li class="list-row flex justify-between font-semibold text-gray-600">
                <span>Shipping</span>
                <span>{{ currency(cartStore.totalShipping) }}</span>
              </li>
              <li class="list-row flex justify-between font-semibold text-gray-600">
                <span>Discount</span>
                <span>{{ currency(cartStore.totalDiscount) }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-5 grid grid-cols-2 gap-4 card-actions">
          <div class="w-full">
            <button class="w-full btn btn-primary">Checkout</button>
          </div>
          <div class="w-full">
            <button class="w-full btn btn-outline" @click="$emit('cancel')">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>