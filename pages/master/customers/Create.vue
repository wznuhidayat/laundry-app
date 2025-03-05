<script setup lang="ts">
definePageMeta({
    layout: 'admin'
})
import { useToastStore } from '~/stores/toast';
const toast = useToastStore();
import { reactive } from 'vue';
import { useCustomerStore } from '~/stores/customer';
const customerStore = useCustomerStore();

const form = reactive({
    name: '',
    phone: '',
    address: '',
});

const errors = reactive({
    name: '',
    phone: '',
    address: '',
})

const handleSubmit = async () => {
  try {
    const res = await customerStore.createCustomer(form);
    if(res){
        if(res.status == 201){
            navigateTo('/master/customers');
        }else if(res.status == 422){
            errors.name = ''
            errors.phone = ''
            errors.address = ''
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
                <h1 class="card-title">Create Customer</h1>
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
                            <span class="label-text">Phone</span>
                        </div>
                        <input name="text" placeholder="085 xxx" v-model="form.phone" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.phone }" />
                        <div v-if="errors.phone" class="label">
                            <span class="label-text-alt text-error">{{ errors.phone }}</span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Address</span>
                        </div>
                        <textarea name="text" placeholder="address" v-model="form.address" class="textarea input-bordered w-full max-w-xs" :class="{ 'input-error': errors.address }" id=""></textarea>
                        <div v-if="errors.address" class="label">
                            <span class="label-text-alt text-error">{{ errors.address }}</span>
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