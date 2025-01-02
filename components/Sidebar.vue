<script setup>
import { Icon } from '@iconify/vue';

</script>

<template>
  <div class="col-span-1 bg-primary p-4 card shadow-lg">
    <div class="sidebar-head py-4 px-4">
      <h2 class="text-2xl font-bold text-left text-slate-100">Laundry App</h2>
    </div>
    <ul class="mt-6 ">
      <li class="hover:bg-secondary card p-4">
        <nuxt-link to="/dashboard" class="text-slate-100 font-bold flex items-center">
          <Icon icon="material-symbols:dashboard" class="mr-2 h-5 w-5" /> Dashboard
        </nuxt-link>
      </li>
      <li class="hover:bg-secondary card p-4">
        <nuxt-link to="/orders" class="text-slate-100 font-bold flex items-center">
          <Icon icon="material-symbols:inactive-order" class="mr-2 h-5 w-5" /> Orders
        </nuxt-link> 
      </li>
      <li class="hover:bg-secondary card p-4">
        <nuxt-link to="/order-history" class="text-slate-100 font-bold flex items-center">
        <Icon icon="material-symbols:order-approve" class="mr-2 h-5 w-5" /> 
        Order History</nuxt-link>
       </li>
       <li class="hover:bg-secondary card p-4">
        <nuxt-link to="/dashboard" class="text-slate-100 font-bold flex items-center">
          <Icon icon="ic:baseline-menu-book" class="mr-2 h-5 w-5" />
          Master
        </nuxt-link>
        <!-- Submenu Master -->
        <ul class="ml-6 mt-2">
          <li class="hover:bg-secondary card p-4">
            <nuxt-link to="/products" class="text-slate-100 font-bold flex items-center">
              <Icon icon="ic:baseline-production-quantity-limits" class="mr-2 h-5 w-5" />
              Products
            </nuxt-link>
          </li>
          <li class="hover:bg-secondary card p-4">
            <nuxt-link to="/services" class="text-slate-100 font-bold flex items-center">
              <Icon icon="ic:baseline-design-services" class="mr-2 h-5 w-5" />
              Services
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li class="hover:bg-secondary card p-4">
        <nuxt-link to="/customers"
          class="text-slate-100 font-bold flex items-center">
          <Icon icon="ic:baseline-supervisor-account" class="mr-2 h-5 w-5" />
          Customers
        </nuxt-link> 
      </li>
      
    </ul>
  </div>
</template>