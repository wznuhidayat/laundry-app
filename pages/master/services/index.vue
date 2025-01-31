<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import { Icon } from '@iconify/vue';
import { useServiceStore } from '~/stores/service';
const serviceStore = useServiceStore();
await useFetch(() => serviceStore.fetchServices());
const currentPage = computed(() => serviceStore.page);
const total = computed(() => serviceStore.total);
const perPage = computed(() => serviceStore.perPage);
const services = computed(() => serviceStore.services);
const handlePageChange = (page) => {
  serviceStore.setPage(page);
};
</script>
<template>
    <NuxtLayout name="admin">
      <div class="card bg-base-100">
            <div class="card-body">
                <div class="flex justify-between">
                  <h1 class="card-title">Services</h1>
                  <nuxt-link to="/master/services/create" class="btn btn-primary text-white font-bold">Create</nuxt-link>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <!-- head -->   
                        <thead>
                        <tr>
                            <th width="5%">No</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Duration</th>
                            <th width="15%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- row 1 -->
                        <tr v-for="(service, index) in services" :key="service.id">
                            <th>{{ index + 1 + (currentPage - 1) * perPage }}</th>
                            <td>{{ service.name }}</td>
                            <td>{{ service.type }}</td>
                            <td>{{ customRound(service.price) }}</td>
                            <td>{{ service.duration.name }}</td>
                            <td class="space-x-2">
                              <!-- Button Edit -->
                            <nuxt-link :to="`/master/services/${service.id}`" class="btn btn-sm btn-info text-slate-100">
                                <Icon icon="material-symbols:edit" class="h-5 w-5" /> 
                            </nuxt-link>
                            <!-- Button delete -->
                            <button class="btn btn-sm btn-error text-slate-100" @click="deleteService(service.id)">
                                <Icon icon="material-symbols:delete" class="h-5 w-5" /> 
                            </button>
                            
                            </td>
                        </tr>
                        
                      
                        </tbody>
                    </table>
                </div>
                <!-- <Pagination
                  :currentPage="currentPage"
                  :totalItems="total"
                  :itemsPerPage="perPage"
                  @pageChange="handlePageChange"
                /> -->
            </div>
            <!-- <ModalDialog
        :isOpen="isConfirmDelete"
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmClass="btn-error text-white"
        @confirm="handleConfirm"
        @cancel="handleClose"
      /> -->
        </div>
    </NuxtLayout>
</template>