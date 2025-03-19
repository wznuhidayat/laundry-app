<script setup>
import { Icon } from '@iconify/vue';
const isDropdownOpen = ref(false);
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
</script>

<template>
  <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>

      <ul class="menu bg-slate-600 text-base-content min-h-full w-80 ">
        <div class=" px-3 py-3 ">
          <h2 class="text-2xl font-bold text-left text-slate-100">Laundry App</h2>
        </div>
        <!-- Sidebar content here -->
        <li>
          <nuxt-link to="/dashboard" class="text-slate-100 card p-4 font-bold flex-row"
            :class="{ 'active': $route.path === '/dashboard' }">
            <Icon icon="material-symbols:dashboard" class="mr-2 h-5 w-5" /> Dashboard
          </nuxt-link>
        </li>
        <li><nuxt-link to="/orders" class="text-slate-100 card p-4 font-bold flex-row"
            :class="{ 'active': $route.path === '/orders' }">
            <Icon icon="ic:round-shopping-basket" class="mr-2 h-5 w-5" /> Orders
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/order-history" class="card p-4 text-slate-100 font-bold flex-row"
            :class="{ 'active': $route.path === '/order-history' }">
            <Icon icon="material-symbols:order-approve" class="mr-2 h-5 w-5" />
            Order History
          </nuxt-link>
        </li>
        <!-- <div class="py-4"><label class="px-3 text-xs text-slate-300 uppercase dark:text-gray-400">master</label></div> -->
        <li>
          <div class="card p-4 text-slate-100 font-bold flex flex-row justify-between cursor-pointer"
            @click="toggleDropdown">
            <div class="flex space-x-2">
              <Icon icon="ic:baseline-menu-book" class="mr-4 h-5 w-5" />
              Master
            </div>
            <Icon :icon="isDropdownOpen ? 'ic:baseline-keyboard-arrow-up' : 'ic:baseline-keyboard-arrow-down'" class="h-5 w-5" />
          </div>
          <!-- Submenu Master -->
          <!-- open sub menu if master url -->
          <ul v-if="$route.path.startsWith('/master') ? !isDropdownOpen : isDropdownOpen" class="menu ml-6">
            <li >
              <nuxt-link to="/master/services" class="card p-4 text-slate-100 font-bold"
                :class="{ 'active ': $route.path.startsWith('/master/services') }">
                Services
              </nuxt-link>
            </li>
            <li >
              <nuxt-link to="/master/durations" class="card p-4 text-slate-100 font-bold"
                :class="{ 'active ': $route.path.startsWith('/master/durations') }">
                Duration
              </nuxt-link>
            </li>
            <li >
              <nuxt-link to="/master/discounts" class="card p-4 text-slate-100 font-bold"
                :class="{ 'active ': $route.path.startsWith('/master/discounts') }">
                Discounts
              </nuxt-link>
            </li>
            <li >
              <nuxt-link to="/master/deliveries" class="card p-4 text-slate-100 font-bold"
                :class="{ 'active ': $route.path.startsWith('/master/deliveries') }">
                Deliveries
              </nuxt-link>
            </li>
            <li >
              <nuxt-link to="/master/perfumes" class="card p-4 text-slate-100 font-bold"
                :class="{ 'active ': $route.path.startsWith('/master/perfumes') }">
                Perfumes
              </nuxt-link>
            </li>
            <li >
              <nuxt-link to="/master/customers" class="card p-4 text-slate-100 font-bold"
                :class="{ 'active ': $route.path.startsWith('/master/customers') }">
                Customers
              </nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
</template>