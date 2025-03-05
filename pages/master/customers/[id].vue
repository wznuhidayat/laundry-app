<script setup>
import { useCustomerStore } from '~/stores/customer';
const customerStore = useCustomerStore();
const id = useRoute().params.id
const toast = useToastStore();
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
const fetchItem = async () => {
  try {
    const data = await customerStore.showCustomer(id);
    form.name = data.name;
    form.phone = data.phone;
    form.address = data.address;
  } catch (error) {
    console.error('Error fetching item:', error);
  }
};
await fetchItem();
const handleSubmit = async (id) => {
  try {
    const res = await customerStore.updateCustomer(id, form);
    if(res){
        if(res.status == 200){
            toast.showToast('Customer successfully updated!', 'success');
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
                <h1 class="card-title">Edit Customer</h1>
                <form @submit.prevent="handleSubmit(id)" class=" space-y-4">
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Name</span>
                        </div>
                        <input type="text" placeholder="name" v-model="form.name" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.name }" />
                        <div v-if="errors.name" class="label">
                            <span class="label-text-alt text-error">{{ errors.name }}</span>
                        </div>
                    </label>
                    <label class="form-control w-full max-w-xs">
                        <div class="label">
                            <span class="label-text">Phone</span>
                        </div>
                        <input type="text" placeholder="0854 xxx" v-model="form.phone" class="input input-bordered w-full max-w-xs" :class="{ 'input-error': errors.phone }" />
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