<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import { Icon } from '@iconify/vue';
import { ref,computed } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { useCustomerStore } from '~/stores/customer';
const customerStore = useCustomerStore();
const toast = useToastStore();
await useFetch(() => customerStore.fetchCustomers());
const currentPage = computed(() => customerStore.page);
const total = computed(() => customerStore.total);
const perPage = computed(() => customerStore.perPage);
const customers = computed(() => customerStore.customers);

const deleteCustomer = (id: number) => {
  isConfirmDelete.value = true;
  idCurrentDelete.value = id
}
const idCurrentDelete = ref(0);
const isConfirmDelete = ref(false);
const handlePageChange = (page) => {
  customerStore.setPage(page);
};

const handleConfirm = async () => {
  const id = idCurrentDelete.value
  try {
    await customerStore.deleteCustomer(id);
    await customerStore.fetchCustomers();
    toast.showToast('Customer successfully deleted!', 'success');
    isConfirmDelete.value = false;
  } catch (error) {
    toast.showToast(error, 'error');
  }
};

const handleClose = () => {
  isConfirmDelete.value = false;
}
</script>
<template>
    <NuxtLayout name="admin">
      <div class="card bg-base-100">
            <div class="card-body">
                <div class="flex justify-between">
                  <h1 class="card-title">Customery</h1>
                  <nuxt-link to="/master/customers/create" class="btn btn-primary text-white font-bold">Create</nuxt-link>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <!-- head -->   
                        <thead>
                        <tr>
                            <th width="5%">No</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th width="15%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- row 1 -->
                        <tr v-for="(customer, index) in customers" :key="customer.id">
                            <th>{{ index + 1 + (currentPage - 1) * perPage }}</th>
                            <td>{{ customer.code }}</td>
                            <td>{{ customer.name }}</td>
                            <td>{{ customer.phone }}</td>
                            <td>{{ customer.address }}</td>
                            <td class="space-x-2">
                              <!-- Button Edit -->
                            <nuxt-link :to="`/master/customers/${customer.id}`" class="btn btn-sm btn-info text-slate-100">
                                <Icon icon="material-symbols:edit" class="h-5 w-5" /> 
                            </nuxt-link>
                            <!-- Button delete -->
                            <button class="btn btn-sm btn-error text-slate-100" @click="deleteCustomer(customer.id)">
                                <Icon icon="material-symbols:delete" class="h-5 w-5" /> 
                            </button>
                            
                            </td>
                        </tr>
                        
                      
                        </tbody>
                    </table>
                </div>
                <Pagination
                  :currentPage="currentPage"
                  :totalItems="total"
                  :itemsPerPage="perPage"
                  @pageChange="handlePageChange"
                />
            </div>
            <ModalDialog
        :isOpen="isConfirmDelete"
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmClass="btn-error text-white"
        @confirm="handleConfirm"
        @cancel="handleClose"
      />
        </div>
    </NuxtLayout>
</template>