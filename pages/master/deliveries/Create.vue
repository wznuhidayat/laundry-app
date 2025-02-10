<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})
import { useToastStore } from '~/stores/toast';
const toast = useToastStore();
import { reactive } from 'vue';
import { useDeliverStore } from '~/stores/delivery';
const deliverStore = useDeliverStore();

const form = reactive({
    name: '',
    price: '',
});

const errors = reactive({
    name: '',
    price: '',
})

const handleSubmit = async () => {
  try {
    const res = await deliverStore.createDeliver(form);
    if(res){
        if(res.status == 201){
            navigateTo('/master/deliveries');
        }else if(res.status == 422){
            errors.name = ''
            errors.price = ''
            res.messages.forEach(error => {
                if (errors.hasOwnProperty(error.field)) {
                    errors[error.field] = error.message
                }
            })
        }
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
                <h1 class="card-title">Create Delivery</h1>
                <form @submit.prevent="handleSubmit" class=" space-y-4">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Name</span>
                        </div>
                        <input name="text" placeholder="name" v-model="form.name" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.name }" />
                        <div v-if="errors.name" class="label">
                            <span class="label-text-alt text-error">{{ errors.name }}</span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Price</span>
                        </div>
                        <input name="text" placeholder="price" v-model="form.price" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.price }" />
                        <div v-if="errors.price" class="label">
                            <span class="label-text-alt text-error">{{ errors.price }}</span>
                        </div>
                    </label>
                    <div class="card-actions">
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    </NuxtLayout>
</template>