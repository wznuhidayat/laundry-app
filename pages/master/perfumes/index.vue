<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})

import { Icon } from '@iconify/vue';
import { ref,computed } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { usePerfumeStore } from '~/stores/perfume';
const toast = useToastStore();
const perfumeStore = usePerfumeStore();
await useFetch(() => perfumeStore.fetchPerfumes());
const currentPage = computed(() => perfumeStore.page);
const total = computed(() => perfumeStore.total);
const perPage = computed(() => perfumeStore.perPage);
const perfumes = computed(() => perfumeStore.perfumes);

const deletePerfume = (id: number) => {
  isConfirmDelete.value = true;
  idCurrentDelete.value = id
}
const idCurrentDelete = ref(0);
const isConfirmDelete = ref(false);
const handlePageChange = (page) => {
  perfumeStore.setPage(page);
};

const handleConfirm = async () => {
  const id = idCurrentDelete.value
  try {
    await perfumeStore.deletePerfume(id);
    await perfumeStore.fetchPerfumes();
    toast.showToast('Perfume successfully deleted!', 'success');
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
            <div class="card-body ">
                <div class="flex justify-between">
                  <h1 class="card-title">Perfumes</h1>
                  <nuxt-link to="/master/perfumes/create" class="btn btn-primary text-white font-bold">Create</nuxt-link>
                </div>
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- row 1 -->
                            <tr v-for="(perfume, index) in perfumes" :key="perfume.id">
                                <th>{{ index + 1 + (currentPage - 1) * perPage }}</th>
                                <td>{{ perfume.name }}</td>
                                <td class="space-x-2">
                                    <!-- Button Edit -->
                                    <nuxt-link :to="`/master/perfumes/${perfume.id}`" class="btn btn-sm btn-info text-slate-100">
                                        <Icon icon="material-symbols:edit" class="h-5 w-5" /> 
                                    </nuxt-link>
                                    <!-- Button delete -->
                                    <button class="btn btn-sm btn-error text-slate-100" @click="deletePerfume(perfume.id)">
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