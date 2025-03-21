<script setup>
import { ref } from 'vue';
import { useOrderStore } from '#build/imports';
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Object,
    default: null,
  },
});
const orderStore = useOrderStore();
const status = props.order ? ref(props.order.status) : ref(0);

const emit = defineEmits(['close']);

async function handleSubmit(order) {
  orderStore.changeStatus(order.id, status.value);
  emit('close');
}
</script>
<template>
<div v-if="isOpen" class="fixed inset-0 z-10 overflow-y-auto bg-slate-900 bg-opacity-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="card flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="relative inline-block py-24 px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right  sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div>
            <fieldset class="fieldset">
            <legend class="fieldset-legend text-semibold">Change Status</legend>
                <select class="select w-full" v-model="status">
                    <option value="0" >Pending</option>
                    <option value="1" >Completed</option>
                    <option value="2" >Cancelled</option>
                </select>
            </fieldset>
        </div>
        <div class="mt-5 grid grid-cols-2 gap-4 card-actions">
            <div class="w-full">
              <button class="w-full btn btn-outline" @click="$emit('close')">Close</button>
            </div>
            <div class="w-full">
            <button class="w-full btn btn-primary" @click="handleSubmit(order)">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>