<script setup>
import { Icon } from '@iconify/vue';
const isDropdownOpen = ref(false);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
</script>

<template>
  <div class="col-span-1 bg-primary p-4 card shadow-lg">
    <div class="sidebar-head py-4 px-4">
      <h2 class="text-2xl font-bold text-left text-slate-100">Laundry App</h2>
    </div>
    <ul class="mt-6 ">
      <li>
        <nuxt-link to="/dashboard" class="hover:bg-secondary card p-4 text-slate-100 font-bold flex-row"
          :class="{ 'bg-secondary': $route.path === '/dashboard' }">
          <Icon icon="material-symbols:dashboard" class="mr-2 h-5 w-5" /> Dashboard
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/orders" class="hover:bg-secondary card p-4 text-slate-100 font-bold flex-row"
          :class="{ 'bg-secondary': $route.path === '/orders' }">
          <Icon icon="material-symbols:inactive-order" class="mr-2 h-5 w-5" /> Orders
        </nuxt-link>
      </li>
      <li class="">
        <nuxt-link to="/order-history" class="hover:bg-secondary card p-4 text-slate-100 font-bold flex-row"
          :class="{ 'bg-secondary': $route.path === '/order-history' }">
          <Icon icon="material-symbols:order-approve" class="mr-2 h-5 w-5" />
          Order History
        </nuxt-link>
      </li>
      <li>
        <div class="hover:bg-secondary card p-4 text-slate-100 font-bold flex-row cursor-pointer"
          :class="{ 'bg-secondary': $route.path.startsWith('/master') }" @click="toggleDropdown">
          <Icon icon="ic:baseline-menu-book" class="mr-2 h-5 w-5" />
          Master
        </div>
        <!-- Submenu Master -->
        <!-- open sub menu if master url -->
        <ul v-if="$route.path.startsWith('/master') ? !isDropdownOpen : isDropdownOpen" class="ml-6">
          <li class="card p-4 text-slate-300">
            <nuxt-link to="/master/services" class=" hover:text-slate-100 font-bold flex items-center"
              :class="{ 'text-slate-100': $route.path === '/master/services' }">
              <Icon icon="ic:baseline-wash" class="mr-2 h-5 w-5" />
              Services
            </nuxt-link>
          </li>
          <li class="card p-4 text-slate-300">
            <nuxt-link to="/master/discounts" class=" hover:text-slate-100 font-bold flex items-center"
              :class="{ 'text-slate-100': $route.path === '/master/discounts' }">
              <Icon icon="ic:baseline-discount" class="mr-2 h-5 w-5" />
              Discounts
            </nuxt-link>
          </li>
          <li class="card p-4 text-slate-300">
            <nuxt-link to="/master/deliveries" class=" hover:text-slate-100 font-bold flex items-center"
              :class="{ 'text-slate-100': $route.path === '/master/deliveries' }">
              <Icon icon="ic:baseline-delivery-dining" class="mr-2 h-5 w-5" />
              Deliveries
            </nuxt-link>
          </li>
          <li class="card p-4 text-slate-300">
            <nuxt-link to="/master/parfumes" class=" hover:text-slate-100 font-bold flex items-center"
              :class="{ 'text-slate-100': $route.path === '/master/parfumes' }">
              <Icon icon="ic:baseline-wine-bar" class="mr-2 h-5 w-5" />
              Parfumes
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li>
        <nuxt-link to="/customers"
          class="hover:bg-secondary card p-4 text-slate-100 font-bold flex items-center flex-row"
          :class="{ 'bg-secondary': $route.path === '/customers' }">
          <Icon icon="ic:baseline-supervisor-account" class="mr-2 h-5 w-5" />
          Customers
        </nuxt-link>
      </li>

    </ul>
  </div>
</template>