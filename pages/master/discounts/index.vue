<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import { computed } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { Icon } from '@iconify/vue';
import { useDiscountStore } from '~/stores/discount';
const discountStore = useDiscountStore();

await useFetch(() => discountStore.fetchDiscounts());
const currentPage = computed(() => discountStore.page);
const total = computed(() => discountStore.total);
const perPage = computed(() => discountStore.perPage);
const discounts = computed(() => discountStore.discounts);
const handlePageChange = (page) => {
  discountStore.setPage(page);
};


const deleteDiscount = async (id: number) => {
  try {
    await discountStore.deleteDiscount(id);
    await discountStore.fetchDiscounts();
  } catch (error) {
    toast.showToast(error, 'error');
  }
}
const no = ref(1);
</script>
<template>
    <NuxtLayout name="admin">
        <div class="card bg-base-100">
            <div class="card-body">
                <div class="flex justify-between">
                  <h1 class="card-title">Discounts</h1>
                  <nuxt-link to="/master/discounts/create" class="btn btn-primary">Create</nuxt-link>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <!-- head -->   
                        <thead>
                        <tr>
                            <th >No</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- row 1 -->
                        <tr v-for="(discount, index) in discounts" :key="discount.id">
                            <th>{{ index + 1 + (currentPage - 1) * perPage }}</th>
                            <td>{{ discount.type }}</td>
                            <td>{{ discount.value }}</td>
                            <td>
                            <!-- Button delete -->
                            <button class="btn btn-sm btn-error" @click="deleteDiscount(discount.id)">
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
        </div>
    </NuxtLayout>
</template>