<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})
import { useToastStore } from '~/stores/toast';
const toast = useToastStore();
import { reactive } from 'vue';
import { useDiscountStore } from '~/stores/discount';
const discountStore = useDiscountStore();

const form = reactive({
    type: '',
    value: '',
});

const handleSubmit = async () => {
  try {
    const res = await discountStore.createDiscount(form);
    if(res){
        navigateTo('/master/discounts');
    }
  } catch (error) {
    toast.showToast(error, 'error');
  }
};
</script>
<template>
    <NuxtLayout name="admin">
        <div class="card bg-base-100">
            <div class="card-body">
                <h1 class="card-title">Create Discount</h1>
                <form @submit.prevent="handleSubmit" class=" space-y-4">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Pick the best fantasy franchise</span>
                        </div>
                        <select v-model="form.type" class="select select-bordered">
                            <option disabled selected>-- select one --</option>
                            <option value="percentage">Percentage</option>
                            <option value="amount">Amount</option>
                        </select>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Value</span>
                        </div>
                        <input type="text" placeholder="value" v-model="form.value" class="input input-bordered w-full max-w-xs" />
                       
                    </label>
                    <div class="card-actions">
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    </NuxtLayout>
</template>