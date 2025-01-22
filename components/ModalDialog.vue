<script setup>
import { Icon } from '@iconify/vue';
import { ref, defineProps, defineEmits } from 'vue';

// Props untuk menerima konfigurasi dari luar
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false, 
  },
  title: {
    type: String,
    default: 'Are you sure?',
  },
  message: {
    type: String,
    default: "You won't be able to revert this!",
  },
  confirmText: {
    type: String,
    default: 'Archive',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  confirmClass: {
    type: String,
    default: 'btn-error text-white',
  },
});
// Emit untuk mengirimkan event ke parent
const emit = defineEmits(['cancel', 'confirm']);
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-10 overflow-y-auto bg-slate-900 bg-opacity-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="card flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="relative inline-block py-24 px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div>
          <div class="flex items-center justify-center">
            <Icon icon="material-symbols:delete" class="h-12 w-12 text-red-500"></Icon>
          </div>

          <div class="mt-2 text-center">
            <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
              {{ title }}
            </h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {{ message }}
            </p>
          </div>
        </div>
        <div class="mt-5 grid grid-cols-2 gap-4 card-actions">
          <button @click="$emit('cancel')" class="btn btn-block">
            {{ cancelText }}
          </button>
          <button @click="$emit('confirm')" :class="'btn btn-block ' + confirmClass">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
